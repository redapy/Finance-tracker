import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
//styles
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form
      data-testid="login-form"
      onSubmit={handleSubmit}
      className={styles["login-form"]}
    >
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="btn" disabled={loading}>
        {loading ? "please wait" : "Login"}
      </button>
      <p>{error}</p>
    </form>
  );
};

export default Login;
