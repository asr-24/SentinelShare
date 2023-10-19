import React from "react";
import { useState } from "react";
import "./Sidebar.css";
import {
  FiUser,
  FiClock,
  FiFilePlus,
  FiFolderPlus,
  FiBook,
  FiLogOut,
} from "react-icons/fi";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  function handleLogout() {
    sessionStorage.clear();
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
            <li>
              <FiFolderPlus />
            </li>
            <li>
              <FiBook />
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
              <a href="/createcontract">Create Contract</a>
              <a href="/viewdocs">View Documents</a>
            </div>
            <div className="dashboard-sidebar-text--user">
              <a href="/profile">Profile</a>
              <a href="/logout" onClick={handleLogout()}>
                Logged Out
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
