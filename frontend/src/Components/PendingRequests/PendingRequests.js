import React from "react";
import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";

export default function PendingRequests() {
  const [checked, setChecked] = useState(false);

  let content = "";

  const handleChange = (e) => {
    if (e.target.checked) {
    } else {
    }
    setChecked((current) => !current);
  };

  return (
    <div>
      <Dashboard />
      <h1>Pending Requests</h1>
    </div>
  );
}
