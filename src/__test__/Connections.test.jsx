import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, test } from "vitest";
import connectionReducer from '../utils/connectionSlice';
import { BASE_URL } from "../utils/constant";
import { render, waitFor ,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Connections from "../components/Connections";
import '@testing-library/jest-dom';


const mockAxios = new MockAdapter(axios);

describe("Connections component Test",()=>{
    let store;

    beforeEach(()=>{
        store = configureStore({
            reducer: {
                connection: connectionReducer
            }
        })
        mockAxios.reset();
    })

    test("Should fetch and display connections", async()=>{
        const mockConnections = [
            { firstName: "John", lastName: "Doe", age: 25, gender: "Male", about: "Software Engineer", photoUrl: "https://example.com/photo1.jpg" },
            { firstName: "Jane", lastName: "Smith", age: 28, gender: "Female", about: "Designer", photoUrl: "https://example.com/photo2.jpg" },      
        ];

        mockAxios.onGet(`${BASE_URL}/user/connections`).reply(200,{
            data: mockConnections
        })

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Connections />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(()=>{
            expect(screen.getByText("Connections")).toBeInTheDocument()
            expect(screen.getByText("John Doe")).toBeInTheDocument();
            expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        })

    });

    test("should display 'No Connection Found' when API returns empty list", async()=>{
        mockAxios.onGet(`${BASE_URL}/user/connections`).reply(200,{
            data: []
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Connections />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("No Connection Found")).toBeInTheDocument();
          });
    })

    test("should handle API errors without crashing", async () => {
        mockAxios.onGet(`${BASE_URL}/user/connections`).reply(500);
    
        render(
          <Provider store={store}>
            <Connections />
          </Provider>
        );
    
        await waitFor(() => {
          // Since there's no UI change for error, we just ensure the component didn't crash
          expect(screen.queryByText("Connections")).not.toBeInTheDocument();
        });
      });
})