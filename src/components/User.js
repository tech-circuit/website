import "../styles/user.css";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkogo from "../getLinkLogo";

const User = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [user, setUser] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const getUser = async () => {
            const userDataJson = await fetch(`${BASE_API_URL}/user/id/${userId}`);
            const userData = await userDataJson.json();

            if (userData.user) {
                setUser(userData.user);
                console.log(user)
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getUser();
        } catch (err) {
            notyf.error("some error occured");
        }
    }, [userId, user]);
    
    return (
        <>
            <section className="user-cont">
                <Link className="user-back" to="/forum">
                    <FaChevronLeft />
                    Back
                </Link>
                <div className="profile-info">
                        <img src={user.pfp_url} className="user-pfp" alt="alt" />
                    <div className="text">
                        <div className="e">                            
                            <h3>{user.name}</h3>
                            <p className="field">{user.title}</p>                            
                        </div>
                            <p className="email">{user.email}</p>
                        <div className="user-links">
                            {user.links
                                ? user.links
                                    .slice(0)
                                    .reverse()
                                    .map((link) => {
                                        return (
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {getLinkogo(link)}
                                            </a>
                                        );
                                    })
                                : ""}
                        </div>
                    </div>
                </div>
                <div className="user-div aboutme">
                    <h3>About Me</h3>
                    <p>{user.about}</p>
                </div>
                <div className="user-div skills">
                    <h3>Skills</h3>
                    <p>
                        {user.skills
                                ? user.skills
                                    .map((skill) => {
                                        return (
                                            <span>{skill} </span>
                                        );
                                    })
                                : "No skills to display"}
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