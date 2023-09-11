import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Logout from "./Components/Logout/Logout";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
  window.location.reload(false);
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {
  const token = getToken();

  if (!token) {
    return (
      <div>
        <Navbar tokenPresence={null} /> <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar tokenPresence={token} />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
