import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  const [hamActive, setHam] = useState(false);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <nav className="container nav">
      <div className="nav-left">
        <Link
          className="nav-logo-holder"
          to="/"
          onClick={(e) => setActivePage("/")}
        >
          <img src="/assets/fulllogo.png" alt="alt" className="logo" />
        </Link>
        <Link
          id="short-nav-logo"
          className="nav-logo-holder"
          to="/"
          onClick={(e) => setActivePage("/")}
        >
          <img src="/assets/short.svg" alt="alt" className="logo" />
        </Link>
        <div className={hamActive ? "nav-links nav-links-active" : "nav-links"}>
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
            to="/forum"
            onClick={(e) => setActivePage("/forum")}
            className={
              activePage === "/forum" ? "nav-link nav-link-active" : "nav-link"
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
        <Link
          to="/login"
          className={hamActive ? "login-btn login-btn-active" : "login-btn"}
        >
          Login
        </Link>
        <div
          className={hamActive ? "ham ham-active" : "ham"}
          onClick={() => setHam(!hamActive)}
        >
          <div className="line"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
