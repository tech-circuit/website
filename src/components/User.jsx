import "../styles/user.css";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkogo from "../getLinkLogo";
import MiniOrgCard from "../components/utility/MiniOrgCard";
import ProjectCard from "../components/utility/ProjectCard";
import FullProject from "../components/utility/FullProject";

const User = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [user, setUser] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [projects, setProjects] = useState([]);
    const { userId } = useParams();
    const [fullView, setfullView] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});

    const view = (project) => {
        setSelectedProject(project);
        setfullView(true);
    };

    const close = () => {
        setfullView(false);
    };

    useEffect(() => {
        const getUser = async () => {
            const userDataJson = await fetch(
                `${BASE_API_URL}/user/id/${userId}`
            );
            const userData = await userDataJson.json();

            if (userData.user) {
                setUser(userData.user);
                setOrgs(userData.orgs);
                setProjects(userData.projects);
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
            <div
                className={
                    fullView ? "event-cover event-cover-active" : "event-cover"
                }
                onClick={close}
            ></div>
            <section className="user-cont">
                <div className="user-cont-box">
                    <Link className="user-back" to="/community">
                        <FaChevronLeft />
                        Back
                    </Link>
                    <div className="profile-info">
                        <img
                            src={user.pfp_url}
                            className="user-pfp"
                            alt="alt"
                        />
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
                    {user.about && (
                        <div className="user-div aboutme">
                            <h3>About Me</h3>
                            <p>{user.about}</p>
                        </div>
                    )}
                    {user.skills && user.skills.length !== 0 && (
                        <div className="user-div skills">
                            <h3>Skills</h3>
                            <p>
                                {user.skills.map((skill, i) => {
                                    return <span key={i}>{skill} </span>;
                                })}
                            </p>
                        </div>
                    )}
                    {orgs && orgs.length !== 0 && (
                        <div className="user-div current-org">
                            <h3>Organisations</h3>
                            {orgs.map((org) => (
                                <MiniOrgCard
                                    key={org._id}
                                    org={org}
                                    leave={false}
                                />
                            ))}
                        </div>
                    )}
                    {projects && projects.length !== 0 && (
                        <div className="user-div user-projects">
                            <h3>Projects Showcase</h3>
                            <div className="workCards">
                                {projects.map((project) => (
                                    <ProjectCard
                                        id={userId}
                                        key={project._id}
                                        view={view}
                                        project={project}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <section
                        className={
                            fullView ? "fullEvent fullEventActive" : "fullEvent"
                        }
                    >
                        <FullProject project={selectedProject} close={close} />
                    </section>
                </div>
            </section>
        </>
    );
};

export default User;
