import React from "react";
import axios from "axios";

function PendingRequests() {
  const role = sessionStorage.getItem("type");

  if (role === "employee") {
    console.log("Employee");
    axios.get("/VHpending").then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div className="page">
      <div className="pendingrequests">
        <h1>Pending Requests</h1>
      </div>
    </div>
  );
}

export default PendingRequests;
