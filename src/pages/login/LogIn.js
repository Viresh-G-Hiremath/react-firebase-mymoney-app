import { Link } from "react-router-dom";
import { useState } from "react";

import "./LogIn.css";
import { useLogin } from "../../hooks/useLogin";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <hr />
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button>Login</button>}
      {isPending && <button disabled>Loading</button>}
      {error && <p>{error}</p>}
      <p>
        Not a user? <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
}
