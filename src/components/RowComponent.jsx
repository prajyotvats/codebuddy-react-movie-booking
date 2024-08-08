import React, { useState } from "react";
import "../pages/Home.css";

const RowComponent = ({ rowData, onSeatSelection, selectedSeats, setSelectedSeats }) => {
  const { seats } = rowData;

  const handleSeatClick = (seat) => {
    if (seat.isReserved) return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);

    let newSelectedSeats;

    if (isSelected) {
      newSelectedSeats = selectedSeats.filter((s) => s.id !== seat.id);
    } else {
      if (selectedSeats.length >= 5) {
        alert("You can select a maximum of 5 seats.");
        return;
      }
      newSelectedSeats = [...selectedSeats, seat];
    }
    setSelectedSeats(newSelectedSeats);
    // onSeatSelection(newSelectedSeats);
  };

  return (
    <div className="seat-row">
      {seats?.map((seat) => {
        const isSelected = selectedSeats.some((s) => s.id === seat.id);
        return (
          <div key={seat.id} className="seat">
            <button
              title={`${seat.isReserved ? "reserved" : isSelected ? "selected" : "Available"} `}
              className={`${seat.isReserved ? "reserved" : ""} ${isSelected ? "selected" : ""}`}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.isReserved}
            >
              {seat.seatNumber}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default RowComponent;
