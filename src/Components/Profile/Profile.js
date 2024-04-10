import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";

// $2b$10$3SouIyqdgvtUvv2vBuoWQuADXLwPMWla/w4KeqVPqYekqlZNtU2Zm
// $2b$10$/d9pucXIXqI7ruRLsvwP1O62xiY78oI9dURHJUHXFY6Pkj1gSGdYe
// $2b$10$wqPi4Y2imHOiG4EG7QN/GOmkzEI3wbvcGFIZ61r53OCK2X0qyi7.K

function Profile() {
  const [tempProfile, setTempProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileimg: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // const [image,setImage]=useState("");

  const [profileFeedback, setProfileFeedback] = useState([]);
  const [passwordFeedback, setPasswordFeedback] = useState([]);

  const addProfileFeedback = (message, isError = false) => {
    setProfileFeedback([{ message, isError }]);
  };

  const addPasswordFeedback = (message, isError = false) => {
    setPasswordFeedback([{ message, isError }]);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        console.error("No user token found in local storage.");
        addProfileFeedback("User not authenticated.", true);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:3005/userdetails", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const { firstName, lastName, email, profileimg } = response.data;
        setProfile({ firstName, lastName, email, profileimg });
        setTempProfile({ firstName, lastName, email, profileimg });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        addProfileFeedback("Failed to fetch profile data.", true);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    // setImage('')
    if (file) {
      uploadImage(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    addProfileFeedback([]);
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      console.error("No user token found in local storage.");
      addProfileFeedback("User not authenticated.", true);
      return;
    }
    try {
      const response = await axios.put(
        "http://127.0.0.1:3005/updateProfile",
        tempProfile,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setProfile(tempProfile);
        addProfileFeedback("Profile updated successfully.", false);
      } else {
        addProfileFeedback("Failed to update profile.", true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      addProfileFeedback("Failed to update profile.", true);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    addPasswordFeedback([]);
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      console.error("No user token found in local storage.");
      addPasswordFeedback("User not authenticated.", true);
      return;
    }

    try {
      const { currentPassword, newPassword } = passwords;
      const response = await axios.put(
        "http://127.0.0.1:3005/updatePassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        // Optionally reset password fields here if desired
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        addPasswordFeedback("Password updated successfully.", false);
      } else {
        addPasswordFeedback("Failed to update password.", true);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      addPasswordFeedback("Failed to update password.", true);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", tempProfile.email); 
    // formData.append("profileImage", file);
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      console.error("No user token found in local storage.");
      addProfileFeedback("User not authenticated.", true);
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:3005/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`, // Corrected placement of headers
          },
          // headers: {
          //   "Content-Type": "multipart/form-data",
          //   headers: {
          //     Authorization: `Bearer ${userToken}`,
          //   },
        
        }
      );
      // Assuming the response includes the new image path
      if (response.data.newImagePath) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profileimg: response.data.newImagePath,
        }));
        addProfileFeedback("Image updated successfully.", false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      addProfileFeedback("Failed to upload image.", true);
    }
  };

  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username={`${profile.firstName}`} />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-pic-section">
            <img
              src={profile.profileimg || "/user.png"}
              alt="Profile-Pic"
              className="profile-pic"
            />
            <input
              type="file"
              id="profilePicUpload"
              style={{ display: "none" }}
              onChange={handleImageChange}
              // accept="image/png, image/jpeg"
            />
            <label htmlFor="profilePicUpload" className="profile-overlay">
              <div className="camera-icon">
                <img src="camera-icon.png" alt="cam-icon" width="70px" />
              </div>
            </label>
          </div>
          <div className="profile-details-section">
            <div className="username">{`${profile.firstName} ${profile.lastName}`}</div>
            <div className="email">{`${profile.email}`}</div>
          </div>
        </div>
        <div className="profile-form">
          <form onSubmit={handleProfileUpdate} className="edit-profile">
            <p className="update-label">Update Profile Details</p>
            <hr className="horizontal-line" />
            <div className="form-section">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={tempProfile.firstName}
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={tempProfile.lastName}
                onChange={handleProfileChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={tempProfile.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
            {profileFeedback.map((fb, index) => (
              <div
                key={index}
                className={`feedback-message ${
                  fb.isError ? "error" : "success"
                }`}
              >
                {fb.message}
              </div>
            ))}
          </form>
          <form onSubmit={handlePasswordUpdate} className="change-password">
            <p className="update-label">Change Password</p>
            <hr className="horizontal-line" />
            <div className="form-section">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="off"
                value={tempProfile.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="off"
                value={tempProfile.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="off"
                value={tempProfile.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
            {passwordFeedback.map((fb, index) => (
              <div
                key={index}
                className={`feedback-message ${
                  fb.isError ? "error" : "success"
                }`}
              >
                {fb.message}
              </div>
            ))}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
