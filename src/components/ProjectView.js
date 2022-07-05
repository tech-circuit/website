import "../styles/work.css";
import {
    FaChevronLeft,
    FaShareAlt,
    FaCaretDown,
} from "react-icons/fa";
import { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import notyf from "../tcNotyf";
import getLinkogo from "../getLinkLogo";
import BASE_API_URL from "../constants";

const ProjectView = () => {    
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [project, setProject] = useState([]);
    const { projectId } = useParams();

    useEffect(() => {
        const getProject = async () => {
            const projectDataJson = await fetch(`${BASE_API_URL}/project/${projectId}`);
            const projectData = await projectDataJson.json();

            if (projectData.project) {
                setProject(projectData.project);
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getProject();
        } catch (err) {
            notyf.error("some error occured");
        }
    }, [projectId, project]);

    return (
        <section className="ViewProjectWrap">
            <div className="proj-top">
                <Link className="project-back" to="/forum">
                    <FaChevronLeft />
                    Back
                </Link>
                <div className="share-wrap">
                    <FaShareAlt />
                    <a className="share" href="/">
                        Share
                    </a>
                </div>
            </div>

            <img
                src={project.cover_image}
                alt="alt"
                className="fullProjectBanneri"
            />

            <div className="projectOrg">
                <div>
                    <h1>{project.title}</h1>
                    <h3>
                        {project.collaborators}
                    </h3>
                </div>
                <button className="view-proj">View Project</button>
            </div>

            <div className="projectAddInfo">
                <div className="fullProjectUnit fullProjectUnitOrg">
                    <h4>Fields</h4>
                    <p className="pFields">
                        {project.fields
                                ? project.fields
                                    .map((field) => {
                                        return (
                                            <span>{field} </span>
                                        );
                                    })
                                : "No fields to display"}
                    </p>
                </div>
                <div className="fullProjectUnit fullProjectUnitOrg">
                    <h4>Project Tags</h4>
                    <p className="tags">                        
                        {project.tags
                                    ? project.tags
                                        .map((tag) => {
                                            return (
                                                <span>{tag} </span>
                                            );
                                        })
                                    : "No tags to display"}
                    </p>
                </div>
            </div>

            <div className="fullProjectUnit">
                <h4>View it on</h4>
                    {project.links
                        ? project.links
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
                        : "No links to display"}
            </div>

            <div className="fullProjectUnit">
                <h4>About</h4>
                <p>
                    {project.description}
                </p>
            </div>

            <div className="fullProjectUnit">
                <h4>For Event</h4>
                <Link to="/" className="projectEvent">
                    {project.event ? project.event : "No event to display"}
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
                        <p>Wonderful project loved it!</p>
                    </div>
                </div>
                <div className="proj-com-card">
                    <img src="/assets/thevedan.jpeg" alt="alt" />
                    <div className="proj-com-text">
                        <h4>Ishaan Das</h4>
                        <p>Great! Keep it going.</p>
                    </div>
                </div>
                <div className="proj-com-card">
                    <img src="/assets/ishana.jpg" alt="alt" />
                    <div className="proj-com-text">
                        <h4>Laxya pahuja</h4>
                        <p>Amazing! Loved the idea.</p>
                    </div>
                </div>
                <div className="more-com-wrap">
                    <p className="more-com">More Comments</p>
                    <FaCaretDown className="caret-down" />
                </div>
            </div>
        </section>
    );
};

export default ProjectView;
