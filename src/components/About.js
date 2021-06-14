import { useState } from "react";
import { Link } from "react-router-dom";
import "../about.css";
import "../index.css";
import {
  FaLongArrowAltRight,
  FaChevronDown,
  FaCommentAlt,
  FaEnvelope,
  FaCheck,
} from "react-icons/fa";
import Footer from "../components/Footer";

const About = () => {
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
          <div className="msg" onClick={() => modalStateChange(false)}>
            <FaChevronDown />
          </div>
        </>
      ) : (
        <div className="msg" onClick={() => modalStateChange(true)}>
          <FaCommentAlt />
        </div>
      )}
      <div className="container abt-hero">
        <h1>
          tech<strong>Circuit</strong>
        </h1>
        <h3>Lorem ipsum dolor sit amet consectetur</h3>
        <p>
          We’re a team of developers, designers, lorem but most importantly
          creators who have all experienced our own difficulties when trying to
          build a better understanding of the tech circuit in general <br />
          <br /> While we believe we live in an era full of opportunity, we feel
          much of this passes us by. Given our abundant and constant access to
          major lorem, we should all feel very much involved lorem ipsum dolor.
          <br />
          <br /> However, lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Turpis at amet molestie et,
          vulputate arcu sed mattis. Elit neque, amet, amet, vulputate eget
          blandit.
        </p>
      </div>

      <div className="why container">
        <div className="why-top">
          <h1>Why we built techCircuit</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
            amet molestie et, vulputate arcu sed mattis. Elit neque, amet, amet,
            vulputate eget blandit. Pellentesque luctus elementum dui gravida.
            Tortor sed pulvinar mauris nam eu. Placerat porttitor euismod eget
            vulputate orci, convallis accumsan. Vitae, adipiscing diam justo,
            netus.
          </p>
        </div>
        <div className="why-bot">
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
            amet molestie et, vulputate arcu sed mattis.
          </h3>
        </div>
      </div>

      <div className="clubs about-clubs container">
        <div className="club-left">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
            amet molestie et, vulputate arcu sed mattis. Elit neque, amet, amet,
            vulputate eget blandit. Pellentesque luctus elementum dui gravida.
            Tortor sed pulvinar mauris nam eu. Placerat porttitor euismod eget
            vulputate orci, convallis accumsan. Vitae, adipiscing diam justo,
            netus.
          </p>
        </div>
        <div className="club-right">
          <div className="club-logos">
            <img src="/assets/exun.svg" alt="" className="club-logo" />
            <img src="/assets/exun.svg" alt="" className="club-logo" />
            <img src="/assets/exun.svg" alt="" className="club-logo" />
            <img src="/assets/exun.svg" alt="" className="club-logo" />
            <img src="/assets/exun.svg" alt="" className="club-logo" />
            <img src="/assets/exun.svg" alt="" className="club-logo" />
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
        <Link className="btn" onClick={() => modalStateChange(true)}>
          Leave us a Message!&nbsp;&nbsp;
          <FaLongArrowAltRight />
        </Link>
      </div>

      <div className="member-cont container">
        <h1>Team behind techCircuit</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
          amet molestie et, vulputate arcu sed mattis. Elit neque, amet, amet,
          vulputate eget blandit.
        </p>
        <div className="big-members">
          <div className="big-member member">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h3>Your Mom</h3>
            <h4>Founder Director</h4>
          </div>
          <div className="big-member member">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h3>Your Mom</h3>
            <h4>Founder Director</h4>
          </div>
        </div>
        <div className="members">
          <div className="member">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h3>Your Mom</h3>
            <h4>Founder Director</h4>
          </div>
          <div className="member">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h3>Your Mom</h3>
            <h4>Founder Director</h4>
          </div>
          <div className="member">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h3>Your Mom</h3>
            <h4>Founder Director</h4>
          </div>
          <div className="member">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h3>Your Mom</h3>
            <h4>Founder Director</h4>
          </div>
          <div className="member">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h3>Your Mom</h3>
            <h4>Founder Director</h4>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
