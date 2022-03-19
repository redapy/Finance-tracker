import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import styles from "./Signup.module.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, loading, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form
      data-testid="signup-form"
      onSubmit={handleSubmit}
      className={styles["signup-form"]}
    >
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <label>
        <span>username:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>
      <button className="btn" disabled={loading}>
        {loading ? "please wait" : "Sign up"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
