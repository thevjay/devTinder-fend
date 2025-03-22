import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter, Outlet, useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import  userReducer  from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import { render, waitFor ,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import Body from "../components/Body";
import '@testing-library/jest-dom';


// Mock API requests
const mockAxios = new MockAdapter(axios);

// Mock `useNavigate`
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        Outlet: () => <div>Mock Outlet</div>,
    };
});

describe("Body Component Test",()=>{
    let store;

    beforeEach(()=>{
        store = configureStore({
            reducer:{
                user: userReducer
            },
        })
        mockAxios.reset();
    });

    test("Should fetch user data and update store", async()=>{
        const mockUser = {
            firstName: "John",
            lastName: "Doe"
        };

        mockAxios.onGet(`${BASE_URL}/profile/view`).reply(200, mockUser);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Body/>
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => expect(store.getState().user).toEqual(mockUser));

    })

    test("should redirect to login on unauthorized error", async () => {
        mockAxios.onGet(`${BASE_URL}/profile/view`).reply(401);
    
        render(
          <Provider store={store}>
            <BrowserRouter>
              <Body />
            </BrowserRouter>
          </Provider>
        );
    
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
      });

      test("should render NavBar, FooterBar, and Outlet", () => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <Body />
            </BrowserRouter>
          </Provider>
        );
    
        expect(screen.getByText("Mock Outlet")).toBeInTheDocument();
      });
});

