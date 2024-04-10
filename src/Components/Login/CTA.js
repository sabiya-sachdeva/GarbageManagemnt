import React from "react";
import { Link } from "react-router-dom";
import "./CTA.css";

function CTA() {
  return (
    <div className="cta-login-body">
      <div className="cta-form-container">
        <div className="cta-task-form" onSubmit={(e) => e.preventDefault()}>
          <>
            <Link to="/">
              <img
                src="SAlogodark.png"
                alt="Logo"
                width="100%"
                className="ToHomepage"
              />
            </Link>
            <div className="cta-login-container">
              <Link to="/register" className="cta-signup-btn">
                Sign up
              </Link>
            </div>
            <div className="cta-login-container">
              <Link to="/login" className="cta-login-btn">
                Log in
              </Link>
            </div>
            <p className="terms-text">
              By signing up you agree to our{" "}
              <Link className="link" to="/privacypolicy">
                {" "}Privacy Policy.
              </Link>
             
                
              
              
            </p>
          </>
        </div>
      </div>
    </div>
  );
}

export default CTA;
