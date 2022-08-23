import {
    FaWhatsapp,
    FaEnvelope,
    FaFacebookF,
    FaRedditAlien,
    FaTwitter,
} from "react-icons/fa";
import {
    EmailShareButton,
    FacebookShareButton,
    RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

const Share = ({ fixed = false }) => {
    return (
        <div className={fixed ? "share-box share-box-fixed" : "share-box"}>
            <h3>Share Project</h3>
            <div className="share-links">
                <EmailShareButton url={window.location.href}>
                    <div
                        className="share-link"
                        style={{ background: "#4678f9" }}
                    >
                        <FaEnvelope />
                    </div>
                </EmailShareButton>
                <FacebookShareButton url={window.location.href}>
                    <div
                        className="share-link"
                        style={{ background: "#3b5998" }}
                    >
                        <FaFacebookF />
                    </div>
                </FacebookShareButton>
                <RedditShareButton url={window.location.href}>
                    <div
                        className="share-link"
                        style={{ background: "#ff4500" }}
                    >
                        <FaRedditAlien />
                    </div>
                </RedditShareButton>
                <WhatsappShareButton url={window.location.href}>
                    <div
                        className="share-link"
                        style={{ background: "#25d366" }}
                    >
                        <FaWhatsapp />
                    </div>
                </WhatsappShareButton>
                <TwitterShareButton url={window.location.href}>
                    <div
                        className="share-link"
                        style={{ background: "#1da1f2" }}
                    >
                        <FaTwitter />
                    </div>
                </TwitterShareButton>
            </div>
        </div>
    );
};

export default Share;
