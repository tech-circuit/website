import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
import "../styles/index.css";
import {
    FaLongArrowAltRight,
    FaChevronDown,
    FaCommentAlt,
    FaCheck,
} from "react-icons/fa";
import Footer from "./Footer";
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

const About = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
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

    function toggleAns(eve) {
        if (eve.target.parentElement.classList.contains("faq")) {
            eve.target.nextElementSibling.nextElementSibling.classList.toggle(
                "a-active"
            );
            eve.target.classList.toggle("faq-toggle-active");
        } else {
            eve.target.parentElement.nextElementSibling.nextElementSibling.classList.toggle(
                "a-active"
            );
            eve.target.parentElement.classList.toggle("faq-toggle-active");
        }
    }

    return (
        <>
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
                        to="/about"
                        className="contact-btn"
                        onClick={() => contactFormSubmit()}
                    >
                        Send
                    </Link>
                ) : (
                    <Link to="/about" className="contact-btn green-btn">
                        <FaCheck />
                    </Link>
                )}
            </div>
            <div className="container abt-hero">
                <img src="/assets/fulllogo.png" alt="logo" />
                <h3>The place where everything takes place</h3>
                <p>
                    We’re a team of developers and designers but most
                    importantly creators who have all experienced our own
                    difficulties when trying to build a better understanding of
                    the tech circuit in general. While we believe we live in an
                    era full of opportunity, we feel much of this passes us by.
                    Given our abundant and constant access to useful resources,
                    we felt that we should do out part in helping fellow tech
                    enthusiasts.
                    <br />
                    <br />
                    Since long, the{" "}
                    <u>tech community has lacked a centralised platform</u>,
                    using which people can connect, share their creative work
                    and get feedback, and participate in events. techCircuit
                    aims to solve all of these problems.
                </p>
            </div>

            <section id="abt" className="about about-abt">
                <div className="abt-left">
                    <div className="container">
                        <h1>A bit of background</h1>
                        <p>
                            Over the past 20 years, in the Delhi-NCR region of
                            India (where our founding team is from), an
                            ecosystem of tech clubs and symposiums has been
                            formed, commonly referred to as the Tech Circuit.
                            Here’s how it works - every institute has a tech
                            club with a unique identity; they host and
                            participate in all kinds of events related to tech,
                            members grow their skills across various fields of
                            tech (design. Development, etc), recruit and guide
                            juniors, build cool stuff and grow their network by
                            collaborating with or competing against like-minded
                            students.
                            <br />
                            <br />
                            This ecosystem inspired the creation of techCircuit.
                            We realized that there was no common platform where
                            all this activity could take place, limiting the
                            recognition many organizations or creators could
                            attain.
                            <br />
                            <br />
                            We aim to provide a platform and place for just
                            that. We also want to expand this network beyond our
                            place of origin and potentially create a circuit
                            that spans the entire world.
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

            <div className="why container about-why">
                <div className="why-top">
                    <h1>Why we built techCircuit</h1>
                    <p>
                        Being members of some of the most popular tech clubs in
                        India, we have come across a number of problems during
                        the time we’ve spent as a part of the Delhi Tech
                        Circuit. We resoluted to build a platform, which would
                        eradicate such stumbling blocks for tech enthusiasts
                        around the world.
                    </p>
                </div>
                <div className="why-bot">
                    <h3>
                        techCircuit aims to bridge the gap between professionals
                        and beginners across multiple tech fields.
                    </h3>
                </div>
            </div>

            {/* <div className="clubs about-clubs container">
                <div className="club-left">
                    <p>
                        techCircuit allows users to browse projects from various
                        tech fields, which have been created by highly talented
                        individuals. Be it a rebrand for a company, an
                        illustration, or a lorem ipsum, you’ll find something
                        for everything here!
                    </p>
                </div>
                <div className="club-right">
                    <div className="club-logos">
                        <div className="club-logo">
                            <img src="/assets/circ-2.svg" alt="alt" />
                        </div>
                        <div className="club-logo">
                            <img src="/assets/circ-2.svg" alt="alt" />
                        </div>
                        <div className="club-logo">
                            <img src="/assets/circ-2.svg" alt="alt" />
                        </div>
                        <div className="club-logo">
                            <img src="/assets/circ-2.svg" alt="alt" />
                        </div>
                        <div className="club-logo">
                            <img src="/assets/circ-2.svg" alt="alt" />
                        </div>
                        <div className="club-logo">
                            <img src="/assets/circ-2.svg" alt="alt" />
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="reviews">
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/ishana.jpg" alt="ishana" />
                        <h2>Ishaan Das</h2>
                        <h3>Co-Founder Director</h3>
                    </div>
                    <div className="review-content">
                        <p>
                            Having been an active participant in the Delhi-NCR
                            tech community for four years, I feel that the
                            problems we plan to solve with techCircuit are ones
                            everyone has faced at some point during their
                            endeavors. All we’re doing is trying to organize
                            this whole system that we’ve been a part of for so
                            long, to make the experience smoother for everyone
                            to provide way more people an opportunity to be a
                            part of this community.
                        </p>
                    </div>
                </div>

                <div className="review">
                    <div className="review-left">
                        <img
                            src="https://github.com/laxyapahuja.png"
                            alt="laxy"
                        />
                        <h2>Laxya Pahuja</h2>
                        <h3>Co-Founder Director</h3>
                    </div>
                    <div className="review-content">
                        <p>
                            The number of tech organizations in India was
                            increasing exponentially. We knew that a separate
                            entity that recognizes these clubs and more
                            organizations from all over India and gives them
                            opportunities on a wider scale was very much needed.
                            So, we made one.
                        </p>
                    </div>
                </div>
            </div>

            <div className="faqs-cont container">
                <h1>Frequently Asked Questions</h1>
                <div className="faqs">
                    <div className="faq">
                        <FaChevronDown
                            className="faq-toggle"
                            onClick={(e) => toggleAns(e)}
                        />
                        <div className="q">
                            Do I need to be a part of a Tech Club to be able to
                            use techCircuit?
                        </div>
                        <div className="a">
                            No, you do not. techCircuit serves as a platform for
                            all tech enthusiasts around the world for meeting
                            individuals with similar interests, browsing through
                            hundreds of projects spanning across various fields,
                            participating in discussions and even for accessing
                            archives from the biggest tech symposiums from the
                            past.
                        </div>
                    </div>
                    <div className="faq">
                        <FaChevronDown
                            className="faq-toggle"
                            onClick={(e) => toggleAns(e)}
                        />
                        <div className="q">
                            Do I need to buy a subscription to be able to use
                            techCircuit?
                        </div>
                        <div className="a">
                            No. techCircuit is absolutely free to use for
                            everyone. We do not plan to move to a
                            subscription-model at any point in the future.
                        </div>
                    </div>
                    <div className="faq">
                        <FaChevronDown
                            className="faq-toggle"
                            onClick={(e) => toggleAns(e)}
                        />
                        <div className="q">Is techCircuit open-sourced?</div>
                        <div className="a">
                            techCircuit is not open sourced as of now, and we do
                            not plan to do so in the near future as well.
                            However, if you do have suggestions to help us make
                            the platform better, feel free to drop an email at
                            contact@techcircuit.co
                        </div>
                    </div>

                    <div className="faq">
                        <FaChevronDown
                            className="faq-toggle"
                            onClick={(e) => toggleAns(e)}
                        />
                        <div className="q">
                            How is techCircuit different from behance, dribbble
                            etc?
                        </div>
                        <div className="a">
                            On top of what behance and dribbble offer,
                            techCircuit also lets people get feedback from
                            professionals in their respective fields,
                            participate in events, connect with other people
                            with similar interests and participate in
                            discussions. techCircuit aims to bridge the gap
                            between beginners and professionals across multiple
                            fields.
                        </div>
                    </div>

                    <div className="faq">
                        <FaChevronDown
                            className="faq-toggle"
                            onClick={(e) => toggleAns(e)}
                        />
                        <div className="q">
                            Would techCircuit be useful to me if I'm an absolute
                            newbie who is willing to start my journey in a
                            specific tech field?
                        </div>
                        <div className="a">
                            Totally. At techCircuit, we aim to bridge the gap
                            between beginners and professionals. Using the
                            Learning Resources and Archives that we provide, you
                            can quickly get your creative journey up and
                            running. On top of that, you can also share your
                            work and get valuable feedback from professionals.
                            Additionally, you can always post any of your doubts
                            on the techCircuit forum, and other members of our
                            community will surely assist you.
                        </div>
                    </div>
                </div>
                <h2>Got more Questions?</h2>
                <Link className="btn" onClick={() => modalStateChange(false)}>
                    Leave us a Message!&nbsp;&nbsp;
                    <FaLongArrowAltRight />
                </Link>
            </div>

            <div className="member-cont container">
                <h1>Team behind techCircuit</h1>
                <div className="big-members">
                    <div className="big-member member">
                        <img src="/assets/ishana.jpg" alt="Ishaan Das" />
                        <h3>Ishaan Das</h3>
                        <h4>Co-Founder Director</h4>
                    </div>
                    <div className="big-member member">
                        <img
                            src="https://github.com/laxyapahuja.png"
                            alt="Laxya Pahuja"
                        />
                        <h3>Laxya Pahuja</h3>
                        <h4>Co-Founder Director</h4>
                    </div>
                </div>
                <div className="members">
                    <div className="member">
                        <img
                            src="/assets/samvr.jpeg"
                            alt="Samvrant Samantaray"
                        />
                        <h3>Samvrant Samantaray</h3>
                        <h4>Design Head</h4>
                    </div>
                    <div className="member">
                        <img
                            src="https://github.com/sheldor1510.png"
                            alt="Anshul Saha"
                        />
                        <h3>Anshul Saha</h3>
                        <h4>Development Head</h4>
                    </div>
                    <div className="member">
                        <img
                            src="https://code-warriors.org/img/c3f085fc-5e72-4a00-a5ce-298aefded73d-1617915473562.jpg"
                            alt="Vedanta Somnathe"
                        />
                        <h3>Vedanta Somnathe</h3>
                        <h4>Developer</h4>
                    </div>
                    <div className="member">
                        <img
                            src="https://github.com/ribhavsharma.png"
                            alt="Ribhav Sharma"
                        />
                        <h3>Ribhav Sharma</h3>
                        <h4>Logistics</h4>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default About;
