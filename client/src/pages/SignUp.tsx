import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SIGNUP = gql`
  mutation Mutation($password: String!, $email: String!) {
    createUser(password: $password, email: $email) {
      email
      hashedPassword
      id
    }
  }
`;

export default function SignUp() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [signup, { data, error }] = useMutation(SIGNUP, {
    variables: { email, password },
  });

  if (data) {
    toast.success("gg");
    console.log(data);
    return <Navigate to="/home" />;
  }
  if (error) {
    toast.error("fail");
    console.log("error", error);
  }

  return (
    <form
      className="login-form"
      onSubmit={async (e) => {
        e.preventDefault();
        signup();
      }}
    >
      <div className="login-input-form">
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div className="login-input-form">
        <label htmlFor="email">password :</label>
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <button type="submit">SignUp</button>
    </form>
  );
}
