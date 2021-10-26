import "../styles/user.css";
import { FaInstagram, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css";

const User = () => {
    return (
        <>
            <section className="user-cont">
                <Link className="user-back" to="/forum">
                    <FaChevronLeft />
                    Back
                </Link>
                <div className="profile-info">
                        <img src="/assets/samvr.jpeg" className="user-pfp" alt="alt" />
                    <div className="text">
                        <div className="e">                            
                            <h3>Samvrant Samantaray</h3>
                            <p className="field">Student, Designer</p>                            
                        </div>
                            <p className="email">ishaan2310@gmail.com</p>
                        <div className="user-links">
                            <a href="/">
                            <FaInstagram />
                            </a>
                            <a href="/">
                            <FaInstagram />
                            </a>
                            <a href="/">
                            <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="user-div aboutme">
                    <h3>About Me</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque 
                    pellentesque mauris at accumsan. Nullam nec pulvinar ante. Quisque sed 
                    risus quis elit pretium sollicitudin. 
                    </p>
                </div>
                <div className="user-div skills">
                    <h3>Skills</h3>
                    <p>
                    UI/UX, Illustration, interface design, 3D Design
                    </p>
                </div>
                <div className="user-div current-org">
                    <h3>Current organisation</h3>
                    <div className="org-name">
                        <img src="/assets/samvr.jpeg" alt="alt" />
                        <p>Code Warriors</p>
                    </div>
                </div>
                <div className="user-div user-projects">
                    <h3>Projects Showcase</h3>
                    <div className="proj-cont">
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" className="proj-img" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                        <div className="proj">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <h4 className="project-name">Arena| Chess Platform Concept</h4>
                            <p className="author">Ishaan Das</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default User;