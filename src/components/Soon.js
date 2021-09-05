import "../soon.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Soon = () => {
  return (
    <>
      <section className="hero soon">
        <div className="hero-left">
          <div className="container">
            <img src="/assets/fulllogo.png" alt="logo" id="soon-logo" />
            <p>
              Our platform will be live soon. Join our Discord Server for the
              latest updates!
            </p>
            <Link to="/" className="hero-btn">
              Join Discord&nbsp;&nbsp;
              <img src="/assets/Right_Arrow.svg" alt="" />
            </Link>
          </div>
        </div>
        <div className="hero-right soon-right">
          <iframe
            src="https://discord.com/widget?id=706096517244518460&theme=light"
            width="600"
            height="600"
            allowtransparency="true"
            frameborder="0"
            title="discord"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Soon;
