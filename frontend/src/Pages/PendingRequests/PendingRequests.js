import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingIcons from "react-loading-icons";
import "./PendingRequests.css";
import { FiArrowDown } from "react-icons/fi";

function PendingRequests() {
  const role = sessionStorage.getItem("type");
  const id = sessionStorage.getItem("userid");
  const [data, setData] = useState("");
  const [fetched, setFetched] = useState(false);
  const [vendorManager, setVendorManager] = useState("");
  const [responseAxios, setResponseAxios] = useState("");
  const [loading, setLoading] = useState(false);

  function fetchPendingRequests(e) {
    setLoading(true);
    if (role === "employee") {
      axios.get("http://localhost:3003/VHpending").then((res) => {
        setData(res.data);
        setFetched(true);
        setLoading(false);
      });
    } else if (role === "vendor") {
      axios.get("http://localhost:3003/vendorPending").then((res) => {
        setData(res.data);
        setFetched(true);
        setLoading(false);
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
        <button
          className="fetch-pendingrequest-button"
          onClick={fetchPendingRequests}
        >
          <FiArrowDown />
          {"  "}Get Pending Requests
        </button>
        <div className={`loader ${loading ? "fadeDown" : "hidden"}`}>
          <LoadingIcons.Oval stroke="black" />
        </div>
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
            <div className="successMessage">{responseAxios.data}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingRequests;
