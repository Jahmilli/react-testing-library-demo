import React from "react";
import { render, wait } from "@testing-library/react";
import HomePage from "./HomePage";
import * as userDetails from "../../logic/functions/userDetails";

describe("HomePage", () => {
  it("should display the users name", async () => {
    const getUserDetailsMock = jest
      .spyOn(userDetails, "getUserDetails")
      .mockResolvedValue({ username: "SebSouthern" });
    const { getByText } = render(<HomePage />);
    await wait();
    expect(getUserDetailsMock).toHaveBeenCalled();
    expect(getByText("Welcome SebSouthern"));
  });

  // it("should display the users most popular meal", () => {
  //   const getUserDetailsMock = jest
  //     .spyOn(userDetails, "getUserDetails")
  //     .mockResolvedValue({ username: "SebSouthern" });

  // });
});
