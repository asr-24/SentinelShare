import React, { useState } from "react";
import { ReactPropTypes } from "react";
import { useNavigate } from "react-router-dom";
import sha256 from "js-sha256";
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // async function authenticateUser(username, password) {
  //   var url = "http://localhost:3003/";
  //   var credentials = {
  //     username: username,
  //     password: sha256(password),
  //   };

  //   console.log("Sending post request through Axios ");
    // axios
    //   .post(url, credentials)
    //   .then(function (response) {
    //     console.log(response.data);
    //     if(response){
    //       const userData = {
    //         username, password,
    //       }
    //       const expirationTime = new Date(new Date().getTime() + 60000);
    //       Cookies.set('auth', JSON.stringify(userData), {expires: expirationTime});
    //     }
    //     return true
    //   })
    //   .catch((e) => {console.log(e); return false});
  //   const response = await axios.post(url, credentials);
  //   console.log(response.data);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    var url = "http://localhost:3003/";
    var credentials = {
      username: username,
      password: sha256(password),
    };

    const response = await axios.post(url, credentials);
    console.log(response.data);

    if (response.data) {
      navigate("/dashboard");
    } else {
      console.log("Authentication Failed");
    }
  };


  return (
    <div className="formWrapper">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="formInputs">
          <div>
            <label>Username</label> <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label> <br />
            <input
              type="password"
              value={password}
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
}
