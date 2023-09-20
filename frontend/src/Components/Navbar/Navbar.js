import React from "react";
import "./Navbar.css";

export default function Navbar(props) {
  function handleLogout() {
    sessionStorage.clear();
  }
  console.log(props);
  let role = props.role;
  let name = props.name;
  console.log(props.role, props.name);

  if (!role) {
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
      {/* <li>
        <a href="/dashboard">Dashboard</a>
      </li> */}
      <li>Welcome, {name}</li>
      <li>
        <form onSubmit={handleLogout}>
          <div className="submitLogout">
            <button type="submit">Logout</button>
          </div>
        </form>
      </li>
    </nav>
  );
}
