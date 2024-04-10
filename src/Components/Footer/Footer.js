import "./footer.css";
function Footer() {
  return (
    <>
      <hr className="divider-line" />
      <footer className="footer">
        <div className="footer-content">
          <img src="SAlogodark.png" alt="Logo" width="60%"></img>
          <p>
            Simplifying waste disposal with convenient door-to-door <br />
            collection. Book pickups effortlessly through our user-friendly
            <br />
            platform. Join us in preserving the environment!
          </p>
          <div></div>
          <h3 style={{ marginTop: "35px" }}>Follow Us</h3>
          <img
            src="facebook.png"
            alt="Facebook"
            width="20px"
            className="socials"
          ></img>
          <img
            src="instagram.png"
            alt="Instagram"
            width="20px"
            className="socials"
          ></img>
          <img
            src="twitter.png"
            alt="Twitter"
            width="20px"
            className="socials"
          ></img>
        </div>
        <div className="footer-content">
          <div className="footflex">
            <div className="links">
              <h3>Quick links</h3>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/AboutUs">About</a>
                </li>
                <li>
                  <a href="/ContactUs">Contact</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/cta">Login</a>
                </li>
              </ul>
            </div>
            <div className="links">
              <h3>Get In Touch</h3>
              <ul>
                <li>
                  <img src="email.png" alt="Logo" width="15px" />
                  <a href="/" style={{ marginLeft: "10px" }}>
                    info@scrapaway.com
                  </a>
                </li>
                <li>
                  <img src="call.png" alt="Call" width="15px" />
                  <a href="/" style={{ marginLeft: "10px" }}>
                    +1 (866) 265-8542
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="cc">
        <p>© Designed by Laiba & Sabiya</p>
      </div>
    </>
  );
}

export default Footer;
