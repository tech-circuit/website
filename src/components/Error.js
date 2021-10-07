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
                    &nbsp;&nbsp;Join us Now
                </button>
            </section>
            <Footer />
        </>
    );
};

export default Error;
