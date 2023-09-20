import React, { useState } from "react";
import { ReactPropTypes } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import Authdb from "../../authdb.json";

function Authenticate(credentials) {
  // console.log(credentials);
  var found = Authdb.filter(function (item) {
    return item.username === credentials.username;
  });
  if (!found[0]) {
    return null;
  } else if (found[0].password === credentials.password) {
    return found[0];
  } else if (found[0].password != credentials.password) {
    return "wrongpass";
  }
}

export default function Login({ setSessionStore }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authenticate = Authenticate({
      username,
      password,
    });
    if (!authenticate) {
      alert("User not found");
    } else if (authenticate === "wrongpass") {
      alert("Wrong Password");
    } else {
      setSessionStore(authenticate);
    }
  };

  return (
    <div className="formWrapper">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="formInputs">
          <div>
            <label>Username</label> <br/>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label> <br/>
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
    verifyAuth: ReactPropTypes.func.isRequired,
  };
}
