import React from "react";
import fetchMock from "fetch-mock";
import { act, fireEvent, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
    fetchMock.restore();
  });

  it("should focus on then username field when clicking login without a username or password", async () => {
    jest.spyOn(window, "alert").mockImplementation();

    const { getByText, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/submit/i);
    await act(async () => fireEvent.click(loginBtn));

    const usernameField = getByLabelText(/name/i);
    expect(usernameField).toHaveFocus();
  });

  it("should focus on password field when clicking login without a password", async () => {
    jest.spyOn(window, "alert").mockImplementation();

    const { getByText, getByDisplayValue, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/submit/i);
    const usernameField = getByLabelText(/name/i);

    fireEvent.change(usernameField, { target: { value: "stephen123" } });
    expect(getByDisplayValue("stephen123"));

    await act(async () => fireEvent.click(loginBtn));
    const passwordField = getByLabelText(/password/i);
    expect(passwordField).toHaveFocus();
  });

  it("should focus on username field when clicking login without a username", async () => {
    jest.spyOn(window, "alert").mockImplementation();

    const { getByText, getByDisplayValue, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/submit/i);
    const passwordField = getByLabelText(/password/i);
    fireEvent.change(passwordField, { target: { value: "secure123" } });
    expect(getByDisplayValue("secure123"));

    await act(async () => fireEvent.click(loginBtn));
    expect(getByLabelText(/name/i)).toHaveFocus();
  });

  it("should alert the user about incorrect details with an incorrect username or password", async () => {
    const fetchResponse = {
      message: "Incorrect details"
    };
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();

    fetchMock.once("/api/v1/login", {
      status: 401,
      body: JSON.stringify(fetchResponse),
      headers: { "Content-Type": "application/json" },
      sendAsJson: false
    }, { method: "POST" });

    const { getByText, getByLabelText } = render(<LoginForm />);
    const loginBtn = getByText(/submit/i);
    fireEvent.change(getByLabelText(/name/i), { target: { value: "user123" } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: "secure123" } });


    await act(async () => fireEvent.click(loginBtn));
    expect(alertSpy).toHaveBeenCalledWith("An error occurred when authenticating");
  });

  it("should successfully login", async () => {
    const fetchResponse = {
      message: "Success"
    };
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();

    fetchMock.once("/api/v1/login", {
      status: 200,
      body: JSON.stringify(fetchResponse),
      headers: { "Content-Type": "application/json" },
      sendAsJson: false
    }, { method: "POST" });

    const { getByText, queryByText, getByLabelText } = render(<LoginForm />);

    const loginBtn = getByText(/submit/i);
    fireEvent.change(getByLabelText(/name/i), { target: { value: "user123" } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: "secure123" } });

    // Verify success text is not being displayed prior to login
    expect(queryByText("Successfully logged in")).toBeNull()
    await act(async () => fireEvent.click(loginBtn));
    expect(alertSpy).not.toHaveBeenCalled();
    expect(queryByText("Successfully logged in")).not.toBeNull();
  });
});