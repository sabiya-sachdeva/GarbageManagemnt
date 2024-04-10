import React from "react";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbar from "../Navbars/SecondNavbar";
import Footer from "../Footer/Footer";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div>
      <FirstNavbar />
      <SecondNavbar username="Waste/Collect Garbage" />
      <div className="aboutush1">
        <h1>AboutUs:</h1>
        <p>Welcome to ScrapAway Sell Scrap online</p>
        <div class="about-container">
        <p className="aboutimage">
          Welcome to our ScrapAway About Page. Here, we provide an overview of
          our project's mission, goals, and objectives, along with information
          about the team behind the initiative and our approach to waste
          management.
        </p>
        <img className="aboutimage" id="aboutimage" src="about.jpg" alt="" />
        </div>
        <h2>Mission:</h2>
        <p>
          Our mission is to create a sustainable environment by implementing
          effective waste management strategies. We aim to minimize waste
          generation, promote recycling and reuse, and educate communities about
          the importance of responsible waste disposal.
        </p>
        <h3>Goals:</h3>

        <ul>
          <li className="aboususli">
            Reduce Waste:
            <p>
              Implement measures to reduce the amount of waste generated in our
              communities through awareness campaigns, incentives for waste
              reduction, and sustainable practices.
            </p>
          </li>
          <li className="aboususli">
            Recycling and Reuse:
            <p>
              Encourage recycling and reuse of materials to minimize the amount
              of waste sent to landfills and incinerators. Establish recycling
              facilities and promote the use of recycled products.
            </p>
          </li>
          <li className="aboususli">
            Education and Awareness:
            <p>
              Educate individuals and communities about the environmental impact
              of waste and the importance of proper waste disposal. Provide
              resources and information to promote responsible waste management
              practices.
            </p>
          </li>
          <li className="aboususli">
            Innovation:
            <p>
              Explore innovative technologies and solutions for waste
              management, including waste-to-energy projects, composting, and
              sustainable packaging alternatives.
            </p>
          </li>
        </ul>
        <h2>Our Team:</h2>
        <p>
          Our team consists of dedicated professionals with expertise in
          environmental science, engineering, public policy, and community
          outreach. We are committed to working together to address the complex
          challenges of waste management and create a cleaner, healthier
          environment for future generations.
        </p>
        <h2>Approach:</h2>
        <p>
          Our approach to waste management is holistic and inclusive, taking
          into account the social, economic, and environmental dimensions of the
          problem. We believe in the power of collaboration and partnership,
          working closely with stakeholders at all levels to develop sustainable
          solutions that benefit everyone. Thank you for visiting our ScrapAway
          About Page. We invite you to join us in our mission to create a more
          sustainable future through responsible waste management practices.
          Together, we can make a difference.
        </p>
        
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
