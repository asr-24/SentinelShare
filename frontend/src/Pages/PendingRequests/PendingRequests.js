import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingIcons from "react-loading-icons";
import "./PendingRequests.css";
import {
  FiArrowDown,
  FiCalendar,
  FiClock,
  FiUserCheck,
  FiMinimize,
  FiStar,
  FiGift,
  FiLink,
} from "react-icons/fi";

function PendingRequests() {
  const role = sessionStorage.getItem("type");
  const id = sessionStorage.getItem("userid");
  const [data, setData] = useState("");
  const [fetched, setFetched] = useState(false);
  const [allocation, setAllocation] = useState("");
  const [responseAxios, setResponseAxios] = useState("");
  const [loading, setLoading] = useState(false);
  const [allDone, setallDone] = useState(false);
  const [vendorChoice, setVendorChoice] = useState("");

  function fetchPendingRequests(e) {
    setLoading(true);
    if (role === "employee") {
      axios.get("http://localhost:3003/vhpendingrequests").then((res) => {
        setData(res.data);
        setFetched(true);
        setLoading(false);
      });
    } else if (role === "vendor") {
      axios
        .post("http://localhost:3003/vendorpendingrequests", { vendorid: id })
        .then((res) => {
          setData(res.data);
          setFetched(true);
          setLoading(false);
        });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    var url = "http://localhost:3003/vhdashboard";
    const response = await axios
      .post(url, { allocation: allocation, event_id: data.event_id })
      .catch((e) => {
        console.log(e);
      });
    setResponseAxios(response);
    setLoading(false);
    setallDone(true);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    var url = "http://localhost:3003/vendordashboard";
    const response = await axios
      .post(url, { choice: vendorChoice })
      .catch((e) => {
        console.log(e);
      });
    setResponseAxios(response);
    setallDone(true);
    setLoading(false);
  };

  return (
    <div className="page">
      {allDone && "No more pending requests"}
      {!allDone && (
        <div className="pendingrequests">
          <div className={`loader ${loading ? "fadeDown" : "hidden"}`}>
            <LoadingIcons.Oval stroke="black" />
          </div>
          {!fetched && (
            <div>
              <button
                className="fetch-pendingrequest-button"
                onClick={fetchPendingRequests}
              >
                <FiArrowDown />
                {"  "}Get Pending Requests
              </button>
            </div>
          )}
          {fetched && (
            <div className="requestform">
              <p>
                <b>Event ID: {data.event_id}</b>
              </p>
              <p>
                <FiCalendar /> Date: {data.event_date}
              </p>
              <p>
                <FiClock />
                Time: {data.event_time}
              </p>
              <p>
                <FiGift />
                Type: {data.event_type}
              </p>
              <p>
                <FiStar />
                Theme: {data.event_theme_type}
              </p>
              <p>
                <FiMinimize />
                Venue Size: {data.event_venue_type}
              </p>
              {role === "employee" && (
                <form className="pendingreqSend" onSubmit={handleSubmit}>
                  <div>
                    <label>Venue Manager</label>
                    <input
                      required
                      name="choice"
                      value="Venue Manager"
                      type="radio"
                      onChange={(e) => setAllocation("Venue Manager")}
                    />
                  </div>
                  <div>
                    <label>Decorator</label>
                    <input
                      required
                      name="choice"
                      value="Decorator"
                      type="radio"
                      onChange={(e) => setAllocation("Decorator")}
                    />
                  </div>
                  <input type="submit"></input>
                </form>
              )}
              {role === "vendor" && (
                <div>
                  <form className="pendingreqSend" onSubmit={handleSubmit2}>
                    <div>
                      <label>Approved</label>
                      <input
                        required
                        name="choice"
                        value="Approved"
                        type="radio"
                        onChange={(e) => setVendorChoice("Approved")}
                      />
                    </div>
                    <div>
                      <label>Rejected</label>
                      <input
                        required
                        name="choice"
                        value="Rejected"
                        type="radio"
                        onChange={(e) => setVendorChoice("Rejected")}
                      />
                    </div>
                    <input type="submit"></input>
                  </form>
                </div>
              )}
              <div className="successMessage">{responseAxios.data}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PendingRequests;
