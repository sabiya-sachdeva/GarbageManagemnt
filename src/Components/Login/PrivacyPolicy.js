import React from "react";
import "./PrivacyPolicy.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbar from "../Navbars/SecondNavbar";
import Footer from "../Footer/Footer";

function PrivacyPolicy() {
  return (
    <>
      <FirstNavbar />
      <SecondNavbar username="Waste/Collect Garbage" />
      <div className="privacypolicycont">
        <h1>Conditions Relating to your Use of ScrapAway</h1>
        <ul className="privacypolicyul">
          <li className="privacypolicyli">
            <strong>Your Account</strong>
            <p>
              If you use the website, you are responsible for maintaining the
              confidentiality of your account and password and for restricting
              access to your computer to prevent unauthorised access to your
              account. You agree to accept responsibility for all activities
              that occur under your account or password. You should take all
              necessary steps to ensure that the password is kept confidential
              and secure and should inform us immediately if you have any reason
              to believe that your password has become known to anyone else, or
              if the password is being, or is likely to be, used in an
              unauthorised manner. Please ensure that the details you provide us
              with are correct and complete and inform us immediately of any
              changes to the information that you provided when registering.
            </p>
          </li>

          <li className="privacypolicyli">
            <strong>Copyright, authors' rights and database rights</strong>
            <p>
              All content included on the website, such as text, graphics,
              logos, button icons, images, digital downloads, data compilations,
              and software, its affiliates or its content suppliers and is
              protected by Canada and international copyright, authors' rights
              and database right laws.
            </p>
          </li>
          <li className="privacypolicyli">
            <strong> What is Collected?</strong>
            <p>
              The Scrapaway collects personal information as described below:
              <br />
              The type of browser and operating system used to access this
              Website;
              <br />
              The date and time you access the Website; <br />
              The pages you visit on the Website; and If you are linked to
              scrapaway Website from another website, the address of that
              website.
            </p>
          </li>
          <li className="privacypolicyli">
            <strong>Links to Other Sites</strong>
            <p>
              {" "}
              The Scrapaway Website may contain links to other sites. The City
              is not responsible for the content and privacy practices of other
              websites and encourages you to examine the privacy policy and
              disclaimer of each site and make your own decisions regarding the
              disclosure of your personal information to that site.
            </p>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
