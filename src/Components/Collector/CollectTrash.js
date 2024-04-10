import React, { useEffect, useState } from "react";
import "./CollectTrash.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useWaste } from "../Contexts/WasteContext";
import axios from "axios";

function CollectTrash() {
  const [wasteDetails, setWasteDetails] = useState(null);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedWasteId } = useWaste();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFirstName(user.firstName);
      if (selectedWasteId) {
        fetchWasteDetails(selectedWasteId);
      }
    }
  }, [user, navigate, selectedWasteId]);

  const fetchWasteDetails = (id) => {
    fetch(`http://127.0.0.1:3005/wastedetails/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => setWasteDetails(data))
      .catch((error) => console.error("Error fetching waste details:", error));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const collectorName = formData.get("collectorName");
    const collectorEmail = formData.get("collectorEmail");
    const collectorContact = formData.get("collectorContact");

    try {
      await axios.put(
        `http://127.0.0.1:3005/waste/${selectedWasteId}/confirm`,
        {
          collectorName,
          collectorEmail,
          collectorContact,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!wasteDetails) {
    return <div>Loading waste details...</div>;
  }

  return (
    <div>
      {user && (
        <>
          <FirstNavbar />
          <SecondNavbardropdown username={firstName} />
          {!isSubmitted ? (
            <div className="waste-details-content">
              <div className="waste-details-card">
                <h5>
                  <strong>Disposed by: </strong> {wasteDetails.userfullname}
                </h5>
                <img
                  src={`http://127.0.0.1:3005/${wasteDetails.imagePath}`}
                  alt="Waste"
                  className="waste-image"
                />
                <div className="waste-description">
                  <div className="typeTag">
                    {wasteDetails.wasteDetails.map((item, index) => (
                      <li key={index}>
                        <strong>Type:</strong> {item.type},{"  "}
                        <strong>Price: </strong>${item.price},{"  "}
                        <strong>Weight:</strong> {item.weight} lbs
                      </li>
                    ))}
                  </div>
                  <p>
                    <strong>Pick Up Details</strong>
                  </p>
                  <p>
                    <strong>Date: </strong>{" "}
                    {new Date(wasteDetails.pickupdate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time: </strong>{" "}
                    {new Date(wasteDetails.pickupdate).toLocaleTimeString()}
                  </p>
                  <p>
                    <strong>Location: </strong> {wasteDetails.address}
                  </p>
                  <p>
                    <strong>Contact No: </strong> {wasteDetails.contactno}
                  </p>
                  <p>
                    <strong>Email: </strong> {wasteDetails.useremail}
                  </p>
                  <p>
                    <strong>Postal Code: </strong> {wasteDetails.pincode}
                  </p>
                </div>
              </div>

              <div className="collector-form">
                <form onSubmit={handleFormSubmit}>
                  <p className="colform-label">
                    Fill out the details to collect this waste.
                  </p>
                  <hr className="horizontal-line" />
                  <div className="form-section">
                    <label htmlFor="collectorName">Name: </label>
                    <input
                      type="text"
                      id="collectorName"
                      name="collectorName"
                      required
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="collectorEmail">Email: </label>
                    <input
                      type="email"
                      id="collectorEmail"
                      name="collectorEmail"
                      required
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="collectorContact">Contact No: </label>
                    <input
                      id="contact"
                      name="collectorContact"
                      type="number"
                      required
                    />
                  </div>
                  <div className="button-container">
                    <input
                      type="submit"
                      value="Confirm Collection"
                      className="save-button"
                    />
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="confirmation-message">
              <img src="confirmation.gif" alt="Logo" height="300px" />
              <br />
              <h2>Confirmed</h2>
              <h5 className="trashdetailsh5">Your Pickup is scheduled for</h5>
              <p>
                <strong>
                  {new Date(wasteDetails.pickupdate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}{" "}
                </strong>
                at{" "}
                <strong>
                  {new Date(wasteDetails.pickupdate).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </strong>
              </p>
            </div>
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default CollectTrash;
