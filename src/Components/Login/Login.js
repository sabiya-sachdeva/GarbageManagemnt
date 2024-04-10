import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure correct import
import { useAuth } from "../Contexts/AuthContext";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = "*Email is required.";
      formIsValid = false;
    }

    if (!credentials.password.trim()) {
      newErrors.password = "*Password is required.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const API_URL = "http://127.0.0.1:3005/login";
      const response = await axios.post(API_URL, credentials);

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors({ form: "*Invalid email or password." });
      } else {
        setErrors({ form: "*An unexpected error occurred. Please try again." });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <input
                type="text"
                id="email"
                placeholder="Enter Your Email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                autoComplete="email"
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  required
                />
                <img
                  src={showPassword ? "eye-open.png" : "eye-close.png"}
                  alt="showpassword"
                  className="eyeimage"
                  onClick={togglePasswordVisibility}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>
              {errors.form && <p className="error-message">{errors.form}</p>}

              <p className="terms-text">
                Forgot your{" "}
                <Link to="/forgotpass" className="link">
                  password?
                </Link>
              </p>
              <button type="submit" className="login-btn">
                Login
              </button>
              <p className="terms-text">
                New to ScrapAway?{" "}
                <Link to="/register" className="link">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
