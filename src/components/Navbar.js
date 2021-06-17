import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../nav.css";

const Navbar = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname)
  },[location])

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link
          className="nav-logo-holder"
          to="/"
          onClick={(e) => setActivePage("/")}
        >
          <img src="/assets/fulllogo.png" alt="alt" className="logo" />
        </Link>
        <div className="nav-links">
          <Link
            to="/work"
            onClick={(e) => setActivePage("/work")}
            className={
              activePage === "/work" ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Work
          </Link>
          <Link
            to="/events"
            onClick={(e) => setActivePage("/events")}
            className={
              activePage === "/events" ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Events
          </Link>
          <Link
            to="/forums"
            onClick={(e) => setActivePage("/forums")}
            className={
              activePage === "/forums" ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Forum
          </Link>
          <Link
            to="/community"
            onClick={(e) => setActivePage("/community")}
            className={
              activePage === "/community"
                ? "nav-link nav-link-active"
                : "nav-link"
            }
          >
            Community
          </Link>
          <Link
            to="/resources"
            onClick={(e) => setActivePage("/resources")}
            className={
              activePage === "/resources"
                ? "nav-link nav-link-active"
                : "nav-link"
            }
          >
            Resources
          </Link>
          <Link
            to="/about"
            onClick={(e) => setActivePage("/about")}
            className={
              activePage === "/about" ? "nav-link nav-link-active" : "nav-link"
            }
          >
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
