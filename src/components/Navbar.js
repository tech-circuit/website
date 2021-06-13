import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../nav.css";

const Navbar = () => {
  const [activePage, setActivePage] = useState("Work");

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="nav-logo-holder" to="/">
          <img src="/assets/fulllogo.png" alt="" className="logo" />
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            onClick={(e) => setActivePage(e.target.textContent)}
            className={
              activePage === "Work" ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Work
          </Link>
          <Link
            to="/events"
            onClick={(e) => setActivePage(e.target.textContent)}
            className={
              activePage === "Events" ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Events
          </Link>
          <Link
            to="/forums"
            onClick={(e) => setActivePage(e.target.textContent)}
            className={
              activePage === "Forums" ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Forums
          </Link>
          <Link
            to="/community"
            onClick={(e) => setActivePage(e.target.textContent)}
            className={
              activePage === "Community"
                ? "nav-link nav-link-active"
                : "nav-link"
            }
          >
            Community
          </Link>
          <Link
            to="/resources"
            onClick={(e) => setActivePage(e.target.textContent)}
            className={
              activePage === "Resources"
                ? "nav-link nav-link-active"
                : "nav-link"
            }
          >
            Resources
          </Link>
          <Link
            to="/about"
            onClick={(e) => setActivePage(e.target.textContent)}
            className={
              activePage === "About" ? "nav-link nav-link-active" : "nav-link"
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
