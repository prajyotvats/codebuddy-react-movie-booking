import React from "react";
import "./TotalAmount.css";

const TotalAmountSubmit = ({ totalAmount, selectedSeats, resetData }) => {
  const bookingSeatData = selectedSeats.map((el) => {
    return el.id;
  });

  const handleSubmit = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before submitting.");
      return;
    }

    const seatIds = selectedSeats.map((seat) => seat.id);

    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seatIds }),
      });

      if (response.ok) {
        alert("Seats booked successfully!");
        resetData();
      } else {
        alert("Failed to book seats. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting seats:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="total-submit">
      <span>Total Amount: ${totalAmount}</span>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TotalAmountSubmit;
