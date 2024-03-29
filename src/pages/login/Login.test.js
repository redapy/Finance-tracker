import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

//mock useLogin
let mockLogin = jest.fn();
let mockLoading = false;
let mockError = true;
jest.mock("../../hooks/useLogin", () => ({
  useLogin: () => ({
    login: mockLogin,
    loading: mockLoading,
    error: mockError,
  }),
}));

// Test cases
describe("Login page", () => {
  describe("Renders", () => {
    it("Renders a login form", () => {
      render(<Login />);
      const loginForm = screen.getByTestId("login-form");
      expect(loginForm).toBeInTheDocument();
    });
    it("Renders a title", () => {
      render(<Login />);
      const title = screen.getByRole("heading", { name: "login" });
      expect(title).toBeInTheDocument();
    });
    it("Renders an email input", () => {
      render(<Login />);
      const emailInput = screen.getByLabelText(/email:/i);
      expect(emailInput).toBeInTheDocument();
    });
    it("Renders a password input", () => {
      render(<Login />);
      const paswwordInput = screen.getByLabelText(/password:/i);
      expect(paswwordInput).toBeInTheDocument();
    });
    it("Renders a login button", () => {
      render(<Login />);
      const button = screen.getByRole("button", { name: "Login" });
      expect(button).toBeInTheDocument();
    });

    it("Renders a loading button when loading is true", () => {
      mockLoading = true;
      render(<Login />);
      const button = screen.getByRole("button", { name: "please wait" });
      expect(button).toBeInTheDocument();
    });
    it("Renders an error message when there is an error", () => {
      mockLoading = false;
      mockError = "could not login the user";
      render(<Login />);
      const errorMessage = screen.getByText("could not login the user");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("filling the form", () => {
    it("Should be able to type in the email input", () => {
      render(<Login />);
      const emailInput = screen.getByLabelText(/email:/i);
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      expect(emailInput.value).toBe("test@gmail.com");
    });
    it("Should be able to type in the password input", () => {
      render(<Login />);
      const passwordInput = screen.getByLabelText(/password:/i);
      fireEvent.change(passwordInput, { target: { value: "1234567" } });
      expect(passwordInput.value).toBe("1234567");
    });
    it("Login should be called with the user inputs", () => {
      render(<Login />);
      // fill the email input
      const emailInput = screen.getByLabelText(/email:/i);
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      //fill the password input
      const passwordInput = screen.getByLabelText(/password:/i);
      fireEvent.change(passwordInput, { target: { value: "1234567" } });
      // click the login button
      const button = screen.getByRole("button", { name: "Login" });
      fireEvent.click(button);
      // assert that the login function is called with the correct arguments
      expect(mockLogin).toBeCalledTimes(1);
      expect(mockLogin).toBeCalledWith("test@gmail.com", "1234567");
    });
  });
});
