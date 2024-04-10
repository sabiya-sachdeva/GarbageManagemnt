import React from "react";
import "./Wastesorting.css";
import "../Navbars/Navbar.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbar from "../Navbars/SecondNavbar";
import Footer from "../Footer/Footer";
function WasteSorting() {
  return (
    <>
      <FirstNavbar />
      <SecondNavbar />
      <div className="waste">
        <div className="wastesorting">
          <img src="bluebin.jpg" alt="Waste bin" />
        </div>
        <div className="wastesorting">
          <h2>Recycling Bin</h2>
          <br />
          <h6>Paper Products:</h6>
          <p> Newspapers, magazines, cardboard, and office paper.</p>

          <h6>Plastic Containers:</h6>
          <p>Empty plastic bottles, containers, and packaging.</p>
          <h6>Metal Cans:</h6>
          <p>Aluminum and steel cans are given a new life through recycling.</p>
          <h6>Glass Bottles and Jars:</h6>
          <p> Ensure to rinse them before tossing them into the bin.</p>
        </div>
      </div>

      <div className="waste">
        <div className="wastesorting">
          <h2>Non Recycling Bin</h2>
          <br />
          <h6> Non-Recyclable Items:</h6>
          <p> plastics, styrofoam, and other non-recyclable packaging.</p>

          <h6>General Waste Disposal:</h6>
          <p>Tissues, certain plastics, and other non-recyclable packaging.</p>
          <h6>Household items:</h6>
          <p>Broken glassware,toys,Garden hoses</p>
        </div>
        <div className="wastesorting" id="secondimage">
          <img src="black.jpg" alt="Waste bin" />
        </div>
      </div>

      <div className="waste">
        <div className="wastesorting" id="green">
          <img src="green.jpg" alt="Waste bin" y />
        </div>
        <div className="wastesorting">
          <h2>Compost Bin</h2>
          <br />
          <h6>Organic Waste:</h6>
          <p>
            From kitchen scraps to yard waste, this bin is designed to turn your
            organic materials into nutrient-rich compost.
          </p>

          <h6>Yard Waste:</h6>
          <p>
            Trimmed branches, leaves, and other yard waste find a second life in
            the green bin.
          </p>
          <h6>Cooking Waste:</h6>
          <p>
            Food waste (small amount of cooking oil, tea bags, and coffee
            grounds)
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WasteSorting;
