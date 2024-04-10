import React, { useState, useEffect } from "react";
import "./Wastetype.css";

function WasteType() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("http://127.0.0.1:3005/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch data1 when the component mounts
    fetch("http://127.0.0.1:3005/api/data1")
      .then((response) => response.json())
      .then((data1) => setData1(data1))
      .catch((error) => console.error("Error fetching data1:", error));
  }, []);

  return (
    <div className="cor2">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner cor-carousel">
          <div className="carousel-item active">
            <div className="card-group">
              {data.map((item) => (
                <div
                  className="card"
                  key={item.id}
                  style={{
                    margin: "20px",
                    border: "2px solid black",
                    borderRadius: "17px",
                  }}
                >
                  <img
                    src={item.image}
                    className="d-block w-100"
                    alt="..."
                    width="100%"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">${item.rate}/lb</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-item">
            <div className="card-group">
              {data1.map((item1) => (
                <div
                  className="card"
                  key={item1.id}
                  style={{
                    margin: "20px",
                    height:"307px",
                    border: "2px solid black",
                    borderRadius: "17px",
                  }}
                >
                  <img
                    src={item1.image}
                    className="d-block w-100"
                    alt="..."
                    width="100%"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item1.name}</h5>
                    <p className="card-text">${item1.rate}/lb</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          style={{
            backgroundColor: "whitesmoke",
            color: "blue",
          }}
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default WasteType;
