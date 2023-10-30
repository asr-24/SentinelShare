import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import PendingRequests from "./Pages/PendingRequests/PendingRequests";
import CreateRequest from "./Pages/CreateRequest/CreateRequest";
import Cookies from "js-cookie";
import Profile from "./Pages/Profile/Profile";

function App() {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("auth");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="App">
      {isAuthenticated && (
        <div className="dashboard">
          <Header />
          <Sidebar />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pendingrequests" element={<PendingRequests />} />
        <Route path="/createrequest" element={<CreateRequest />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
