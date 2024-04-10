import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";

function Forgotpass() {
  const [credentials, setCredentials] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false); // State variable for update success message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!credentials.email.trim()) {
      errors.email = "**Email cannot be left blank";
    }

    if (!credentials.newPassword.trim()) {
      errors.newPassword = "**New password cannot be left blank";
    }

    if (credentials.newPassword !== credentials.confirmPassword) {
      errors.confirmPassword = "**Passwords do not match";
    }

    return errors; // Return the errors object
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // If there are validation errors, stop the form submission
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    try {
      const API_URL = "http://127.0.0.1:3005/forgotpass";
      const response = await axios.post(API_URL, credentials);

      // Handle response from the server if needed
      console.log(response.data);

      // Show update success message
      setUpdateSuccess(true);

      // Clear form fields
      setCredentials({
        email: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };


  const togglePasswordVisibility = (field) => {
    if (field === "newPassword") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="cta-login-body">
      <div className="cta-form-container">
        <form className="cta-task-form" onSubmit={handleFormSubmit}>
          <div className="login">
            <div className="loginForm">
              <Link to="/">
                <img
                  src="SAlogodark.png"
                  alt="Logo"
                  width="100%"
                  className="ToHomepage"
                />
              </Link>
             
              <div>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    placeholder="New Password"
                    name="newPassword"
                    value={credentials.newPassword}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                  <img
                    src={showPassword ? "eye-open.png" : "eye-close.png"}
                    alt=""
                    className="eyeimage"
                    // onClick={togglePasswordVisibility}
                    onClick={() => togglePasswordVisibility("newPassword")}
                  />
                  {errors.newPassword && (
                    <p className="error-message">{errors.newPassword}</p>
                  )}
                </div>
                <div className="password-container">
                  <input
                    type={showConfirmPassword  ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                   <img
                    src={showConfirmPassword  ? "eye-open.png" : "eye-close.png"}
                    alt=""
                    className="eyeimage"
                    // onClick={togglePasswordVisibility}
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div className="cta-login-container">
                <button type="submit" className="login-btn">
                  Update
                </button>
              </div>
              {updateSuccess && (
                <p className="success-message">Password updated successfully!</p>
              )}
              <p className="terms-text">
                Back to login?{" "}
                <Link to="/login" className="link">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgotpass;
