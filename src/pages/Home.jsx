// import { Icon } from "@iconify/react";
// import { Link } from "react-router-dom";

import { useState } from "react";
import "./Home.css";
import RowComponent from "../components/RowComponent";
import StatusButtons from "../components/StatusButtons";
import TotalAmountSubmit from "../components/TotalAmount";

const Home = () => {
  const [noOfRows, setNoOfRows] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [seatData, setSeatData] = useState([]);

  const url = `https://codebuddy.review/seats?count=${noOfRows}`;

  function fetchSeats() {
    if (noOfRows >= 3 && noOfRows <= 10) {
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => {
          setSeatData([...resp.data]);
        });
    } else {
      alert("Please enter no of rows between 3 & 10");
    }
    setTotalCost(0);
    setSelectedSeats([]);
  }

  const handleRowCountChange = (e) => {
    const { value } = e.target;
    setNoOfRows(value);
  };

  const handleSeatSelection = (selectedSeats) => {
    let total = 0;
    selectedSeats.forEach((seat) => {
      total += (seat.row + 1) * 10;
    });
    setTotalCost(total);
  };

  const updateSelectedSeats = (data) => {
    setSelectedSeats(data);
    handleSeatSelection(data);
  };

  const resetData = () => {
    setNoOfRows(3);
    setTotalCost(0);
    setSelectedSeats([]);
    setSeatData([]);
  };

  return (
    <div className="inner-container rounded-lg bg-slate-500 p-7 text-gray-900 shadow-lg">
      <div className="row-input-box">
        <div className="row-input-container">
          <div className="row-input-box">
            <label className="label" htmlFor="rowCount">
              Enter Rows:
            </label>
            {/* <div> */}
            <input
              type="number"
              id="rowCount"
              min="3"
              max="10"
              value={noOfRows}
              onChange={handleRowCountChange}
            />
            {/* </div> */}
          </div>
          <div className="fetch-btn">
            <button type="submit" onClick={fetchSeats}>
              Fetch Seats
            </button>
          </div>
        </div>
      </div>
      {/* Seat Selection */}
      <div className="container">
        <div className="seat-container-main">
          <div className="inverted-pyramid">
            {seatData.length > 0 &&
              seatData?.map((rowData) => {
                return (
                  <RowComponent
                    key={rowData.id}
                    rowData={rowData}
                    onSeatSelection={handleSeatSelection}
                    setSelectedSeats={updateSelectedSeats}
                    selectedSeats={selectedSeats}
                  />
                );
              })}
          </div>
        </div>
        <div className="screen"></div>
        <div className="screen-direction">
          <h2>All eyes this way please!</h2>
        </div>
        <StatusButtons />
        <TotalAmountSubmit
          totalAmount={totalCost}
          selectedSeats={selectedSeats}
          resetData={resetData}
        />
      </div>
      {/* Total Cost Display */}
    </div>
  );
};

export default Home;
