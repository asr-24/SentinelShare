import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FiUser, FiClock, FiFilePlus, FiLogOut } from "react-icons/fi";

import Cookies from "js-cookie";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const role = sessionStorage.getItem("type");

  function handleLogout() {
    Cookies.remove("auth");
    sessionStorage.clear();
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
            {role === "client" && (
              <li>
                <FiFilePlus />
              </li>
            )}
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
              <a href="/pendingrequests">Pending Requests</a>
              {role === "client" && <a href="/createrequest">Create Request</a>}
            </div>
            <div className="dashboard-sidebar-text--user">
              <a href="/profile">Profile</a>
              <a href="/#" onClick={handleLogout}>
                Log Out
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
