import React from "react";
import { useState } from "react";
import "./ClientDashboard.css";

export default function ClientDashboard() {
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
      <div className="formWrapper">
        <form className="clientForm">
          <label>Event Date:</label>
          <input type="date"></input>
          <label>Event Time:</label>
          <input type="time"></input>
          <label>Event Type:</label>
          <select>
            <option>Formal</option>
            <option>Casual</option>
            <option>Party</option>
            <option>Wedding</option>
          </select>
          <label>Theme Type:</label>
          <select>
            <option>Dark</option>
            <option>Warm</option>
            <option>Light</option>
            <option>Pastel</option>
            <option>Monochrome</option>
          </select>
          <label>Venue Type:</label>
          <select>
            <option>Small</option>
            <option>Medium</option>
            <option>Big</option>
            <option>Large</option>
          </select>
          <div>
            <input
              name=""
              type="checkbox"
              value={checked}
              onChange={handleChange}
            ></input>
            <label>Guest List</label>
            {checked && (
              <div className="guestList">
                <input type="file"></input>
              </div>
            )}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
