import React from "react";
import "./Header.css";

function Header() {
  var Name = "Yash";

  return (
    <div>
      <nav className="dashboard-nav">
        <li>
          <h1>Dashboard</h1>
        </li>
        <li>Hello, {Name}</li>
      </nav>
    </div>
  );
}

export default Header;
