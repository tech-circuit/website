import "../index.css";
import { Link } from "react-router-dom";
import {
  FaLongArrowAltRight,
  FaChevronDown,
  FaCommentAlt,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaBehanceSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaEnvelope,
} from "react-icons/fa";

const Index = () => {
  return (
    <main>
      <div className="msg">
        <FaCommentAlt />
      </div>
      <section className="hero">
        <div className="hero-left">
          <div className="container">
            <h1>
              The place where
              <br />
              everything takes place.
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse duis lectus mi urna nulla suscipit lorem egestas.
              <br />
              Diam dignissim sed congue id duis mattis dictum integer sit.
            </p>
            <Link to="/" className="hero-btn">
              Join us Now&nbsp;&nbsp;
              <FaLongArrowAltRight />
            </Link>
            <div className="scroll-more-hold">
              <a href="/" className="scroll-more">
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

      <section className="about">
        <div className="abt-left">
          <div className="container">
            <h1>
              What is <strong>techCircuit?</strong>
            </h1>
            <p>
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
        <div className="abt-right"></div>
      </section>

      <section className="feats">
        <div className="clubs container">
          <div className="club-left">
            <h2>
              Home to the most influential
              <br />
              tech clubs from all over India.
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse duis lectus mi urna nulla suscipit lorem egestas. Diam
              dignissim sed congue id duis mattis dictum integer sit.
            </p>
            <Link to="/" className="club-btn">
              View Clubs
            </Link>
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

        <div className="feat container first-feat">
          <div className="feat-banner">
            <img className="feat-img-minus" src="/assets/write.png" alt="" />
          </div>
          <div className="feat-content">
            <h2>Showcase your work and skills</h2>
            <p>
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
            <h2>Showcase your work and skills</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
              amet molestie et, vulputate arcu sed mattis. Elit neque, amet,
              amet, vulputate eget blandit. Pellentesque luctus elementum dui
              gravida. Tortor sed pulvinar mauris nam eu. Placerat porttitor
              euismod eget vulputate orci, convallis accumsan. Vitae, adipiscing
              diam justo, netus.
            </p>
          </div>
          <div className="feat-banner">
            <img className="feat-img-plus" src="/assets/write.png" alt="" />
          </div>
        </div>
        <div className="feat container">
          <div className="feat-banner">
            <img className="feat-img-minus" src="/assets/write.png" alt="" />
          </div>
          <div className="feat-content">
            <h2>Showcase your work and skills</h2>
            <p>
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
            <h2>Showcase your work and skills</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis at
              amet molestie et, vulputate arcu sed mattis. Elit neque, amet,
              amet, vulputate eget blandit. Pellentesque luctus elementum dui
              gravida. Tortor sed pulvinar mauris nam eu. Placerat porttitor
              euismod eget vulputate orci, convallis accumsan. Vitae, adipiscing
              diam justo, netus.
            </p>
          </div>
          <div className="feat-banner">
            <img className="feat-img-plus" src="/assets/write.png" alt="" />
          </div>
        </div>
      </section>

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
          <div className="links">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link>Events</Link>
              </li>
              <li>
                <Link>Events</Link>
              </li>
              <li>
                <Link>Events</Link>
              </li>
              <li>
                <Link>Events</Link>
              </li>
            </ul>
          </div>
          <div className="links">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link>Events</Link>
              </li>
              <li>
                <Link>Events</Link>
              </li>
              <li>
                <Link>Events</Link>
              </li>
              <li>
                <Link>Events</Link>
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
    </main>
  );
};

export default Index;
