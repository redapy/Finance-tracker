import styles from "./Home.module.css";
//components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
//hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useListenCollection } from "../../hooks/useListenCollection";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useListenCollection("transactions");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
