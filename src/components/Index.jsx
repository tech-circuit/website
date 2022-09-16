import { useState, useEffect } from "react";
import "../styles/index.css";
import { Link } from "react-router-dom";
import { FaChevronDown, FaCommentAlt, FaCheck } from "react-icons/fa";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import notyf from "../tcNotyf";
import "notyf/notyf.min.css";

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

    const msgClickHandler = () => {
        modalStateChange(true);
        document
            .querySelector(".msg-opaq-layer")
            .classList.toggle("msg-opaq-layer-active");

        document
            .querySelector(".msg-opaq-layer")
            .removeEventListener("click", msgClickHandler);
    };

    const msgClick = () => {
        modalView === true ? modalStateChange(false) : modalStateChange(true);

        document
            .querySelector(".msg-opaq-layer")
            .classList.toggle("msg-opaq-layer-active");

        document
            .querySelector(".msg-opaq-layer")
            .addEventListener("click", msgClickHandler);
    };

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
        <main style={{ position: "relative" }}>
            <div className="msg-opaq-layer"></div>
            <div className="msg" onClick={msgClick}>
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
                          Join our mailing list to be notifed about the latest updates on techCircuit, get information about events,
                          and to be the first to know when our web platform launches!
                        </p>
                        <div className="mail">
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
                        <a
                            data-aos="fade-up"
                            data-aos-delay="300"
                            href="https://dsc.gg/techcircuit"
                            className="hero-btn"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Join Discord Server &nbsp;&nbsp;
                            <img src="/assets/Right_Arrow.svg" alt="" />
                        </a>
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
                            What is techCircuit?
                        </h1>
                        <p data-aos="fade-right" data-aos-delay="300">
                            This is a place where a community of technology enthusiast students and individuals can network,
                            get feedback on projects, and participate in and host events, and gain access to curated educational
                            resources for numerous fields in the realm of technology, design, entrepreneurship, and more.
                            <br />
                            <br />
                            Tech Circuit (techCircuit) is a <i><strong>community of high school and college students</strong></i>
                            passionate about numerous various domains of technology, ranging from <i><strong>computer science to digital design</strong></i>.
                            It is the place to be to connect and network with like minded tech enthusiasts, share your projects with
                            the community, and to promote your *hackathons* and events independently or through your school/university or club.
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
                <div className="clubs container">
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
                    </div>
                    <div className="club-right">
                        <div className="club-logos">
                            <img
                                data-aos="zoom-in"
                                src="/assets/exun.png"
                                alt="alt"
                                className="club-logo"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="200"
                                src="/assets/cw.jpeg"
                                alt="alt"
                                className="club-logo"
                            />
                            <img
                                data-aos="zoom-in"
                                data-aos-delay="300"
                                src="/assets/ts.png"
                                alt="alt"
                                className="club-logo"
                                style={{ backgroundColor: "#0E0C0C" }}
                            />
                        </div>
                    </div>
                </div>

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
                            Place to discuss your interests & projects with
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
