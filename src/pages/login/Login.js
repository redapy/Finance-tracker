import { useState } from "react";
//styles
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
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
      <button className="btn">Login</button>
    </form>
  );
};

export default Login;
