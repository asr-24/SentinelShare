import React from "react";
import { useState } from "react";
import "./CreateRequest.css";
import axios from "axios";

function CreateRequest() {
  const [errMessage, setErrMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [guestList, setGuestList] = useState(false);
  const [guestListURL, setGuestListURL] = useState("");
  const [eventType, setEventType] = useState("Formal");
  const [eventThemeType, setEventThemeType] = useState("Dark");
  const [eventVenueType, setEventVenueType] = useState("Small");

  const handleSubmit = async (e) => {
    e.preventDefault();

    var user_id = sessionStorage.getItem("userid");
    console.log(user_id);
    var url = "http://localhost:3003/createrequest";

    var sentRequestData = {
      user_id: user_id,
      event_date: eventDate,
      event_time: eventTime,
      event_type: eventType,
      event_theme_type: eventThemeType,
      event_venue_type: eventVenueType,
      event_guest_added: guestList,
      event_guest_list_url: guestListURL,
    };
    const response = await axios.post(url, sentRequestData).catch((e) => {
      console.log(e);
    });
    console.log(response.datac);
    if (response.data === false) {
      setErrMessage(true);
    }
    if (response.data === true) {
      setSuccessMessage(true);
    }
  };

  return (
    <div className="page">
      {errMessage && (
        <div className="error-message">Error, request not sent</div>
      )}
      {successMessage && (
        <div className="success-message">Request sent successfully</div>
      )}
      {successMessage && <div className="success-message">Request sent</div>}
      <form className="createrequest-form" onSubmit={handleSubmit}>
        <h2>Event form</h2>
        <div>
          <label htmlFor="event_date">Date</label>
          <input
            name="event_date"
            value={eventDate}
            type="date"
            onChange={(e) => setEventDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="event_time">Time</label>
          <input
            name="event_time"
            value={eventTime}
            type="time"
            onChange={(e) => setEventTime(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="event_type">Event Type</label>
          <select
            name="event_type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option>Formal</option>
            <option>Casual</option>
            <option>Party</option>
            <option>Wedding</option>
          </select>
        </div>
        <div>
          <label htmlFor="event_theme_type">Theme Type</label>
          <select
            name="event_theme_type"
            onChange={(e) => setEventThemeType(e.target.value)}
          >
            <option>Dark</option>
            <option>Warm</option>
            <option>Light</option>
            <option>Pastels</option>
            <option>Monochrome</option>
          </select>
        </div>
        <div>
          <label htmlFor="event_venue_type">Venue Type</label>
          <select
            name="event_venue_type"
            onChange={(e) => setEventVenueType(e.target.value)}
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Big</option>
            <option>Large</option>
          </select>
        </div>
        <div>
          <label htmlFor="guest_list">Guest List</label>
          <input
            type="checkbox"
            name="guest_list"
            onChange={(e) => {
              setGuestList(e.target.checked);
              console.log(guestList);
            }}
          ></input>
        </div>
        {guestList && (
          <div>
            <label htmlForfor="guest_list_url">Guest List URL</label>
            <input
              name="guest_list_url"
              type="text"
              onChange={(e) => setGuestListURL(e.target.value)}
            ></input>
          </div>
        )}

        <input type="submit"></input>
      </form>
    </div>
  );
}

export default CreateRequest;
