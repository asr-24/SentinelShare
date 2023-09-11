import React from "react";
import "./Navbar.css";

export default function Navbar({ tokenPresence }) {
  console.log(tokenPresence);

  if (!tokenPresence) {
    return (
      <nav>
        <li className="Logo">
          <a href="/">SentinelShare</a>
        </li>
      </nav>
    );
  }
  return (
    <nav>
      <li className="Logo">
        <a href="/">SentinelShare</a>
      </li>
      <li>
        <a href="/dashboard">Dashboard</a>
      </li>
      <li>
        <a href="/logout">Logout</a>
      </li>
    </nav>
  );
}
