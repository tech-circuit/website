import "../styles/soon.css";
import Footer from "./Footer";

const Soon = () => {
    return (
        <>
            <section className="hero soon">
                <div className="hero-left">
                    <div className="container">
                        <img
                            src="/assets/fulllogo.png"
                            alt="logo"
                            id="soon-logo"
                        />
                        <p>
                            Our platform will be live soon. Join our Discord
                            Server for the latest updates!
                        </p>
                        <a href="https://dsc.gg/techcircuit" className="hero-btn">
                            Join Discord&nbsp;&nbsp;
                            <img src="/assets/Right_Arrow.svg" alt="" />
                        </a>
                    </div>
                </div>
                <div className="hero-right soon-right">
                    <iframe
                        src="https://discord.com/widget?id=869549557636292638&theme=dark"
                        allowtransparency="true"
                        frameborder="0"
                        title="discord"
                        id="disc-wid"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    ></iframe>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Soon;
