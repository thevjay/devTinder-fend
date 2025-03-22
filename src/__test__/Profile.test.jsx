import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../utils/userSlice";
import { beforeEach, describe, test } from "vitest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { fireEvent, render , screen, waitFor} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Profile from '../components/Profile';
import '@testing-library/jest-dom';
import { BASE_URL } from "../utils/constant";


// Mock API requests
const mockAxios = new MockAdapter(axios);

const createMockStore = (preloadedState) =>
    configureStore({
        reducer: {
            user: userReducer
        },
        preloadedState
    });


    describe("Profile Component Integration Test",()=>{
        let store;

        beforeEach(()=>{
            store = createMockStore({
                user: {
                    firstName: "John",
                    lastName: "Doe",
                    age: "25",
                    gender: "Male",
                    photoUrl: "https://google.com",
                    about: "Software Engineer",
                }
            });

            mockAxios.reset();
        });



        test("Should render Profile and EditProfile Component", ()=>{
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Profile />
                    </BrowserRouter>
                </Provider>
            );

             // Check if the "Edit Profile" heading is visible
            expect(screen.getByText("Edit Profile")).toBeInTheDocument();

            // Check if user fields are prefilled
            expect(screen.getByDisplayValue("John")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
            expect(screen.getByDisplayValue("25")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Male")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Software Engineer")).toBeInTheDocument();
        })

        test("should update user details when edited and saved", async()=>{
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Profile />
                    </BrowserRouter>
                </Provider>
            );

             // Simulate user input changes
    fireEvent.change(screen.getByDisplayValue("John"), {
        target: { value: "Jane" },
      });
  
      fireEvent.change(screen.getByDisplayValue("Doe"), {
        target: { value: "Smith" },
      });
  
      fireEvent.change(screen.getByDisplayValue("25"), {
        target: { value: "30" },
      });

       // Mock API response
    mockAxios.onPut(`${BASE_URL}/profile/edit`).reply(200, {
        data: {
          firstName: "Jane",
          lastName: "Smith",
          age: "30",
          gender: "Male",
          photoUrl: "",
          about: "Software Engineer",
        },
      });
  
 // Click the "Save" button
 fireEvent.click(screen.getByText("Save"));

 // Wait for toast message to appear
 await waitFor(() =>
   expect(screen.getByText("Profile saved successfully.")).toBeInTheDocument()
 );


  // Ensure Redux store is updated
  expect(store.getState().user.firstName).toBe("Jane");
  expect(store.getState().user.lastName).toBe("Smith");
  expect(store.getState().user.age).toBe("30");
        })
    })