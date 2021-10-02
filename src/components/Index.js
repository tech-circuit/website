import { useState, useEffect } from "react";
import "../styles/index.css";
import { Link } from "react-router-dom";
import { FaChevronDown, FaCommentAlt, FaCheck } from "react-icons/fa";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
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

const Index = () => {
    const [modalView, setModalView] = useState(true);
    const [sendButton, setSendButton] = useState(true);
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");

    const modalStateChange = (bool) => {
        setModalView(bool);
    };

    const editContactEmail = (val) => {
        setContactEmail(val);
    };

    const editContactMessage = (val) => {
        setContactMessage(val);
    };

    const contactFormSubmit = () => {
        let emailValid = true;
        if (!contactEmail.includes("@") || !contactEmail.includes(".")) {
            emailValid = false;
        }
        contactEmail
            .trim()
            .split("@")
            .forEach((p) => {
                if (p.trim().length === 0) {
                    emailValid = false;
                }
            });
        if (contactEmail.trim().length === 0 || emailValid === false) {
            notyf.open({
                type: "error",
                message: "Please enter a valid email.",
            });
        } else if (contactMessage.trim().length === 0) {
            notyf.open({
                type: "error",
                message: "Please enter a message.",
            });
        } else {
            let formData = new FormData();
            formData.append("email", contactEmail);
            formData.append("message", contactMessage);
            fetch(`https://formspree.io/f/mdoyzyob`, {
                method: "POST",
                body: formData,
            });
            setContactMessage("");
            setContactEmail("");
            setSendButton(false);
            notyf.open({
                type: "success",
                message: "Message sent!",
            });
            setTimeout(() => setSendButton(true), 1000);
            setTimeout(() => modalStateChange(false), 500);
        }
    };

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 600,
            delay: 100,
        });
        AOS.refresh();
        document.getElementsByTagName("html")[0].style.scrollBehavior =
            "smooth";

        // Typing
        const title = document.querySelector("#title");
        const cursor = document.querySelector(".cursor");

        const textArray = [
            "everything",
            "coding",
            "designing",
            "hacking",
            "networking",
            "vibing",
        ];
        const typingDelay = 80;
        const eraseDelay = 30;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 10;

        let type = () => {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursor.classList.contains("cursorActive"))
                    cursor.classList.add("cursorActive");
                title.textContent +=
                    textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursor.classList.remove("cursorActive");
                setTimeout(erase, newTextDelay);
            }

            console.log(charIndex);
        };

        let erase = () => {
            if (charIndex > 0) {
                if (!cursor.classList.contains("cursorActive"))
                    cursor.classList.add("cursorActive");
                title.textContent = textArray[textArrayIndex].substring(
                    0,
                    charIndex - 1
                );
                charIndex--;
                setTimeout(erase, eraseDelay);
            } else {
                cursor.classList.remove("cursorActive");
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) {
                    textArrayIndex = 0;
                }
                setTimeout(type, typingDelay + 1100);
            }
        };

        if (textArray.length) setTimeout(erase, 3000);

        window.addEventListener("scroll", () => {
            let scrollTop =
                window.pageYOffset ||
                (
                    document.documentElement ||
                    document.body.parentNode ||
                    document.body
                ).scrollTop;

            if (window.innerWidth < 600) {
                if (scrollTop >= 4400) {
                    if (document.querySelector(".msg")) {
                        document.querySelector(".msg").style.opacity = "0";
                    }
                } else {
                    if (document.querySelector(".msg")) {
                        document.querySelector(".msg").style.opacity = "1";
                    }
                }
            } else if (window.innerWidth < 800) {
                if (scrollTop >= 3400) {
                    if (document.querySelector(".msg")) {
                        document.querySelector(".msg").style.opacity = "0";
                    }
                } else {
                    if (document.querySelector(".msg")) {
                        document.querySelector(".msg").style.opacity = "1";
                    }
                }
            }
        });
    }, []);

    return (
        <main style={{ position: "relative" }}>
            <div
                className="msg"
                onClick={() =>
                    modalView === true
                        ? modalStateChange(false)
                        : modalStateChange(true)
                }
            >
                <FaChevronDown
                    className="backIcon"
                    style={
                        modalView === true
                            ? {
                                  transform:
                                      "scale(0.5) rotate(45deg) translateX(50%)",
                                  opacity: "0",
                              }
                            : {
                                  transform:
                                      "scale(1) rotate(0deg) translateX(50%)",
                                  opacity: "1",
                              }
                    }
                />
                <FaCommentAlt
                    style={
                        modalView === true
                            ? {
                                  transform:
                                      "scale(1) rotate(0deg) translateX(-50%)",
                                  opacity: "1",
                              }
                            : {
                                  transform:
                                      "scale(0.5) rotate(-45deg) translateX(-50%)",
                                  opacity: "0",
                              }
                    }
                    className="commentIcon"
                />
            </div>
            <div
                style={
                    modalView === true
                        ? {
                              transform: "scale(0.5)",
                              opacity: "0",
                              pointerEvents: "none",
                          }
                        : {
                              transform: "scale(1)",
                              opacity: "1",
                              pointerEvents: "all",
                          }
                }
                className="contact-card"
            >
                <h1>Leave us a message!</h1>
                <div className="input">
                    <img src="/assets/mail.svg" id="c-im" alt="alt" />
                    <input
                        type="text"
                        placeholder="Email Address"
                        value={contactEmail}
                        onChange={(event) =>
                            editContactEmail(event.target.value)
                        }
                    />
                </div>
                <textarea
                    className="message"
                    placeholder="Type your message here!"
                    value={contactMessage}
                    onChange={(event) => editContactMessage(event.target.value)}
                ></textarea>
                {sendButton === true ? (
                    <Link
                        to="/"
                        className="contact-btn"
                        onClick={() => contactFormSubmit()}
                    >
                        Send
                    </Link>
                ) : (
                    <Link to="/" className="contact-btn green-btn">
                        <FaCheck />
                    </Link>
                )}
            </div>
            <section className="hero">
                <div className="hero-left">
                    <div className="container">
                        <h1>
                            The place where
                            <br />
                            <span id="title">everything</span>
                            <div id="cursor" className="cursor"></div>
                            &nbsp;takes place.
                        </h1>
                        <p data-aos="fade-right" data-aos-delay="200">
                            Be it meeting talented people from the tech
                            industry, Looking at amazing projects created by
                            professionals, connecting with new people,
                            participating in events, or even organizing your own
                            -- techCircuit is the place to be.
                        </p>
                        <Link
                            data-aos="fade-up"
                            data-aos-delay="300"
                            to="/"
                            className="hero-btn"
                        >
                            Join us Now&nbsp;&nbsp;
                            <img src="/assets/Right_Arrow.svg" alt="" />
                        </Link>
                        <div className="scroll-more-hold">
                            <a href="#abt" className="scroll-more">
                                Scroll to know more
                            </a>
                            <FaChevronDown />
                        </div>
                    </div>
                </div>
                <div className="hero-right">
                    <img src="/assets/hero.svg" alt="Hero Banner" />
                </div>
            </section>

            <section id="abt" className="about">
                <div className="abt-left">
                    <div className="container">
                        <h1 data-aos="fade-right">
                            What is <strong>techCircuit?</strong>
                        </h1>
                        <p data-aos="fade-right" data-aos-delay="300">
                            In simple words, techCircuit is a hub for tech
                            enthusiasts around the world. The platform allows
                            users to surf through a plethora of projects,
                            ranging from code to design, built by experts in
                            their respective fields. techCircuit allows users to
                            also browse through events and meetups being
                            organized, and sign up for the same really easily.
                            <br />
                            <br />
                            Organizations or individuals can also post events of
                            their own, and get traction instantly.
                        </p>
                        <img src="/assets/abt.svg" alt="About Banner" />
                        <p className="illuBy">
                            Illustrations by{" "}
                            <a
                                href="https://linktr.ee/tiyabosht"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Paridhi Bisht
                            </a>
                        </p>
                    </div>
                </div>
                <div className="abt-right">
                    <div className="circ-hold">
                        <div id="circ-1" className="circ">
                            <img src="/assets/circ-1.svg" alt="circ" />
                        </div>
                        <div id="circ-2" className="circ">
                            <img src="/assets/circ-2.svg" alt="circ" />
                        </div>
                        <div id="circ-3" className="circ">
                            <img src="/assets/circ-3.svg" alt="circ" />
                        </div>
                        <div id="circ-4" className="circ">
                            <img src="/assets/circ-4.svg" alt="circ" />
                        </div>
                        <div id="circ-5" className="circ">
                            <img src="/assets/circ-5.svg" alt="circ" />
                        </div>
                        <div id="circ-6" className="circ">
                            <img src="/assets/circ-6.svg" alt="circ" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="feats">
                {/* <div className="clubs container">
                    <div className="club-left">
                        <h2 data-aos="fade-right">
                            Home to the most influential
                            <br />
                            tech clubs from all over India.
                        </h2>
                        <p data-aos="fade-right" data-aos-delay="400">
                            The biggest names in the Indian Tech Circuit,
                            including Exun, CW, TS and more have tested and
                            approved of the features that techCircuit offers.
                        </p>
                        <Link data-aos="fade-right" to="/" className="club-btn">
                            View Clubs&nbsp;&nbsp;
                            <img src="/assets/Right_Arrow.svg" alt="" />
                        </Link>
                    </div>
                    <div className="club-right">
                        <div className="club-logos">
                            <img
                                data-aos="zoom-in"
                                src="/assets/exun.svg"
                                alt="alt"
                                className="club-logo"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="200"
                                src="/assets/exun.svg"
                                alt="alt"
                                className="club-logo"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="300"
                                src="/assets/exun.svg"
                                alt="alt"
                                className="club-logo"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="400"
                                src="/assets/exun.svg"
                                alt="alt"
                                className="club-logo"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="500"
                                src="/assets/exun.svg"
                                alt="alt"
                                className="club-logo"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="600"
                                src="/assets/exun.svg"
                                alt="alt"
                                className="club-logo"
                            />
                        </div>
                    </div>
                </div> */}

                <div className="feat container first-feat">
                    <div className="feat-banner">
                        <img
                            className="feat-img-minus"
                            src="/assets/land1.svg"
                            alt="alt"
                        />
                    </div>
                    <div className="feat-content">
                        <h2 data-aos="fade-left">
                            Showcase your work and skills!
                        </h2>
                        <p data-aos="fade-left" data-aos-delay="300">
                            techCircuit serves as a platform for individuals
                            with varying skillsets, ranging from code to design,
                            to show off their projects to the tech community.
                            Users can upvote, share and comment on posts, making
                            the community a positive and friendly space.
                            techCircuit’s easy to use filters let users navigate
                            through projects effortlessly.
                        </p>
                    </div>
                </div>
                <div className="feat container">
                    <div className="feat-content">
                        <h2 data-aos="fade-right">
                            Browsing events made easier for you!
                        </h2>
                        <p data-aos="fade-right" data-aos-delay="300">
                            We strive to provide the ideal platform for people
                            to host and promote their hackathons, designathons
                            and tech symposiums, and coordinate schedules to
                            avoid conflicts.
                        </p>
                    </div>
                    <div className="feat-banner">
                        <img
                            className="feat-img-plus"
                            src="/assets/land2.svg"
                            alt="alt"
                        />
                    </div>
                </div>
                <div className="feat container">
                    <div className="feat-banner">
                        <img
                            className="feat-img-minus"
                            src="/assets/land3.svg"
                            alt="alt"
                        />
                    </div>
                    <div className="feat-content">
                        <h2 data-aos="fade-left">
                            Meet. Share. Discuss. Welcome to Community of
                            creators!
                        </h2>
                        <p data-aos="fade-left" data-aos-delay="300">
                            techCircuit has a friendly and really helpful
                            community which aims to ultimately help everyone
                            benefit from the platform. Creators can get feedback
                            on their projects, tech enthusiasts can sign up for
                            events, and organizations can promote their events.
                            The techCircuit forum also serves as a place for
                            healthy discussion amongst people interested in
                            tech.
                        </p>
                    </div>
                </div>
                <div className="feat container">
                    <div className="feat-content">
                        <h2 data-aos="fade-right">
                            Curated crowdsourced resources for all fields!
                        </h2>
                        <p data-aos="fade-right" data-aos-delay="300">
                            techCircuit also features learning resources for
                            various tech-related fields, including Design, A/V,
                            Software Development, Cryptic Hunts and more; to
                            which members of the community can contribute.
                        </p>
                    </div>
                    <div className="feat-banner">
                        <img
                            className="feat-img-plus"
                            src="/assets/land5.svg"
                            alt="alt"
                            id="not-final-img"
                        />
                    </div>
                </div>
                <div className="feat container">
                    <div className="feat-banner">
                        <img
                            className="feat-img-minus"
                            src="/assets/land4.svg"
                            alt="alt"
                        />
                    </div>
                    <div className="feat-content">
                        <h2 data-aos="fade-left">
                            Place to discuss your intrests & projects with
                            everyone!
                        </h2>
                        <p data-aos="fade-left" data-aos-delay="300">
                            Our forum provides a place for the tech community to
                            discuss their interests or projects, promote
                            content, and share their views on technology-related
                            topics.
                        </p>
                    </div>
                </div>
                <div className="feat last-feat container">
                    <div className="feat-content">
                        <h2 data-aos="fade-right">
                            Home to student clubs and organizations!
                        </h2>
                        <p data-aos="fade-right" data-aos-delay="300">
                            techCircuit aims to provide a unified platform for
                            school and college tech clubs and organizations to
                            connect and host events.
                        </p>
                    </div>
                    <div className="feat-banner">
                        <img
                            className="feat-img-plus"
                            src="/assets/land6.svg"
                            alt="alt"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Index;
