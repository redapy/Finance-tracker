import { fireEvent, render, screen } from "@testing-library/react";
import Signup from "./Signup";

//mocking useSignUp
let mockSignup = jest.fn();
let mockLoading = false;
let mockError = null;

jest.mock("../../hooks/useSignup", () => ({
  useSignup: () => ({
    signup: mockSignup,
    loading: mockLoading,
    error: mockError,
  }),
}));

describe("Signup page", () => {
  //back to initial state after evry test
  afterEach(() => {
    mockSignup = jest.fn();
    mockLoading = false;
    mockError = null;
  });
  describe("Renders", () => {
    it("Render a signup page", () => {
      render(<Signup />);
      const signupPage = screen.getByTestId("signup-form");
      expect(signupPage).toBeInTheDocument();
    });
    it("Render a signup header", () => {
      render(<Signup />);
      const header = screen.getByRole("heading", { name: "Sign up" });
      expect(header).toBeInTheDocument();
    });
    it("Render a signup button", () => {
      render(<Signup />);
      const signupButton = screen.getByRole("button", { name: "Sign up" });
      expect(signupButton).toBeInTheDocument();
    });
    it("Render a disabled waiting button when the loading state is true", () => {
      mockLoading = true;
      render(<Signup />);
      const disabledButton = screen.getByRole("button", {
        name: "please wait",
      });
      expect(disabledButton).toBeInTheDocument();
      expect(disabledButton).toHaveAttribute("disabled");
    });
    it("Render an error message when there is an error", () => {
      mockError = "could not sign up";
      render(<Signup />);
      const errorMessage = screen.getByText("could not sign up");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("filling the form with valid inputs", () => {
    it("call a signup function with the user inputs", async () => {
      render(<Signup />);
      //fill the email input
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: "test2@gmail.com" } });
      //fill the password input
      const passwordInput = screen.getByLabelText(/password/i);
      fireEvent.change(passwordInput, { target: { value: "testtest" } });
      // fill the username input
      const usernameInput = screen.getByLabelText(/Username/i);
      fireEvent.change(usernameInput, { target: { value: "redapy" } });
      //click the submit button
      const submitButton = screen.getByRole("button", { name: "Sign up" });
      expect(submitButton).toBeInTheDocument();
      fireEvent.click(submitButton);
      expect(mockSignup).toHaveBeenCalled();
      expect(mockSignup).toBeCalledWith(
        "test2@gmail.com",
        "testtest",
        "redapy"
      );
    });
  });
});
