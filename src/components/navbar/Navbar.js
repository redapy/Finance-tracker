import { Link } from "react-router-dom";
import { useSignOut } from "../../hooks/useSignOut";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useSignOut();
  return (
    <nav data-testid="navbar" className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">myMoney</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn" onClick={logout}>
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
