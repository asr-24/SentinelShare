import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FiUser, FiClock, FiFilePlus, FiLogOut } from "react-icons/fi";

import Cookies from "js-cookie";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    console.log("Logging out");
    Cookies.remove("auth");
    navigate("/login");
  }

  return (
    <div>
      <div className="dashboard-sidebar" onMouseLeave={() => setSidebar(false)}>
        <div
          className="dashboard-sidebar-icons"
          onMouseEnter={() => setSidebar(true)}
        >
          <div className="dashboard-sidebar-icons--actions">
            <li>
              <FiClock />
            </li>
            <li>
              <FiFilePlus />
            </li>
          </div>
          <div className="dashboard-sidebar-icons--user">
            <li>
              <FiUser />
            </li>
            <li>
              <FiLogOut />
            </li>
          </div>
        </div>
        {sidebar && (
          <div className="dashboard-sidebar-text">
            <div className="dashboard-sidebar-text--actions">
              <a href="/pendingrequest">Pending Requests</a>
              <a href="/createrequest">Create Request</a>
            </div>
            <div className="dashboard-sidebar-text--user">
              <a href="/profile">Profile</a>
              <a onClick={handleLogout}>Log Out</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
