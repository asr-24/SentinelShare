import React from "react";

function Profile() {
  var userid = sessionStorage.getItem("userid");
  var name = sessionStorage.getItem("name");
  var type = sessionStorage.getItem("type");

  return (
    <div className="page">
      <h1>Profile</h1>
      <p>User ID: {userid}</p>
      <p>User Email: {name}</p>
      <p>User Type: {type}</p>
    </div>
  );
}

export default Profile;
