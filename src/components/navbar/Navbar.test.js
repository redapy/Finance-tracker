import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

describe("Navbar component", () => {
  const NavbarWithRouter = () => {
    return (
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  };
  describe("Renders", () => {
    it("Render a navbar component", () => {
      render(<NavbarWithRouter />);
      const navbar = screen.getByTestId("navbar");
      expect(navbar).toBeInTheDocument();
    });
    it("Render a logo title", () => {
      render(<NavbarWithRouter />);
      const logo = screen.getByText(/myMoney/i);
      expect(logo).toBeInTheDocument();
    });
    it("Render a link to the signup page", () => {
      render(<NavbarWithRouter />);
      const signupLink = screen.getByText(/signup/i);
      expect(signupLink).toBeInTheDocument();
    });
    it("Render a link to the login page", () => {
      render(<NavbarWithRouter />);
      const loginLink = screen.getByText(/login/i);
      expect(loginLink).toBeInTheDocument();
    });
  });
});
