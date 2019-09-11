import React from "react";
import "./Notification.css";

const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={error ? "error" : "success"}>
      <h3>{message}</h3>
    </div>
  );
};

export default Notification;
