import React from "react";

function PendingRequests() {
  const role = sessionStorage.getItem("type");
  console.log(role);

  if (role === "employee") {
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
