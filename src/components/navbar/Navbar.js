import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignOut } from "../../hooks/useSignOut";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useSignOut();
  const { user } = useAuthContext();
  return (
    <nav data-testid="navbar" className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">myMoney</Link>
        </li>
        {user ? (
          <>
            <p>
              Hello, <span>{user.displayName}</span>
            </p>
            <li>
              <button className="btn" onClick={logout}>
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
