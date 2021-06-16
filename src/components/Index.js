import { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import {
  FaLongArrowAltRight,
  FaChevronDown,
  FaCommentAlt,
  FaEnvelope,
  FaCheck,
} from "react-icons/fa";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  const [modalView, setModalView] = useState(false);
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
    if (
      contactEmail.trim().length !== 0 &&
      contactMessage.trim().length !== 0
    ) {
      console.log(contactEmail, contactMessage);
      setContactMessage("");
      setContactEmail("");
      setSendButton(false);
      setTimeout(() => setSendButton(true), 1000);
    }
  };

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <main>
      {modalView === true ? (
        <>
          <div className="contact-card">
            <h1>Leave us a message!</h1>
            <div className="input">
              <FaEnvelope />
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
          <div className="msg" onClick={() => modalStateChange(false)}>
            <FaChevronDown />
          </div>
        </>
      ) : (
        <div className="msg" onClick={() => modalStateChange(true)}>
          <FaCommentAlt />
        </div>
      )}
      <section className="hero">
        <div className="hero-left">
          <div className="container">
            <h1 data-aos="fade-right">
              The place where
              <br />
              everything takes place.
            </h1>
            <p data-aos="fade-right" data-aos-delay="200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse duis lectus mi urna nulla suscipit lorem egestas.
              <br />
              Diam dignissim sed congue id duis mattis dictum integer sit.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh enim
              fames elementum turpis elementum lacus. Purus nunc turpis arcu at
              ac tortor in purus. Purus penatibus vestibulum, sed sodales id
              molestie massa pretium. Neque congue euismod sagittis cras cras
              sit. Scelerisque rhoncus eget amet.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse duis lectus mi urna nulla suscipit lorem egestas. Diam
              dignissim sed congue id duis mattis dictum integer sit.
            </p>
            <img src="/assets/abt.svg" alt="About Banner" />
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse duis lectus mi urna nulla suscipit lorem egestas. Diam
              dignissim sed congue id duis mattis dictum integer sit.
            </p>
            <Link data-aos="fade-right" to="/" className="club-btn">
              View Clubs
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
        </div>

        <div className="feat container first-feat">
          <div className="feat-banner">
            <img className="feat-img-minus" src="/assets/write.png" alt="alt" />
          </div>
          <div className="feat-content">
            <h2 data-aos="fade-left">Showcase your work and skills</h2>
            <p data-aos="fade-left" data-aos-delay="300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
              amet molestie et, vulputate arcu sed mattis. Elit neque, amet,
              amet, vulputate eget blandit. Pellentesque luctus elementum dui
              gravida. Tortor sed pulvinar mauris nam eu. Placerat porttitor
              euismod eget vulputate orci, convallis accumsan. Vitae, adipiscing
              diam justo, netus.
            </p>
          </div>
        </div>
        <div className="feat container">
          <div className="feat-content">
            <h2 data-aos="fade-right">Showcase your work and skills</h2>
            <p data-aos="fade-right" data-aos-delay="300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
              amet molestie et, vulputate arcu sed mattis. Elit neque, amet,
              amet, vulputate eget blandit. Pellentesque luctus elementum dui
              gravida. Tortor sed pulvinar mauris nam eu. Placerat porttitor
              euismod eget vulputate orci, convallis accumsan. Vitae, adipiscing
              diam justo, netus.
            </p>
          </div>
          <div className="feat-banner">
            <img className="feat-img-plus" src="/assets/write.png" alt="alt" />
          </div>
        </div>
        <div className="feat container">
          <div className="feat-banner">
            <img className="feat-img-minus" src="/assets/write.png" alt="alt" />
          </div>
          <div className="feat-content">
            <h2 data-aos="fade-left">Showcase your work and skills</h2>
            <p data-aos="fade-left" data-aos-delay="300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
              amet molestie et, vulputate arcu sed mattis. Elit neque, amet,
              amet, vulputate eget blandit. Pellentesque luctus elementum dui
              gravida. Tortor sed pulvinar mauris nam eu. Placerat porttitor
              euismod eget vulputate orci, convallis accumsan. Vitae, adipiscing
              diam justo, netus.
            </p>
          </div>
        </div>
        <div className="feat last-feat container">
          <div className="feat-content">
            <h2 data-aos="fade-right">Showcase your work and skills</h2>
            <p data-aos="fade-right" data-aos-delay="300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
              amet molestie et, vulputate arcu sed mattis. Elit neque, amet,
              amet, vulputate eget blandit. Pellentesque luctus elementum dui
              gravida. Tortor sed pulvinar mauris nam eu. Placerat porttitor
              euismod eget vulputate orci, convallis accumsan. Vitae, adipiscing
              diam justo, netus.
            </p>
          </div>
          <div className="feat-banner">
            <img className="feat-img-plus" src="/assets/write.png" alt="alt" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
