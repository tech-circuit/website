import React from "react";
import { Link } from "react-router-dom";
import "../nav.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="nav-logo-holder" to="/">
          <img src="/assets/fulllogo.png" alt="" className="logo" />
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Work
          </Link>
          <Link to="/events" className="nav-link">
            Events
          </Link>
          <Link to="/forums" className="nav-link">
            Forums
          </Link>
          <Link to="/community" className="nav-link">
            Community
          </Link>
          <Link to="/resources" className="nav-link">
            Rsources
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/" className="disc-btn">
            Discord
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
