import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should focus on then username field when clicking login without a username or password", () => {
    const { getByText, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/login/i);
    
    fireEvent.click(loginBtn);
    expect(getByLabelText(/username/i)).toHaveFocus();
    expect(getByText("User has not logged in"));
  });

  it("should focus on password field when clicking login without a password", () => {
    const { getByText, getByDisplayValue, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/login/i);
    const usernameField = getByLabelText(/username/i);

    fireEvent.change(usernameField, { target: { value: "stephen123" } });
    expect(getByDisplayValue("stephen123"));

    fireEvent.click(loginBtn);
    const passwordField = getByLabelText(/password/i);
    expect(passwordField).toHaveFocus();
    expect(getByText("User has not logged in"));
  });

  it("should focus on username field when clicking login without a username", () => {
    const { getByText, getByDisplayValue, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/login/i);
    const passwordField = getByLabelText(/password/i);
    fireEvent.change(passwordField, { target: { value: "secure123" } });
    expect(getByDisplayValue("secure123"));

    fireEvent.click(loginBtn);
    expect(getByLabelText(/username/i)).toHaveFocus();
    expect(getByText("User has not logged in"));
  });

  it("should alert the user about incorrect details with an incorrect username or password", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();

    const { getByText, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/login/i);
    fireEvent.change(getByLabelText(/username/i), { target: { value: "user1" } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: "secure123" } });

    fireEvent.click(loginBtn);
    expect(alertSpy).toHaveBeenCalledWith("An error occurred when authenticating");
    expect(getByText("User has not logged in"));
  });

  it("should successfully login", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();
    
    const { getByText, queryByText, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/login/i);
    fireEvent.change(getByLabelText(/username/i), { target: { value: "username123" } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: "secure123" } });

    // Verify success text is not being displayed prior to login
    expect(queryByText("Successfully logged in")).toBeNull()
    fireEvent.click(loginBtn);
    expect(alertSpy).not.toHaveBeenCalled();
    expect(queryByText("Successfully logged in")).not.toBeNull();
  });
});