import { fireEvent, render, screen } from "@testing-library/react";
import TransactionForm from "./TransactionForm";

//mocked results
let mockAddDocument = jest.fn();
const mockResponse = {
  document: null,
  isPending: false,
  error: null,
  succes: null,
};
// mock the useFirstore hook
jest.mock("../../hooks/useFirestore", () => ({
  useFirestore: () => ({
    addDocument: mockAddDocument,
    response: mockResponse,
  }),
}));
// back to intial after every test
afterEach(() => {
  mockResponse.document = null;
  mockResponse.isPending = false;
  mockResponse.error = null;
  mockResponse.succes = null;
});

describe("TransactionForm Component", () => {
  describe("Renders", () => {
    it("Renders a header", () => {
      render(<TransactionForm />);
      const title = screen.getByRole("heading", { name: "Add a Transaction" });
      expect(title).toBeInTheDocument();
    });
    it("Renders a form", () => {
      render(<TransactionForm />);
      const transactionForm = screen.getByTestId("transaction-form");
      expect(transactionForm).toBeInTheDocument();
    });
    it("Renders a adding message when isPending is true", () => {
      mockResponse.isPending = true;
      render(<TransactionForm />);
      const addingMessage = screen.getByText(/Adding.../i);
      expect(addingMessage).toBeInTheDocument();
    });
    it("Renders an error message if there is an erro", () => {
      mockResponse.error = "could not add the transaction";
      render(<TransactionForm />);
      const errorMessage = screen.getByText(/could not add the transaction/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("Adding a transaction", () => {
    it("Calls addDocument with the correct arguments", () => {
      render(<TransactionForm uid={"uidTest"} />);
      //fill the name input
      const transactionName = screen.getByLabelText(/Transaction name:/i);
      fireEvent.change(transactionName, { target: { value: "test" } });
      //flll the amount input
      const amountInput = screen.getByLabelText("Amount ($):");
      fireEvent.change(amountInput, { target: { value: 15 } });
      //click the add transaction button
      const submitButton = screen.getByRole("button", {
        name: "Add Transaction",
      });
      fireEvent.click(submitButton);
      expect(mockAddDocument).toBeCalledTimes(1);
      expect(mockAddDocument).toBeCalledWith({
        amount: "15",
        name: "test",
        uid: "uidTest",
      });
    });
    it("Should not be able to click the add transaction when it's pending", () => {
      mockResponse.isPending = true;
      render(<TransactionForm />);
      const submitButton = screen.getByRole("button", {
        name: "Adding...",
      });
      expect(submitButton).toHaveAttribute("disabled");
      expect(mockAddDocument).toBeCalledTimes(0);
    });
  });
});
