import {
    FaShareAlt,
    FaBehance,
    FaCaretDown,
    FaChevronLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FullProject = ({ close }) => {
    return (
        <>
            <div className="proj-top">
                <button className="return" onClick={close}>
                    <FaChevronLeft />
                    &nbsp;&nbsp;Back
                </button>
                <div className="share-wrap">
                    <FaShareAlt />
                    <a className="share" href="/">
                        Share
                    </a>
                </div>
            </div>

            <img
                src="/assets/sample-banner.jpg"
                alt="alt"
                className="fullProjectBanneri"
            />

            <div className="projectOrg">
                <div>
                    <h1>Axus Gaming- Brand Identity Study</h1>
                    <h3>
                        <Link to="/"> Ishaan Das, </Link>
                        <Link to="/"> Ribhav Sharma</Link>
                    </h3>
                </div>
                <button className="view-proj">View Project</button>
            </div>

            <div className="eventAddInfo">
                <div className="fullProjectUnit fullProjectUnitOrg">
                    <h4>Fields</h4>
                    <p className="pFields">
                        UI/UX, Game Design, Branding, Chess
                    </p>
                </div>
                <div className="fullProjectUnit fullProjectUnitOrg">
                    <h4>Project Tags</h4>
                    <p className="tags">UI/UX, Design, Branding</p>
                </div>
            </div>

            <div className="fullProjectUnit">
                <h4>View it on</h4>
                <FaBehance />
            </div>

            <div className="fullProjectUnit">
                <h4>About</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam turpis diam enim odio. Faucibus sagittis, non enim
                    nibh. Diam consectetur maecenas varius nibh at. Porttitor
                    nunc nascetur ultricies vulputate. Egestas at egestas ut mi
                    lectus morbi nam lacus viverra. Sed purus praesent viverra
                    posuere ridiculus tempor. Enim habitasse dictum tristique
                    duis ac sagittis viverra.
                </p>
            </div>

            <div className="fullProjectUnit">
                <h4>For Event</h4>
                <Link to="/" className="projectEvent">
                    Tech Syndicate: Intech'21 (2021)
                </Link>
            </div>

            <div className="fullProjectUnit">
                <h4>Comments (42)</h4>
                <textarea
                    name="comments"
                    autoComplete="off"
                    className="comment-text"
                    placeholder="Post some critique or review regarding their work!"
                ></textarea>
                <div className="fullProjectButtons">
                    <button className="post-pcomment-btn">Post Comment</button>
                    <button className="post-pcancel-btn">Cancel</button>
                </div>
            </div>

            <div className="proj-com-cont">
                <div className="proj-com-card">
                    <img src="/assets/samvr.jpeg" alt="alt" />
                    <div className="proj-com-text">
                        <h4>Samvrant Samanstrueya</h4>
                        <p>Wonderful project loved it woah woah woah</p>
                    </div>
                </div>
                <div className="proj-com-card">
                    <img src="/assets/samvr.jpeg" alt="alt" />
                    <div className="proj-com-text">
                        <h4>Ishaan Das</h4>
                        <p>Wonderful project loved it woah woah woah</p>
                    </div>
                </div>
                <div className="proj-com-card">
                    <img src="/assets/samvr.jpeg" alt="alt" />
                    <div className="proj-com-text">
                        <h4>Laxya pahuja</h4>
                        <p>Wonderful project loved it woah woah woah</p>
                    </div>
                </div>
                <div className="more-com-wrap">
                    <p className="more-com">More Comments</p>
                    <FaCaretDown className="caret-down" />
                </div>
            </div>
        </>
    );
};

export default FullProject;
