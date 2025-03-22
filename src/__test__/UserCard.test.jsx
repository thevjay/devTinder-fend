import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, test, vi } from "vitest";
import feedReducer, { removeUserFromFeed } from '../utils/feedSlice';
import { fireEvent, render ,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, data } from "react-router-dom";
import UserCard from "../components/UserCard";
import '@testing-library/jest-dom';
import axios from "axios";


// Mock Axios
vi.mock("axios");

// Create a mock Redux store
const createMockStore = () =>
    configureStore({
        reducer:{ feed: feedReducer},
    });

    describe("UserCard component",()=>{
        test("renders user details correctly",()=>{
            const user = {
                _id: "123",
                firstName: "John",
                lastName: "Doe",
                photoUrl: "https://via.placeholder.com/150",
                age: 25,
                gender: "Male",
                about: "Software Engineer",
            };

            render(
                <Provider store={createMockStore()}>
                    <BrowserRouter>
                        <UserCard user={user} />
                    </BrowserRouter>
                </Provider>
            );

        
            expect(screen.getByText("John Doe")).toBeInTheDocument();
            expect(screen.getByText("Software Engineer")).toBeInTheDocument();
            expect(screen.getByText("25 Male")).toBeInTheDocument();
            expect(screen.getByRole("button",{name:/Ignore/i})).toBeInTheDocument();
            expect(
                screen.getByRole("button",{name:/Interested/i})
            ).toBeInTheDocument();
        });

        test("calls API and dispatches action on button click",async()=>{
            const user = {
                _id: "123",
                firstName: "John",
                lastName: "Doe",
                photoUrl: "https://via.placeholder.com/150",
                age: 25,
                gender: "Male",
                about: "Software Engineer",
            };

            const store = createMockStore();
            store.dispatch = vi.fn();  //Mock dispatch function

            axios.post.mockResolvedValue({ data: { success: true}});

            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <UserCard user={user} />
                    </BrowserRouter>
                </Provider>
            );

            const interestedButton = screen.getByRole("button", { name: /Interested/i });
            fireEvent.click(interestedButton);

            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining("/request/send/interested/123"),
                {},
                { withCredentials: true }
            );

            // Ensure Redux action is dispatched
            await new Promise((r) => setTimeout(r,0));  // Wait for async dispatch
            expect(store.dispatch).toHaveBeenCalledWith(removeUserFromFeed("123"));


            const ignoredButton = screen.getByRole("button",{name: /ignore/i });
            fireEvent.click(ignoredButton);

            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining("/request/send/ignored/123"),
                {},
                { withCredentials:true }
            );

            await new Promise((r) => setTimeout(r,0));
            expect(store.dispatch).toHaveBeenCalledWith(removeUserFromFeed("123"))
        })
    })
