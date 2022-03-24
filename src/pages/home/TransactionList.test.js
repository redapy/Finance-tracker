import { fireEvent, render, screen } from "@testing-library/react";
import TransactionList from "./TransactionList";

//mock fireStore custom hook
const mockDeleteDocument = jest.fn();
jest.mock("../../hooks/useFirestore", () => ({
  useFirestore: () => ({
    deleteDocument: mockDeleteDocument,
  }),
}));
describe("TransactionList component", () => {
  //mock the transactions props that will be recieved from the home component
  const mockedProps = [
    {
      name: "test",
      amount: "2",
      uid: "testuid",
      id: "1",
    },
    {
      name: "test2",
      amount: "3",
      uid: "testuid2",
      id: "2",
    },
  ];
  describe("Renders", () => {
    it("Renders a transaction list wrapper", () => {
      render(<TransactionList transactions={mockedProps} />);
      const list = screen.getByTestId("tansaction-list");
      expect(list).toBeInTheDocument();
    });
    it("Renders two transactions list", () => {
      render(<TransactionList transactions={mockedProps} />);
      const transaction = screen.getAllByTestId("transaction");
      expect(transaction.length).toBe(2);
    });
    it("Renders the name and the transaction amount", () => {
      render(<TransactionList transactions={mockedProps} />);
      const name = screen.getByText(/test2/i);
      expect(name).toBeInTheDocument();
      const amount = screen.getByText(/3/i);
      expect(amount).toBeInTheDocument();
    });
  });
  describe("Deleting a transaction", () => {
    it("Call the delteDocument with the correct arguments", () => {
      render(<TransactionList transactions={mockedProps} />);
      const deleteButtons = screen.getAllByRole("button", { name: "x" });
      //click the delete button for the first transaction
      fireEvent.click(deleteButtons[0]);
      expect(mockDeleteDocument).toHaveBeenCalledTimes(1);
      //assert to be called with the the first transaction id
      expect(mockDeleteDocument).toBeCalledWith("1");
    });
  });
});
