import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  console.log("email :", email);

  const [password, setPassword] = useState("");
  console.log("password :", password);

  return (
    <form className="login-form">
      <label htmlFor="email">email :</label>
      <input
        id="email"
        type="text"
        placeholder="toto@gmail.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <label htmlFor="password">password :</label>
      <input
        id="password"
        type="password"
        placeholder="password ?"
        autoComplete="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </form>
  );
}
