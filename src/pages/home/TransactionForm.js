import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      name,
      amount,
      uid,
    });
  };

  useEffect(() => {
    if (response.succes) {
      setName("");
      setAmount("");
    }
  }, [response.succes]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form data-testid="transaction-form" onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            min="0"
          />
        </label>
        <button disabled={response.isPending}>Add Transaction</button>
        {response.error && <p className="error">{response.error}</p>}
        {response.isPending && <p>Adding...</p>}
      </form>
    </>
  );
};

export default TransactionForm;
