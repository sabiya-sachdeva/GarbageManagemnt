import "./Hiworks.css";
function HowItWorks() {
  return (
    <>
      <h1 className="hiwtitle">How It Works</h1>
      <div className="WorkSteps">
        <div className="step">
          <img src="date.png" alt="Book" width="60%"></img>
          <h3>Schedule a pickup</h3>
          <p>
            Book through <strong>ScrapAway</strong> <br />
            for hassle-free scheduling!
          </p>
        </div>
        <div className="step">
          <img src="truck.png" alt="Book" width="60%"></img>
          <h3>Pickup from your Doorstep</h3>
          <p>
            Once your request is confirmed, <br />
            Someone will pick up your garbage soon. <br />
            <strong>Sit back and relax! </strong>
          </p>
        </div>
        <div className="step">
          <img src="ok.png" alt="Book" width="60%"></img>
          <h3>Get Paid</h3>
          <p>
            Choose from <strong>Multiple Payment</strong> options <br />
            for a seamless & flexible experience!
          </p>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
