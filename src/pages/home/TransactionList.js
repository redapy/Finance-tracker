import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";
const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore("transactions");
  return (
    <ul data-testid="tansaction-list" className={styles.transactions}>
      {transactions.map((transaction) => (
        <li data-testid="transaction" key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
