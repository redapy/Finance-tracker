import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AuthContextProvider } from "../../context/AuthContext";

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
  });
});
