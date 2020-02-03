import React from "react";
import { wait, fireEvent, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as login from "../../logic/functions/login";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should alert the user to complete the username field when submitting without a username or password", () => {
    const { getByTestId, getByLabelText } = render(<LoginForm />);
    const loginForm = getByTestId("login-form");

    fireEvent.click(loginForm);
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

    fireEvent.change(usernameField, { target: { value: "stephen123" } });
    expect(getByDisplayValue("stephen123"));

    fireEvent.submit(getByTestId("login-form"));
    const passwordField = getByLabelText(/password/i);

    await wait();
    expect(passwordField).toHaveFocus();
    expect(passwordField).toHaveAttribute("type", "password");
    expect(getByText("Please fill in your password"));
  });

  it("should alert the user to complete the username field when submitting without a username", () => {
    const {
      getByTestId,
      getByText,
      getByDisplayValue,
      getByLabelText
    } = render(<LoginForm />);
    const passwordField = getByLabelText(/password/i);
    fireEvent.change(passwordField, { target: { value: "secure123" } });
    expect(getByDisplayValue("secure123"));

    fireEvent.submit(getByTestId("login-form"));
    expect(getByLabelText(/username/i)).toHaveFocus();
    expect(getByText("Please fill in your username"));
  });

  it("should alert the user about incorrect details after submitting with an incorrect username or password", () => {
    const { getByTestId, getByText, getByLabelText } = render(<LoginForm />);
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "user1" }
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "secure123" }
    });

    fireEvent.submit(getByTestId("login-form"));
    expect(getByText("The username and/or password is incorrect"));
  });

  it("should successfully login", () => {
    const loginSpy = jest.spyOn(login, "login").mockReturnValue(false);
    const { getByTestId, queryByText, getByLabelText } = render(<LoginForm />);
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "username123" }
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "secure123" }
    });

    // Verify success text is not being displayed prior to login
    expect(queryByText("Successfully logged in")).toBeNull();
    fireEvent.submit(getByTestId("login-form"));
    expect(loginSpy).toHaveBeenCalledWith("username123", "secure123");
    expect(queryByText("Successfully logged in"));
  });
});
