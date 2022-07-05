import { useEffect } from "react";
import {
    FaShareAlt,
    FaBehance,
    FaCaretDown,
    FaChevronLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import getLinkLogo from "../../getLinkLogo";

const FullProject = ({ project, close }) => {


    const collabList = () => {
        if (project.collaborators) {
            let collabList = project.collaborators.split(',');
            let linkArray = collabList.map((collab,n)=>{
                return(
                    <Link to="/" key={n}>{collab}{n===collabList.length-1?'':','}</Link>
                )
            })
            return linkArray;
        }
        return <></>;
    }
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
                src={project?.cover_image||'/assets/sample-banner.jpg'}
                alt="alt"
                className="fullProjectBanneri"
            />

            <div className="projectOrg">
                <div>
                    <h1>{project?.title}</h1>
                    <h3>
                        {collabList()}
                    </h3>
                </div>
                <button className="view-proj">View Project</button>
            </div>

            <div className="eventAddInfo">
                <div className="fullProjectUnit fullProjectUnitOrg">
                    <h4>Fields</h4>
                    <p className="pFields">
                       {project.fields?.join(', ')||"No fields to display"}
                    </p>
                </div>
                <div className="fullProjectUnit fullProjectUnitOrg">
                    <h4>Project Tags</h4>
                    <p className="tags">{project.tags?.join(', ')||'No tags to display'}</p>
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
                                        {getLinkLogo(link)}
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

            {project.event?.length?<div className="fullProjectUnit">
                <h4>For Event</h4>
                <Link to="/" className="projectEvent">
                    Tech Syndicate: Intech'21 (2021)
                </Link>
            </div>:<></>}

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
        </>
    );
};

export default FullProject;
