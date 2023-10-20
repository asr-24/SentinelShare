import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import PendingRequests from "./Pages/PendingRequests/PendingRequests";
import CreateRequest from "./Pages/CreateRequest/CreateRequest";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("auth");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      {isAuthenticated && (
        <div className="dashboard">
          <Header />
          <Sidebar />
        </div>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pendingrequests" element={<PendingRequests />} />
        <Route path="/createrequest" element={<CreateRequest />} />
      </Routes>
    </div>
  );
}

export default App;
