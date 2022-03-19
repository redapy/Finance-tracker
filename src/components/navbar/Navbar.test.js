import Navbar from "./Navbar";
import { fireEvent, render, screen } from "@testing-library/react";
//Router and context provider
import { MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";

//mocking useSignOut
let mockLogout = jest.fn();
jest.mock("../../hooks/useSignOut", () => ({
  useSignOut: () => ({
    logout: mockLogout,
  }),
}));

describe("Navbar component", () => {
  const MockedNavbar = () => {
    return (
      <AuthContextProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContextProvider>
    );
  };
  describe("Renders", () => {
    it("Render a navbar component", () => {
      render(<MockedNavbar />);
      const navbar = screen.getByTestId("navbar");
      expect(navbar).toBeInTheDocument();
    });
    it("Render a logo title", () => {
      render(<MockedNavbar />);
      const logo = screen.getByText(/myMoney/i);
      expect(logo).toBeInTheDocument();
    });
    it("Render a link to the signup page", () => {
      render(<MockedNavbar />);
      const signupLink = screen.getByText(/signup/i);
      expect(signupLink).toBeInTheDocument();
    });
    it("Render a link to the login page", () => {
      render(<MockedNavbar />);
      const loginLink = screen.getByText(/login/i);
      expect(loginLink).toBeInTheDocument();
    });
    it("Render a logout component", () => {
      render(<MockedNavbar />);
      const logoutButton = screen.getByRole("button", { name: "Log out" });
      expect(logoutButton).toBeInTheDocument();
    });
  });
  describe("clicking the logout button", () => {
    it("call the logout function", () => {
      render(<MockedNavbar />);
      const logoutButton = screen.getByRole("button", { name: "Log out" });
      fireEvent.click(logoutButton);
      expect(mockLogout).toHaveBeenCalled();
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
