import React, { useState } from "react";
import "../footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaBehanceSquare,
  FaFacebookSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 2500,
  position: {
    x: "left",
    y: "bottom",
  },
  types: [
    {
      type: "error",
      background: "#FF6B6B",
      dismissible: true,
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "cancel",
        color: "#ffffff",
      },
    },
    {
      type: "success",
      background: "#85D49C",
      dismissible: true,
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "check_circle",
        color: "#ffffff",
      },
    },
  ],
});

const Footer = () => {
  const [mailingListEmail, setMailingListEmail] = useState("");

  const editMailingListEmail = (val) => {
    setMailingListEmail(val);
  };

  const mailingListFormSubmit = () => {
    let emailValid = true;
    if (!mailingListEmail.includes("@") || !mailingListEmail.includes(".")) {
      emailValid = false
    }
    mailingListEmail
      .trim()
      .split("@")
      .forEach((p) => {
        if (p.trim().length === 0) {
          emailValid = false;
        }
      });
    if (mailingListEmail.trim().length === 0 || emailValid === false) {
      notyf.open({
        type: "error",
        message: "Please enter a valid email.",
      });
    } else {
      fetch('https://techcircuit.herokuapp.com/ml/subscribe', {
        method: "POST",
        body: JSON.stringify({
          email: mailingListEmail,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
      console.log(response.success)
      setMailingListEmail("");
      notyf.open({
        type: "success",
        message: "Joined successfully!",
      });
    })
    .catch(error => console.log(error));
    }
  }

  return (
    <footer className="foot">
      <div className="foot-left container">
        <h2>Join our mailing list for the latest updates</h2>
        <div className="foot-mail">
          <div className="input">
            <img src="/assets/mail.svg" alt="alt" />
            <input 
              type="text" 
              placeholder="Email Address" 
              value={mailingListEmail}
              onChange={(event) => editMailingListEmail(event.target.value)}
            />
          </div>
          <button className="btn" onClick={() => mailingListFormSubmit()}>
            Submit
          </button>
        </div>
      </div>
      <div className="foot-right container">
        <div className="links">
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
        <p className="footCopy">&copy; 2021 techCircuit</p>
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

      <div className=""></div>
    </footer>
  );
};

export default Footer;
