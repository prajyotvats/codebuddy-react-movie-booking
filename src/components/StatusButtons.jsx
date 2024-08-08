import React from "react";
import "./StatusButton.css";

const StatusButtons = () => {
  return (
    <div className="status-buttons">
      <div className="status-button available">
        <button disabled></button>
        <span>Available</span>
      </div>
      <div className="status-button reserved">
        <button disabled></button>
        <span>Reserved</span>
      </div>
      <div className="status-button selected">
        <button disabled></button>
        <span>Selected</span>
      </div>
    </div>
  );
};

export default StatusButtons;
