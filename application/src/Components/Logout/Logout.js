import React from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  sessionStorage.clear();
  window.location.reload(false);
  return <Navigate replace to="/" />;
}
