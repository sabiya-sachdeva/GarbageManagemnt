import { Link } from "react-router-dom";
import "./Navbar.css";

function FirstNavbar() {
  return (
    <>
      <nav className="nav1">
        <ul>
          <li>
            <Link to="/">
              <img src="SAlogo.png" alt="Logo" height="50px" />
            </Link>
          </li>
          <li>
            <Link to="/sorting">
              <img src="WSG.png" alt="WSG" height="50px" />
            </Link>
          </li>
          <li>
            <Link to="/collabs">
              <img src="SAC.png" alt="SAC" height="50px" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default FirstNavbar;
