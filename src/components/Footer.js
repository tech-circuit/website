import React from "react";
import "../footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaBehanceSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="foot">
      <div className="foot-left container">
        <h2>Join our mailing list for the latest updates</h2>
        <form className="foot-mail">
          <div className="input">
            <FaEnvelope />
            <input type="text" placeholder="Email Address" />
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
      <div className="foot-right container">
        <div className="links" style={{ marginRight: "20%" }}>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
            <li>
              <Link to="/discord">Discord</Link>
            </li>
          </ul>
        </div>
        <div className="links">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Guidelines</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom container">
        <p>&copy; 2021 techCircuit</p>
        <div className="socials">
          <a href="/">
            <FaLinkedin />
          </a>
          <a href="/">
            <FaGithub />
          </a>
          <a href="/">
            <FaInstagram />
          </a>
          <a href="/">
            <FaBehanceSquare />
          </a>
          <a href="/">
            <FaFacebookSquare />
          </a>
          <a href="/">
            <FaTwitterSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
