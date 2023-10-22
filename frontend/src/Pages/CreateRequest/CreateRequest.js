import React from "react";
import "./CreateRequest.css";

function CreateRequest() {
  return (
    <div className="page">
      <h1>Create Request</h1>
      <form className="createrequest-form">
        <label for="event_date">Date:</label>
        <input name="event_date" type="date"></input>
        <label for="event_time">Time:</label>
        <input name="event_time" type="time"></input>
        <label for="event_type">Theme Type:</label>
        <select name="event_type">
          <option>Formal</option>
          <option>Casual</option>
          <option>Party</option>
          <option>Wedding</option>
        </select>
        <label for="event_theme_type">Venue Type:</label>
        <select name="event_theme_type">
          <option>Dark</option>
          <option>Warm</option>
          <option>Light</option>
          <option>Pastels</option>
          <option>Monochrome</option>
        </select>
        <label for="event_venue_type">Venue Type:</label>
        <select name="event_venue_type">
          <option>Small</option>
          <option>Medium</option>
          <option>Big</option>
          <option>Big</option>
          <option>Large</option>
        </select>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default CreateRequest;
