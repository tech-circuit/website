import { useState } from "react";
import { Link } from "react-router-dom";
import "../about.css";
import "../index.css";
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
          modalView === true ? modalStateChange(false) : modalStateChange(true)
        }
      >
        <FaChevronDown
          className="backIcon"
          style={
            modalView === true
              ? {
                  transform: "scale(0.5) rotate(45deg) translateX(50%)",
                  opacity: "0",
                }
              : {
                  transform: "scale(1) rotate(0deg) translateX(50%)",
                  opacity: "1",
                }
          }
        />
        <FaCommentAlt
          style={
            modalView === true
              ? {
                  transform: "scale(1) rotate(0deg) translateX(-50%)",
                  opacity: "1",
                }
              : {
                  transform: "scale(0.5) rotate(-45deg) translateX(-50%)",
                  opacity: "0",
                }
          }
          className="commentIcon"
        />
      </div>
      <div
        style={
          modalView === true
            ? { transform: "scale(0.5)", opacity: "0", pointerEvents: "none" }
            : { transform: "scale(1)", opacity: "1", pointerEvents: "all" }
        }
        className="contact-card"
      >
        <h1>Leave us a message!</h1>
        <div className="input">
          <img src="/assets/mail.svg" alt="alt" />
          <input
            type="text"
            placeholder="Email Address"
            value={contactEmail}
            onChange={(event) => editContactEmail(event.target.value)}
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
          We’re a team of <b>developers and designers</b> but most importantly
          creators who have all experienced our own difficulties when trying to
          build a better understanding of the tech circuit in general. While we
          believe we live in an era full of opportunity, we feel much of this
          passes us by. Given our abundant and constant access to useful
          resources, we felt that we should do out part in helping fellow tech
          enthusiasts.
          <br />
          <br />
          Since long, the{" "}
          <u>tech community has lacked a centralised platform</u>, using which
          people can connect, share their creative work and get feedback, and
          participate in events. techCircuit aims to solve all of these
          problems.
        </p>
      </div>

      <div className="why container">
        <div className="why-top">
          <h1>Why we built techCircuit</h1>
          <p>
            Being members of some of the most popular tech clubs in India, we
            have come across a number of problems during the time we’ve spent as
            a part of the Delhi Tech Circuit. We resoluted to build a platform,
            which would eradicate such stumbling blocks for tech enthusiasts
            around the world.
          </p>
        </div>
        <div className="why-bot">
          <h3>
            techCircuit aims to bridge the gap between professionals and
            beginners across multiple tech fields.
          </h3>
        </div>
      </div>

      <div className="clubs about-clubs container">
        <div className="club-left">
          <p>
            techCircuit allows users to browse projects from various tech
            fields, which have been created by highly talented individuals. Be
            it a rebrand for a company, an illustration, or a lorem ipsum,
            you’ll find something for everything here!
          </p>
        </div>
        <div className="club-right">
          <div className="club-logos">
            <img src="/assets/exun.svg" alt="alt" className="club-logo" />
            <img src="/assets/exun.svg" alt="alt" className="club-logo" />
            <img src="/assets/exun.svg" alt="alt" className="club-logo" />
            <img src="/assets/exun.svg" alt="alt" className="club-logo" />
            <img src="/assets/exun.svg" alt="alt" className="club-logo" />
            <img src="/assets/exun.svg" alt="alt" className="club-logo" />
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div className="a">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At amet,
              nunc scelerisque sit proin mattis eget sem morbi. Quam id aliquet
              vivamus nulla porttitor amet. Lacus ultrices faucibus venenatis,
              vel arcu eu ac pellentesque. Sapien pretium, amet ultricies
              dictumst vulputate eu aliquet mattis gravida. Aliquam at a,
              tincidunt magna in. Ut a enim at non nunc. Nibh pharetra turpis
              sit scelerisque. Neque tincidunt massa aliquet urna nulla ac eget
              malesuada penatibus. Nunc sem ut gravida felis. Mauris, eu congue
              vitae pharetra.
            </div>
          </div>
          <div className="faq">
            <FaChevronDown
              className="faq-toggle"
              onClick={(e) => toggleAns(e)}
            />
            <div className="q">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div className="a">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At amet,
              nunc scelerisque sit proin mattis eget sem morbi. Quam id aliquet
              vivamus nulla porttitor amet. Lacus ultrices faucibus venenatis,
              vel arcu eu ac pellentesque. Sapien pretium, amet ultricies
              dictumst vulputate eu aliquet mattis gravida. Aliquam at a,
              tincidunt magna in. Ut a enim at non nunc. Nibh pharetra turpis
              sit scelerisque. Neque tincidunt massa aliquet urna nulla ac eget
              malesuada penatibus. Nunc sem ut gravida felis. Mauris, eu congue
              vitae pharetra.
            </div>
          </div>
          <div className="faq">
            <FaChevronDown
              className="faq-toggle"
              onClick={(e) => toggleAns(e)}
            />
            <div className="q">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div className="a">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At amet,
              nunc scelerisque sit proin mattis eget sem morbi. Quam id aliquet
              vivamus nulla porttitor amet. Lacus ultrices faucibus venenatis,
              vel arcu eu ac pellentesque. Sapien pretium, amet ultricies
              dictumst vulputate eu aliquet mattis gravida. Aliquam at a,
              tincidunt magna in. Ut a enim at non nunc. Nibh pharetra turpis
              sit scelerisque. Neque tincidunt massa aliquet urna nulla ac eget
              malesuada penatibus. Nunc sem ut gravida felis. Mauris, eu congue
              vitae pharetra.
            </div>
          </div>

          <div className="faq">
            <FaChevronDown
              className="faq-toggle"
              onClick={(e) => toggleAns(e)}
            />
            <div className="q">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div className="a">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At amet,
              nunc scelerisque sit proin mattis eget sem morbi. Quam id aliquet
              vivamus nulla porttitor amet. Lacus ultrices faucibus venenatis,
              vel arcu eu ac pellentesque. Sapien pretium, amet ultricies
              dictumst vulputate eu aliquet mattis gravida. Aliquam at a,
              tincidunt magna in. Ut a enim at non nunc. Nibh pharetra turpis
              sit scelerisque. Neque tincidunt massa aliquet urna nulla ac eget
              malesuada penatibus. Nunc sem ut gravida felis. Mauris, eu congue
              vitae pharetra.
            </div>
          </div>

          <div className="faq">
            <FaChevronDown
              className="faq-toggle"
              onClick={(e) => toggleAns(e)}
            />
            <div className="q">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div className="a">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At amet,
              nunc scelerisque sit proin mattis eget sem morbi. Quam id aliquet
              vivamus nulla porttitor amet. Lacus ultrices faucibus venenatis,
              vel arcu eu ac pellentesque. Sapien pretium, amet ultricies
              dictumst vulputate eu aliquet mattis gravida. Aliquam at a,
              tincidunt magna in. Ut a enim at non nunc. Nibh pharetra turpis
              sit scelerisque. Neque tincidunt massa aliquet urna nulla ac eget
              malesuada penatibus. Nunc sem ut gravida felis. Mauris, eu congue
              vitae pharetra.
            </div>
          </div>
          <div className="faq">
            <FaChevronDown
              className="faq-toggle"
              onClick={(e) => toggleAns(e)}
            />
            <div className="q">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div className="a">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At amet,
              nunc scelerisque sit proin mattis eget sem morbi. Quam id aliquet
              vivamus nulla porttitor amet. Lacus ultrices faucibus venenatis,
              vel arcu eu ac pellentesque. Sapien pretium, amet ultricies
              dictumst vulputate eu aliquet mattis gravida. Aliquam at a,
              tincidunt magna in. Ut a enim at non nunc. Nibh pharetra turpis
              sit scelerisque. Neque tincidunt massa aliquet urna nulla ac eget
              malesuada penatibus. Nunc sem ut gravida felis. Mauris, eu congue
              vitae pharetra.
            </div>
          </div>
          <div className="faq">
            <FaChevronDown
              className="faq-toggle"
              onClick={(e) => toggleAns(e)}
            />
            <div className="q">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div className="a">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At amet,
              nunc scelerisque sit proin mattis eget sem morbi. Quam id aliquet
              vivamus nulla porttitor amet. Lacus ultrices faucibus venenatis,
              vel arcu eu ac pellentesque. Sapien pretium, amet ultricies
              dictumst vulputate eu aliquet mattis gravida. Aliquam at a,
              tincidunt magna in. Ut a enim at non nunc. Nibh pharetra turpis
              sit scelerisque. Neque tincidunt massa aliquet urna nulla ac eget
              malesuada penatibus. Nunc sem ut gravida felis. Mauris, eu congue
              vitae pharetra.
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
          amet molestie et, vulputate arcu sed mattis. Elit neque, amet, amet,
          vulputate.
        </p>
        <div className="big-members">
          <div className="big-member member">
            <img src="/assets/ishana.jpg" alt="Ishaan Das" />
            <h3>Ishaan Das</h3>
            <h4>Founder Director</h4>
          </div>
          <div className="big-member member">
            <img src="https://github.com/laxyapahuja.png" alt="Laxya Pahuja" />
            <h3>Laxya Pahuja</h3>
            <h4>Founder Director</h4>
          </div>
        </div>
        <div className="members">
          <div className="member">
            <img src="/assets/sample-banner.jpg" alt="Samvrant Samantaray" />
            <h3>Samvrant Samantaray</h3>
            <h4>Design Head</h4>
          </div>
          <div className="member">
            <img src="https://github.com/sheldor1510.png" alt="Anshul Saha" />
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
            <h4>Research Head</h4>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
