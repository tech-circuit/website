import Footer from "./Footer";
import "../styles/error.css";
import { useHistory } from "react-router-dom";

const Error = () => {
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

    return (
        <>
            <section className="error-main">
                <img className="err-img" src="/assets/404.svg" alt="404" />
                <h1>Aw ;( Something went wrong!</h1>
                <button className="hero-btn" onClick={goToPreviousPath}>
                    <img src="/assets/Left-Arrow.svg" alt="" />
                    &nbsp;&nbsp;Go Back
                </button>
                <div className="err-illus">
                    <img src="/assets/abt.svg" alt="" />
                    <img
                        src="/assets/abt.svg"
                        id="flip-ill"
                        style={{ transform: "scaleX(-1)" }}
                        alt=""
                    />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Error;
