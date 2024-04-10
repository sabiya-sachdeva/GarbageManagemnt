import React from "react";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbar from "../Navbars/SecondNavbar";
import Footer from "../Footer/Footer";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div>
      <FirstNavbar />
      <SecondNavbar username="Waste/Collect Garbage" />
      <br/>
      <h1>ContactUs</h1>
      <br />
      Feel Free to Contact Us!
      <div className="profile-container">
        <div className="profile-card">
          <h3>Contact information</h3>
          <br />
          
          Submit the form, and our team will reply <br />
          within 24 hours. We appreciate your interest <br></br>
          and look forward to assist you promptly.
          <br />
          <br />
          <div className="contactlinks">
            <ul>
              <li>
                <img src="email.png" alt="Logo" width="20px" />
                &ensp; info@scrapaway.com
              </li>
              <br />
              <li>
                <img src="call.png" alt="Call" width="20px" />
                &ensp; 1(866)265-8542
              </li>
            </ul>

            <br />
            <br />
          </div>
          <div className="profile-details-section"></div>
        </div>
        <div className="profile-form">
          <form className="edit-profile">
            <p className="update-label">Contact Details</p>
            <hr className="horizontal-line" />
            <div className="form-section">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="Name"
                type="text"
                // value={tempProfile.firstName}
                // onChange={handleProfileChange}
              />
            </div>

            <div className="form-section">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                // value={tempProfile.email}
                // onChange={handleProfileChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="contactno">Contact No</label>
              <input
                id="email"
                name="Contact No"
                type="email"
                // value={tempProfile.email}
                // onChange={handleProfileChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="message">Message</label>
              <input
                id="email"
                name="message"
                type="email"
                // value={tempProfile.email}
                // onChange={handleProfileChange}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="save-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
