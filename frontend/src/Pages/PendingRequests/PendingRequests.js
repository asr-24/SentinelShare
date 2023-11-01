import React, { useState } from "react";
import axios from "axios";
import "./PendingRequests.css";

function PendingRequests() {
  const role = sessionStorage.getItem("type");
  const id = sessionStorage.getItem("userid");
  const [data, setData] = useState("");
  const [fetched, setFetched] = useState(false);
  const [vendorManager, setVendorManager] = useState("");
  const [responseAxios, setResponseAxios] = useState("");

  function fetchPendingRequests(e) {
    e.preventDefault();
    if (role === "employee") {
      axios.get("http://localhost:3003/VHpending").then((res) => {
        setData(res.data);
        setFetched(true);
      });
    } else if (role === "vendor") {
      axios.get("http://localhost:3003/vendorPending").then((res) => {
        setData(res.data);
        setFetched(true);
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    var url = "http://localhost:3003/vhdashboard";
    const response = await axios.post(url, vendorManager).catch((e) => {
      console.log(e);
    });
    setResponseAxios(response);
  };

  return (
    <div className="page">
      <div className="pendingrequests">
        <button onClick={fetchPendingRequests}>Get Pending Requests</button>
        {fetched && (
          <div className="requestform">
            <p>Event Date: {data.event_date}</p>
            <p>Event Theme Type: {data.event_theme_type}</p>
            <p>Event Time: {data.event_time}</p>
            <p>Event Type: {data.event_type}</p>
            <p>Event Venue Type: {data.event_venue_type}</p>
            <form className="pendingreqSend" onSubmit={handleSubmit}>
              <div>
                <label>Venue Manager</label>
                <input
                  name="choice"
                  value="Venue Manager"
                  type="radio"
                  onChange={(e) => setVendorManager("Venue Manager")}
                />
              </div>
              <div>
                <label>Decorator</label>
                <input
                  name="choice"
                  value="Decorator"
                  type="radio"
                  onChange={(e) => setVendorManager("Decorator")}
                />
              </div>
              <input type="submit"></input>
            </form>
            {responseAxios.data}
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingRequests;
