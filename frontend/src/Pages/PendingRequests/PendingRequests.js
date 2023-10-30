import React, { useEffect, useState } from "react";
import axios from "axios";

function PendingRequests() {
  const role = sessionStorage.getItem("type");
  const [data, setData] = useState("");

  useEffect(() => {
    if (role === "employee") {
      axios.get("http://localhost:3003/VHpending").then((res) => {
        setData(res.data);
      });
    }
  });

  return (
    <div className="page">
      <div className="pendingrequests">
        <h1>Pending Requests</h1>
      </div>
    </div>
  );
}

export default PendingRequests;
