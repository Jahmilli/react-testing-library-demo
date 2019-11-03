import React from "react";
import { act, fireEvent, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
    beforeEach(cleanup);

    it("should focus on then username field when clicking login without a username or password", async () => {
        jest.spyOn(window, "alert").mockImplementation();
        jest.spyOn(window, "fetch").mockResolvedValue("This is a response"); // TODO: Fix this

        const { getByText, getByLabelText } = render(<LoginForm />);
        const loginBtn = getByText(/submit/i);
        await act(async () => fireEvent.click(loginBtn));
        
        const usernameField = getByLabelText(/name/i);
        expect(usernameField).toHaveFocus();
    });

    it("should focus on password field when clicking login without a password", async () => {
        jest.spyOn(window, "alert").mockImplementation();
        jest.spyOn(window, "fetch").mockResolvedValue("This is a response"); // TODO: Fix this

        const { getByText, getByDisplayValue, getByLabelText } = render(<LoginForm />);
        const loginBtn = getByText(/submit/i);
        const usernameField = getByLabelText(/name/i);
        
        fireEvent.change(usernameField, { target: { value: "stephen123" }});
        expect(getByDisplayValue("stephen123"));

        await act(async () => fireEvent.click(loginBtn));
        const passwordField = getByLabelText(/password/i);
        expect(passwordField).toHaveFocus();
    });

    it("should focus on username field when clicking login without a username", async () => {
        jest.spyOn(window, "alert").mockImplementation();
        jest.spyOn(window, "fetch").mockResolvedValue("This is a response"); // TODO: Fix this

        const { getByText, getByDisplayValue, getByLabelText } = render(<LoginForm />);
        const loginBtn = getByText(/submit/i);
        const passwordField = getByLabelText(/password/i);
        fireEvent.change(passwordField, { target: { value: "secure123" }});
        expect(getByDisplayValue("secure123"));

        await act(async () => fireEvent.click(loginBtn));
        expect(getByLabelText(/name/i)).toHaveFocus();
    });

    it("should alert the user about incorrect details with an incorrect username or password", async () => {
        const fetchResponse = {
            message: "Incorrect details",
            ok: true
        };
        const alertSpy = jest.spyOn(window, "alert").mockImplementation();
        jest.spyOn(window, "fetch").mockResolvedValue(JSON.stringify(fetchResponse));
        
        const { getByText, getByLabelText } = render(<LoginForm />);
        const loginBtn = getByText(/submit/i);
        fireEvent.change(getByLabelText(/name/i), { target: { value: "stephen123" }});
        fireEvent.change(getByLabelText(/password/i), { target: { value: "secure123" }});
        

        await act(async () => fireEvent.click(loginBtn));
        expect(alertSpy).toHaveBeenCalledWith("An error occurred when authenticating");
    });
});