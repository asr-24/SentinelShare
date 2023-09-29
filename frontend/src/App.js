import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Logout from "./Components/Logout/Logout";
import ClientDashboard from "./Components/ClientDashboard/ClientDashboard";
import VendorDashboard from "./Components/VendorDashboard/VendorDashboard";

function setSessionStore(found) {
  sessionStorage.setItem("role", found.role);
  sessionStorage.setItem("name", found.username);
  window.location.reload(false);
}

function getRole() {
  const role = sessionStorage.getItem("role");
  return role;
}

function getUsername() {
  const name = sessionStorage.getItem("name");
  return name;
}

function App() {
  const role = getRole();
  const name = getUsername();
  // console.log(name);
  if (!role) {
    return (
      <div>
        <Navbar role={role} />
        <Login setSessionStore={setSessionStore} />
      </div>
    );
  } else if (role === "client") {
    return (
      <div>
        <Navbar role={role} name={name} />
        <ClientDashboard />
      </div>
    );
  } else if (role === "vendor") {
    return (
      <div>
        <Navbar role={role} name={name} />
        <VendorDashboard />
      </div>
    );
  } else if (role === "employee") {
    return (
      <div>
        <Navbar role={role} name={name} />
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar role={role} />
      <BrowserRouter>
        <Routes>
          <Route path="/vdashbaord" element={<VendorDashboard />} />
          <Route path="/cdashboard" element={<ClientDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
