import React, { useState } from "react";
import "../styles/footer.css";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaBehanceSquare,
    FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import BASE_API_URL from "../constants";

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
        if (
            !mailingListEmail.includes("@") ||
            !mailingListEmail.includes(".")
        ) {
            emailValid = false;
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
            fetch(`${BASE_API_URL}/ml/subscribe`, {
                method: "POST",
                body: JSON.stringify({
                    email: mailingListEmail,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => {
                    // console.log(response.success);
                    setMailingListEmail("");
                    notyf.open({
                        type: "success",
                        message: "Joined successfully!",
                    });
                })
                .catch((error) => console.log(error));
        }
    };

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
                            onChange={(event) =>
                                editMailingListEmail(event.target.value)
                            }
                        />
                    </div>
                    <button
                        className="btn"
                        onClick={() => mailingListFormSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div className="foot-right container">
                <div className="links">
                    <h3>Explore</h3>
                    <ul>
                        <li>
                            <Link to="/work">Work</Link>
                        </li>
                        <li>
                            <Link to="/events">Events</Link>
                        </li>
                        <li>
                            <Link to="/community">Community</Link>
                        </li>
                        <li>
                            <Link to="/resources">Resources</Link>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <h3>Useful Links</h3>
                    <ul>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        {/* <li>
                            <Link to="/">Contact Us</Link>
                        </li> */}
                        <li>
                            <a
                                href="https://dsc.gg/techcircuit"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Discord
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="foot-bottom container">
                <p className="footCopy">
                    &copy; {new Date().getFullYear()} techCircuit
                </p>
                <div>
                    <a href="mailto:contact@techcircuit.co">
                        <p className="footEmail">contact@techcircuit.co</p>
                    </a>
                    <div className="socials">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="http://linkedin.com/company/tech-circuit/"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="http://github.com/tech-circuit"
                        >
                            <FaGithub />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/techcircuit.co/"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.behance.net/techCircuit"
                        >
                            <FaBehanceSquare />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://twitter.com/techCircuit_"
                        >
                            <FaTwitterSquare />
                        </a>
                    </div>
                </div>
            </div>

            <div className=""></div>
        </footer>
    );
};

export default Footer;
