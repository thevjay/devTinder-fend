import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, test } from "vitest";
import requestReducer from '../utils/requestSlice'
import { BASE_URL } from "../utils/constant";
import { render, waitFor ,screen, fireEvent} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, data } from "react-router-dom";
import Requests from "../components/Requests";
import '@testing-library/jest-dom';


const mockAxios = new MockAdapter(axios)

describe("Requests Component Test",()=>{
    let store;

    beforeEach(()=>{
        store = configureStore({
            reducer: {
                request: requestReducer
            }
        })

        mockAxios.reset();
    });

    test("Should fetch and display requests",async()=>{
        const mockRequests = [
            {
                _id: "123",
                fromUserId: {
                  firstName: "John",
                  lastName: "Doe",
                  age: 25,
                  gender: "Male",
                  about: "Software Engineer",
                  photoUrl: "https://example.com/photo1.jpg",
                },
            }
        ];

        mockAxios.onGet(`${BASE_URL}/user/requests/received`).reply(200,{
            data:mockRequests
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Requests />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(()=>{
            expect(screen.getByText("Requests")).toBeInTheDocument();
            expect(screen.getByText("John Doe")).toBeInTheDocument();
        });
    });

    test("Should display 'No Request Found' when API returns empty list", async()=>{
        mockAxios.onGet(`${BASE_URL}/user/requests/received`).reply(200,{
            data: []
        })

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Requests />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(()=>{
            expect(screen.getByText("No Request Found")).toBeInTheDocument()
        })
    })

    test("should handle accept and reject actions", async()=>{
        const mockRequests = [
            {
                _id: "123",
                fromUserId: {
                  firstName: "Jane",
                  lastName: "Doe",
                  age: 28,
                  gender: "Female",
                  about: "Designer",
                  photoUrl: "https://example.com/photo2.jpg",
                },
            }
        ];

        mockAxios.onGet(`${BASE_URL}/user/requests/received`).reply(200, { data: mockRequests });
        mockAxios.onPost(`${BASE_URL}/request/review/accepted/123`).reply(200);
        mockAxios.onPost(`${BASE_URL}/request/review/rejected/123`).reply(200);
    
        render(
          <Provider store={store}>
            <Requests />
          </Provider>
        );


        await waitFor(() => {
            expect(screen.getByText("Jane Doe")).toBeInTheDocument();
          });
      
          const acceptButton = screen.getByText("Accept");
          fireEvent.click(acceptButton);
      
          await waitFor(() => {
            expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
          });
      
          
          await waitFor(() => {
            expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
          });
    })

    test("should handle reject actions", async()=>{
        const mockRequests = [
            {
                _id: "123",
                fromUserId: {
                  firstName: "Jane",
                  lastName: "Doe",
                  age: 28,
                  gender: "Female",
                  about: "Designer",
                  photoUrl: "https://example.com/photo2.jpg",
                },
            }
        ];

        mockAxios.onGet(`${BASE_URL}/user/requests/received`).reply(200, { data: mockRequests });
        mockAxios.onPost(`${BASE_URL}/request/review/accepted/123`).reply(200);
        mockAxios.onPost(`${BASE_URL}/request/review/rejected/123`).reply(200);
    
        render(
          <Provider store={store}>
            <Requests />
          </Provider>
        );

          await waitFor(() => {
            expect(screen.queryByText("Jane Doe")).toBeInTheDocument();
          });
      

          const rejectButton = screen.getByText("Reject");
          fireEvent.click(rejectButton);
      
          await waitFor(() => {
            expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
          });
    })

    test("should handle API errors without crashing", async () => {
        mockAxios.onGet(`${BASE_URL}/user/requests/received`).reply(500);
    
        render(
          <Provider store={store}>
            <Requests />
          </Provider>
        );
    
        await waitFor(() => {
          expect(screen.queryByText("Requests")).not.toBeInTheDocument();
        });
      });
})