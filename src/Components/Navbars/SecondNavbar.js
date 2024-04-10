import { Link } from "react-router-dom";
import "./Navbar.css";

function SecondNavbar(props) {
  return (
    <div>
      <nav className="nav2">
        <ul>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/AboutUs">About</Link>
          </li>
          <li>
            <Link to="/ContactUs">Contact</Link>
          </li>
          <li>
            <Link to="/cta">{props.username}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SecondNavbar;
