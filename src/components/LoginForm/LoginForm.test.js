import React from "react";
import { wait, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as login from "../../logic/functions/login";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(jest.clearAllMocks);

  it("should alert the user to complete the username field when submitting without a username or password", async () => {
    const { getByTestId, getByLabelText } = render(<LoginForm />);
    const loginForm = getByTestId("login-form");

    fireEvent.submit(loginForm);
    await wait();

    expect(getByLabelText(/username/i)).toHaveFocus();
  });

  it("should alert the user to complete the password field when submitting without a password", async () => {
    const {
      getByTestId,
      getByText,
      getByDisplayValue,
      getByLabelText
    } = render(<LoginForm />);
    const usernameField = getByLabelText(/username/i);
    const passwordField = getByLabelText(/password/i);

    fireEvent.change(usernameField, { target: { value: "stephen123" } });
    expect(getByDisplayValue("stephen123")); // Queries by input field text

    fireEvent.submit(getByTestId("login-form"));
    await wait();

    expect(passwordField).toHaveFocus();
    expect(passwordField).toHaveAttribute("type", "password");
    expect(getByText("Please fill in your password"));
  });

  it("should alert the user to complete the username field when submitting without a username", async () => {
    const {
      getByTestId,
      getByText,
      getByLabelText
    } = render(<LoginForm />);
    const passwordField = getByLabelText(/password/i);

    fireEvent.change(passwordField, { target: { value: "secure123" } });
    fireEvent.submit(getByTestId("login-form"));
    await wait();
    
    expect(getByLabelText(/username/i)).toHaveFocus();
    expect(getByText("Please fill in your username"));
  });

  it("should alert the user about incorrect details after submitting with an incorrect username or password", async () => {
    const loginSpy = jest.spyOn(login, "login").mockRejectedValue("fail");
    const { getByTestId, getByText, getByLabelText } = render(<LoginForm />);

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "user1" }
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "secure123" }
    });
    fireEvent.submit(getByTestId("login-form"));
    await wait();
    
    expect(loginSpy).toHaveBeenCalledWith("user1", "secure123");
    expect(getByText("The username and/or password is incorrect"));
  });

  it("should successfully login", async () => {
    const loginSpy = jest.spyOn(login, "login").mockResolvedValue(true);
    const { getByTestId, queryByText, getByLabelText } = render(<LoginForm />);

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "sebsouthern" }
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "secure123" }
    });

    // Verify success text is not being displayed prior to login
    expect(queryByText("Successfully logged in")).toBeNull();
    fireEvent.submit(getByTestId("login-form"));
    await wait();

    expect(loginSpy).toHaveBeenCalledWith("sebsouthern", "secure123");
    expect(queryByText("Successfully logged in"));
  });
});
