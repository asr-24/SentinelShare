import React, { useState } from "react";
import { ReactPropTypes } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";

async function loginUser(credentials) {
  console.log(credentials);
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="formWrapper">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="formInputs">
          <div>
            <label>Username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="submitButton">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );

  Login.ReactPropTypes = {
    setToken: ReactPropTypes.func.isRequired,
  };
}
