import { useState } from "react";
import { Navigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

const LOGIN = gql`
  query Query($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [login, { data, error }] = useLazyQuery(LOGIN, {
    variables: { email, password },
  });

  if (data) {
    console.log("data from query", data.login);
    localStorage.setItem("token", data.login);
    return <Navigate to="/home" />;
  }
  if (error) {
    console.log("error", error);
  }

  return (
    <form
      className="login-form"
      onSubmit={async (e) => {
        e.preventDefault();
        login();
      }}
    >
      <div className="login-input-form">
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
      </div>
      <br />
      <div className="login-input-form">
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
      </div>
      <br />
      <button>Login</button>
    </form>
  );
}
