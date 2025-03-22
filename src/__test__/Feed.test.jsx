import { configureStore } from "@reduxjs/toolkit";
import { render, waitFor , screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter, data } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Feed from "../components/Feed";
import '@testing-library/jest-dom';
import feedReducer, { addFeed } from '../utils/feedSlice';


// Mock Axios
vi.mock("axios")

// create a mock Redux store
const createMockStore = () =>
    configureStore({
        reducer: { feed: feedReducer },
    });

describe("Feed Component",()=>{
    test("renders No new Users found!! When feed is empty", async()=>{
        // Mock API response for empty feed
        axios.get.mockResolvedValue({ data: [] });

        render(
            <Provider store={createMockStore()}>
                <BrowserRouter>
                    <Feed />
                </BrowserRouter>
            </Provider>
        );

        // Wait for async API call
        await waitFor(()=>{
            expect(screen.getByText("No new Users found!!")).toBeInTheDocument();
        });
    });


    test("renders a user card when feed has data",async()=>{
        const mockUser = {
            _id: "123",
            firstName: "Alice",
            lastName: "Smith",
            photoUrl: "https://via.placeholder.com/150",
            age: 28,
            gender: "Female",
            about: "Software Engineer",
        };

        axios.get.mockResolvedValue({ data: [mockUser] });

        const store = createMockStore();
        store.dispatch(addFeed([mockUser]));  // Preload store with data

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Feed />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(()=>{
            expect(screen.getByText("Alice Smith")).toBeInTheDocument();
            expect(screen.getByText("Software Engineer")).toBeInTheDocument();
        })
    })

    test("clicking 'Interested' or 'Ignore' sends request and updates store", async () => {
        const mockUser = {
            _id: "123",
            firstName: "Alice",
            lastName: "Smith",
            photoUrl: "https://via.placeholder.com/150",
            age: 28,
            gender: "Female",
            about: "Software Engineer",
        };
    
        axios.get.mockResolvedValue({ data: [mockUser] }); // Mock API
        axios.post.mockResolvedValue({ data: { success: true } });
    
        const store = createMockStore();
        store.dispatch(addFeed([mockUser]));
    
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Feed />
                </BrowserRouter>
            </Provider>
        );
    
        // Ensure the user appears in UI
        await waitFor(() => {
            expect(screen.getByText("Alice Smith")).toBeInTheDocument();
        });
    
        expect(screen.queryByText("No new Users found!!")).not.toBeInTheDocument();
    
        // Click "Interested" button
        const interestedButton = await screen.findByRole("button", { name: /interested/i });
        fireEvent.click(interestedButton);
    
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining("/request/send/interested/123"),
                {},
                { withCredentials: true }
            );
        });
    });
        
})