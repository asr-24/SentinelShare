import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Logout from "./Components/Logout/Logout";
import CreateRequest from "./Components/CreateRequest/CreateRequest";
import PendingRequests from "./Components/PendingRequests/PendingRequests";
import Cookies from "js-cookie";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {

  const [sessionStorage, setSessionStorage] = useState(false)

  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pendingrequests" element={<PendingRequests />} />
          <Route path="/createrequest" element={<CreateRequest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
