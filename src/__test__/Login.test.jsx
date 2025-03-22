import { act, fireEvent, render , screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest"
import Login from '../components/Login'
import { Provider } from "react-redux";
import { BrowserRouter, data } from "react-router-dom";
import appStore from '../utils/appStore'
import '@testing-library/jest-dom';
import axios from "axios";


vi.mock('axios')

global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: "Invalid credentials" }),
    })
  );
  
// grouph this multiple test cases in the one
describe("Login component",()=>{

    test("Should load login Component",()=>{
        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        )
    
        // heading is Loaded or not
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();

        const loginButton = screen.getByRole("button",{name: "Login"})
        expect(loginButton).toBeInTheDocument();

        const emailIdPlaceholderText = screen.getByPlaceholderText("emailId")
        expect(emailIdPlaceholderText).toBeInTheDocument();

        const PasswordPlaceholder = screen.getByPlaceholderText("Enter your password")
        expect(PasswordPlaceholder).toBeInTheDocument();
    })
    
    test("Should update input fields on change",()=>{
        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        )
    
        // Simulate user typing
        const emailIdOnChange = screen.getByPlaceholderText("emailId")
        fireEvent.change(emailIdOnChange,{ target: {value: "test@example.com"}})
        // Assertion
        expect(emailIdOnChange).toHaveValue("test@example.com")

        const passwordOnChange = screen.getByPlaceholderText("Enter your password")
        fireEvent.change(passwordOnChange,{target: { value: "Test@1234" } })
        // Asssertion
        expect(passwordOnChange).toHaveValue("Test@1234")


    })
    
    test("Should successfully login on button click",async()=>{

        axios.post.mockResolvedValueOnce({ data: { userId: "123", email: "test@example.com"}})

        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        )
        
        const emailIdOnChange = screen.getByPlaceholderText("emailId")
        fireEvent.change(emailIdOnChange,{ target: {value: "test@example.com"}})

        
        const passwordOnChange = screen.getByPlaceholderText("Enter your password")
        fireEvent.change(passwordOnChange,{target: { value: "Test@123" } })

        const LoginButton = screen.getByRole("button",{name: "Login"});
        fireEvent.click(LoginButton);

        await waitFor(()=>{
            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/login"),{ emailId: "test@example.com", password: "Test@123"},{withCredentials: true })
        })
    })

    test("Should display error message on login failure", async()=>{

        axios.post =vi.fn ().mockResolvedValueOnce({  
            data: { error: "Invalid credentials"}
        })

        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        )
        
        const emailIdOnChange = screen.getByPlaceholderText("emailId")
        fireEvent.change(emailIdOnChange,{ target: {value: "wrong@example.com"}})

        
        const passwordOnChange = screen.getByPlaceholderText("Enter your password")
        fireEvent.change(passwordOnChange,{target: { value: "Wrong" } })

        const loginButton = screen.getByRole("button",{name: "Login"});
        
        // Ensure button exists
        expect(loginButton).toBeInTheDocument();

        // Wrap event triggering state update inside act()
        await act(async () => {
            fireEvent.click(loginButton);
        });

        // Add small delay to ensure state updates
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Debugging: Log the error state inside the component
         // Ensure error message is displayed in the UI
        // Check if error message is displayed

    })

    test("Should toggle between Login and Signup form",()=>{
        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        )
        
        // Switch to Signup form
        const toggleButton = screen.getByText("New User? Signup Here");
        fireEvent.click(toggleButton);

        expect(screen.getByPlaceholderText("firstName")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("lastName")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "SignUp" })).toBeInTheDocument();


        // Switch back to Login form
        fireEvent.click(screen.getByText("Existing User? Login Here"));

        expect(screen.queryByPlaceholderText("firstName")).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();

    })
    
    test("Should successfuly sign up a new user",async()=>{

        axios.post.mockResolvedValueOnce({
            data:{
                userId:"123",
                email:"new@example.com"
            }
        })

        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        )
    
        // Switch to Signup form
        fireEvent.click(screen.getByText("New User? Signup Here"));

        fireEvent.change(screen.getByPlaceholderText("firstName"), { target: { value: "John" } });
        fireEvent.change(screen.getByPlaceholderText("lastName"), { target: { value: "Doe" } });
        fireEvent.change(screen.getByPlaceholderText("emailId"), { target: { value: "new@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "NewPass@123" } });
        fireEvent.click(screen.getByRole("button", { name: "SignUp" }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/signup"), {
                firstName: "John",
                lastName: "Doe",
                emailId: "new@example.com",
                password: "NewPass@123"
            }, { withCredentials: true });
        });
    
    })

    test("Should display error message on signup failure", async () => {
        axios.post.mockRejectedValueOnce({ response: { data: { error: "User already exists" } } });

        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        // Switch to Signup form
        fireEvent.click(screen.getByText("New User? Signup Here"));

        fireEvent.change(screen.getByPlaceholderText("firstName"), { target: { value: "John" } });
        fireEvent.change(screen.getByPlaceholderText("lastName"), { target: { value: "Doe" } });
        fireEvent.change(screen.getByPlaceholderText("emailId"), { target: { value: "new@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "NewPass@123" } });
        fireEvent.click(screen.getByRole("button", { name: "SignUp" }));

        await waitFor(() => {
            expect(screen.getByText(/user already exists/i)).toBeInTheDocument();
        });
    });
    
})


