import { act, fireEvent, render ,screen} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import NavBar from "../components/NavBar";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import appStore from '../utils/appStore';
import axios from "axios";
import '@testing-library/jest-dom';
import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../utils/userSlice";


// Mock axios
vi.mock("axios")

// Create a mock store with the user reducer
const createMockStore = (preloadedState)=>
  configureStore({
    reducer:{ user: userReducer },
    preloadedState, // Allows testing different user states
});

describe("Should load NavBar Component",()=>{

  
  let store;

  beforeEach(()=>{
    store = createMockStore({
      user:null,  // Initially no user logged in
    });
  });


    test("Should renders DevTinder heading",()=>{
      render(
      <Provider store={store}>
        <BrowserRouter>
            <NavBar/>
        </BrowserRouter>  
      </Provider>
     )
     
     const heading = screen.getByText("DevTinder");
     
     expect(heading).toBeInTheDocument();
    })

    test("Does not show user details when not logged in",()=>{
      render(
        <Provider store={store}>
          <BrowserRouter>
              <NavBar/>
          </BrowserRouter>  
        </Provider>
       );

      expect(screen.queryByText("Welcome")).not.toBeInTheDocument();

    });

    test("Shows user details when logged in",()=>{
      store = createMockStore({
        user: {
          firstName:"John",
          photoUrl:"https://example.com/photo.jpg",
        }
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavBar/>
          </BrowserRouter>
        </Provider>
      )

      expect(screen.getByText("Welcome, John")).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute("src","https://example.com/photo.jpg")
    })

    test('Calls logout API and dispatches removeUser action',async()=>{
      store = createMockStore({
        user: {
          firstName:"John"
        }
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <NavBar/>
          </BrowserRouter>
        </Provider>
      )

      await axios.post.mockResolvedValue({}) // Mock successfull logout API call
      await act(async () => {
        fireEvent.click(screen.getByText("Logout"));
      });

      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/logout"),{},{ withCredentials: true })
    })
})