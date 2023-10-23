import React from "react";
import { useState } from 'react'
import "./CreateRequest.css";
import axios from "axios";

function CreateRequest() {

  const [errMessage, setErrMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [eventDate, setEventDate] = useState();
  const [eventTime, setEventTime] = useState();
  const [eventType, setEventType] = useState();
  const [eventThemeType, setEventThemeType] = useState();
  const [eventVenueType, setEventVenueType] = useState();

  const handeSubmit = async (e) =>{
    e.preventDefault();

    var user_id = sessionStorage.getItem("user_id")
    var url = "http://localhost:3003/createrequest"

    var sentRequestData = {
      user_id: user_id,
      event_date: eventDate,
      event_time: eventTime,
      event_type: eventType,
      event_theme_type: eventThemeType,
      event_venue_type: eventVenueType,
    }

    const response = await axios.post(url, sentRequestData).catch((e) => {console.log(e)})
    console.log(response.data)

    if(response.data === false){
      setErrMessage = false;
    }
  }


  return (
    <div className="page">
      <h1>Create Request</h1>
      {errMessage &&
        <div className="error-message">Error, request not sent</div>
      }
      {successMessage && 
        <div className="success-message">Request sent</div>
      }
      <form className="createrequest-form" onSubmit={handeSubmit}>
        <label for="event_date">Date:</label>
        <input name="event_date" value={eventDate} type="date"></input>
        <label for="event_time">Time:</label>
        <input name="event_time" value={eventTime} type="time"></input>
        <label for="event_type">Theme Type:</label>
        <select name="event_type" value={eventType}>
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
