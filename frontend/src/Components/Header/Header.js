import React from "react";
import "./Header.css";

function Header() {
  var Name = sessionStorage.getItem("name");

  return (
    <div>
      <nav className="dashboard-nav">
        <li>
          <a href="/">
            <h1>Dashboard</h1>
          </a>
        </li>
        <li>Hello, {Name}</li>
      </nav>
    </div>
  );
}

export default Header;
