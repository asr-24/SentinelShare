import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sha256 from "js-sha256";
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingIcons from "react-loading-icons";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginErrorState, setLoginErrorState] = useState(false);
  const [loginErrMessage, setLoginErrMessage] = useState(false);

  // const isAuthenticated = !!Cookies.get("auth");

  useEffect(() => {
    if (!!Cookies.get("auth")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginErrorState(false);
    setLoggingIn(true);

    var url = "http://localhost:3003/login";
    var credentials = {
      username: username,
      password: sha256(password),
    };

    const response = await axios
      .post(url, credentials)
      .catch((e) => console.log("error"));

    sessionStorage.setItem("name", response.data.userEmail);
    sessionStorage.setItem("type", response.data.userType);
    sessionStorage.setItem("userid", response.data.userId);

    if (response.data.auth) {
      setLoggingIn(false);
      const userData = {
        username,
        password,
      };
      Cookies.set("auth", JSON.stringify(userData), {});
      navigate("/");
    } else {
      document.getElementById("login-form").reset();
      console.log("Authentication Failed");
      setLoginErrorState(true);
      setPassword("");
      setUsername("");
      setLoginErrMessage("Invalid password");
      setLoggingIn(false);
    }
  };

  return (
    <div className="content-wrapper">
      <div
        className={`login-error-message ${
          loginErrorState ? "fadeDown" : "hidden"
        }`}
      >
        {loginErrMessage}
      </div>

      <div className={`form-wrapper ${loggingIn ? "" : ""}`}>
        <h1>Login</h1>
        <form className="login-form" id="login-form" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div>
              <label>Username</label> <br />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label> <br />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="submit-button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <div className={`loader ${loggingIn ? "fadeDown" : "hidden"}`}>
        <LoadingIcons.Oval stroke="black" />
      </div>
    </div>
  );
}
