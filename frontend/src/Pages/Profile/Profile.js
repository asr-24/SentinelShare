import React from "react";
import "./Profile.css";
import { FiUser, FiMail, FiBriefcase } from "react-icons/fi";

function Profile() {
  var userid = sessionStorage.getItem("userid");
  var name = sessionStorage.getItem("name");
  var type = sessionStorage.getItem("type");

  return (
    <div className="page">
      <div className="profile-info">
        <p>
          <FiUser />
          ID: {userid}
        </p>
        <p>
          <FiMail />
          Email: {name}
        </p>
        <p>
          <FiBriefcase />
          Role: {type}
        </p>
      </div>
    </div>
  );
}

export default Profile;
