import Navbar from "./Navbar";
import { fireEvent, render, screen } from "@testing-library/react";
//Router and context provider
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

//mocking useSignOut
let mockLogout = jest.fn();
jest.mock("../../hooks/useSignOut", () => ({
  useSignOut: () => ({
    logout: mockLogout,
  }),
}));
//utils
const customRender = (component, providerValue) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={providerValue}>
        {component}
      </AuthContext.Provider>
    </MemoryRouter>
  );
};
// test cases
describe("Navbar component", () => {
  describe("Renders", () => {
    const value = { user: null };
    it("Render a navbar component", () => {
      customRender(<Navbar />, value);
      const navbar = screen.getByTestId("navbar");
      expect(navbar).toBeInTheDocument();
    });
    it("Render a logo title", () => {
      customRender(<Navbar />, value);
      const logo = screen.getByText(/myMoney/i);
      expect(logo).toBeInTheDocument();
    });
    it("Render a link to the signup page", () => {
      customRender(<Navbar />, value);
      const signupLink = screen.getByText(/signup/i);
      expect(signupLink).toBeInTheDocument();
    });
    it("Render a link to the login page", () => {
      customRender(<Navbar />, value);
      const loginLink = screen.getByText(/login/i);
      expect(loginLink).toBeInTheDocument();
    });

    // When user is Logged in
    describe("Renders when there is a logged in user", () => {
      // set the user state to be an object, not null
      const value = { user: { displayName: "test test" } };
      //test cases
      it("Renders a text containing the user display name", () => {
        customRender(<Navbar />, value);
        const displayName = screen.getByText(/test test/i);
        expect(displayName).toBeInTheDocument();
      });
      it("Render a logout button", () => {
        customRender(<Navbar />, value);
        const logoutButton = screen.getByRole("button", { name: "Log out" });
        expect(logoutButton).toBeInTheDocument();
      });
      it("Should NOT render a link to the login page", () => {
        customRender(<Navbar />, value);
        const loginLink = screen.queryByText(/login/i);
        expect(loginLink).not.toBeInTheDocument();
      });
      it("Should NOT render a link to a signup page", () => {
        customRender(<Navbar />, value);
        const loginLink = screen.queryByText(/signup/i);
        expect(loginLink).not.toBeInTheDocument();
      });
    });
  });

  describe("Clicking the logout button", () => {
    const value = { user: { displayName: "test" } };
    it("call the logout function", () => {
      customRender(<Navbar />, value);
      const logoutButton = screen.getByRole("button", { name: "Log out" });
      fireEvent.click(logoutButton);
      expect(mockLogout).toHaveBeenCalled();
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
