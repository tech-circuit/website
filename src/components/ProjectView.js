import "../styles/work.css";
import {
    FaChevronLeft,
    FaShareAlt,
    FaCaretDown,
    FaPen,
    FaHome,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import notyf from "../tcNotyf";
import getLinkogo from "../getLinkLogo";
import BASE_API_URL from "../constants";
import { ClipLoader } from "react-spinners";

const authToken = localStorage.getItem("authToken");

const ProjectView = ({ socket }) => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const [creatingComment, setCreatingComment] = useState(false);
    const [nextPage, setNextPage] = useState(0);
    const [moreComments, setMoreComments] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalComments, setTotalComments] = useState(0);
    const [project, setProject] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const { projectId } = useParams();

    const PAGINATION_LIMIT = 5;

    const checkIfAuthenticated = () => {
        fetch(`${BASE_API_URL}/user/pfp?access_token=${authToken}`)
            .then((res) => {
                if (res.status !== 404) {
                    setAuthenticated(true);
                }
            })
            .catch((err) => console.log(err));
    };

    const createComment = () => {
        if (commentContent.trim().length !== 0) {
            setCreatingComment(true);
            setCommentContent("");
            fetch(
                `${BASE_API_URL}/work/comment/new?access_token=${authToken}`,
                {
                    // Adding method type
                    method: "POST",

                    // Adding body or contents to send
                    body: JSON.stringify({
                        comment: commentContent,
                        project_id: project._id,
                    }),

                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            ).then(async (response) => {
                let res = await response.json();
                if (res.success === true) {
                    setComments([res.comment, ...comments]);
                    socket.emit("notif", res.receivers);
                    setCreatingComment(false);
                } else {
                    if (res.error === "User not found.") {
                        notyf.error("Please log in to comment");
                    } else {
                        notyf.open({
                            type: "error",
                            message: res.error,
                        });
                    }
                    setCreatingComment(false);
                }
            });
        } else {
            notyf.open({
                type: "error",
                message: "Please enter a comment.",
            });
        }
    };

    const loadMoreComments = async () => {
        if (moreComments) {
            setLoading(true);
            const res = await (
                await fetch(
                    `${BASE_API_URL}/work/comments/${project._id}?access_token=${authToken}&limit=${PAGINATION_LIMIT}&page=${nextPage}`
                )
            ).json();
            if (res.success) {
                setComments([...comments, ...res.comments]);
                if (res.next) {
                    setNextPage(res.next.pageNumber);
                } else {
                    setMoreComments(false);
                }
            }
            setLoading(false);
        }
    };

    const getId = async () => {
        try {
            const authToken = localStorage.getItem("authToken");

            if (authToken) {
                const dataJson = await fetch(
                    `${BASE_API_URL}/user/info?access_token=${authToken}`
                );
                const data = await dataJson.json();
                console.log(data);

                if (data.user) {
                    setUserId(data.user._id);
                } else {
                    notyf.error("some error occured");
                }
            } else {
                setUserId("");
            }
        } catch (err) {
            notyf.error("some error occured");
        }
    };

    useEffect(() => {
        console.log("USE EFFECT RUNNING");
        const getProject = async () => {
            const projectDataJson = await fetch(
                `${BASE_API_URL}/project/${projectId}`
            );
            const projectData = await projectDataJson.json();
            console.log(projectData);

            if (projectData.project) {
                setProject(projectData.project);
                setLoading(true);
                const res = await (
                    await fetch(
                        `${BASE_API_URL}/work/comments/${projectId}?access_token=${authToken}&limit=${PAGINATION_LIMIT}&page=0`
                    )
                ).json();
                if (res.success === true) {
                    setComments(res.comments);
                    setTotalComments(res.totalComments);
                    if (res.next) {
                        setNextPage(res.next.pageNumber);
                        setMoreComments(true);
                    }
                }
                setLoading(false);
                document.getElementsByTagName("html")[0].style.scrollBehavior =
                    "smooth";
                checkIfAuthenticated();
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getProject();
            getId();
        } catch (err) {
            notyf.error("some error occured");
        }
    }, [projectId]);

    return (
        <>
            <div className="black-banner"></div>
            <section className="ViewProjectWrap">
                <div className="proj-top">
                    <Link className="project-back" to="/forum">
                        <FaChevronLeft />
                        Go Back
                    </Link>
                    {userId && project && userId === project.uploader && (
                        <div className="edit-wrap">
                            <FaPen />
                            <a className="edit" href="/">
                                Edit Project
                            </a>
                        </div>
                    )}{" "}
                </div>

                <img
                    src={project.cover_image}
                    alt="alt"
                    className="fullProjectBanneri"
                />

                <div className="projectOrg">
                    <div>
                        <h1>{project.title}</h1>
                        <h3>{project.collaborators}</h3>
                    </div>
                    <a
                        href={project.links ? project.links[0] : ""}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="view-proj">View Project</button>
                    </a>
                </div>

                <div className="project-body">
                    <div className="project-content">
                        <div className="fullProjectUnit project-about">
                            <h3>About</h3>
                            <p>{project.description}</p>
                        </div>
                        <div className="fullProjectUnit fullProjectUnitOrg">
                            <h3>Fields</h3>
                            <p className="pFields">
                                {project.fields
                                    ? project.fields.map((field) => {
                                          return (
                                              <div className="project-field">
                                                  {field}
                                              </div>
                                          );
                                      })
                                    : "No fields to display"}
                            </p>
                        </div>
                        <div className="fullProjectUnit fullProjectUnitOrg">
                            <h3>Project Tags</h3>
                            <p className="tags">
                                {project.tags
                                    ? project.tags.map((tag) => {
                                          return (
                                              <div className="project-tag">
                                                  {tag}
                                              </div>
                                          );
                                      })
                                    : "No tags to display"}
                            </p>
                        </div>
                    </div>
                    <div className="project-showoff">
                        <div className="fullProjectUnit project-about">
                            <h3>Project Media</h3>
                            <div className="project-images">
                                {project.imgs &&
                                    project.imgs.map((img) => (
                                        <img src={img} alt={img} />
                                    ))}
                            </div>
                        </div>
                        <div className="fullProjectUnit">
                            <h3>View it on</h3>
                            <div className="project-links">
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
                                                      className="project-link"
                                                  >
                                                      {getLinkogo(link)}
                                                  </a>
                                              );
                                          })
                                    : "No links to display"}
                            </div>
                        </div>
                        {project.event && (
                            <div className="fullProjectUnit">
                                <h3>For Event</h3>
                                <Link to="/" className="projectEvent">
                                    {project.event}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="fullProjectUnit project-comments">
                    <h3>Comments ({totalComments})</h3>
                    <div className="add-comment">
                        <div className="add-comm-top">
                            <img
                                src={
                                    authenticated
                                        ? `${BASE_API_URL}/user/pfp?access_token=${authToken}`
                                        : "/assets/accounticon.png"
                                }
                                alt="alt"
                            />
                            <textarea
                                name="comments"
                                autoComplete="off"
                                className="comment-text"
                                id="comment-input-area"
                                placeholder="Post some critique or review regarding their work!"
                                onChange={(e) =>
                                    setCommentContent(e.target.value)
                                }
                                value={commentContent}
                            ></textarea>
                        </div>
                        <div className="fullProjectButtons">
                            <button
                                className="post-pcomment-btn"
                                id="work-comment-btn"
                                onClick={createComment}
                                disabled={creatingComment}
                            >
                                {creatingComment
                                    ? "Loading..."
                                    : "Post Comment"}
                            </button>
                            <button className="post-pcancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>

                <div className="proj-com-cont">
                    {comments.map((comment, index) => (
                        <div className="proj-com-card" key={index}>
                            <img src={comment.author_pfp_url} alt="alt" />
                            <div className="proj-com-text">
                                <h4>{comment.author_username}</h4>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                    <div
                        style={{
                            width: "full",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <ClipLoader
                            cssOverride={{
                                position: "static",
                                display: "block",
                                margin: "0 auto",
                            }}
                            size={20}
                            loading={loading}
                        />
                    </div>
                    {moreComments && (
                        <div className="more-com-wrap">
                            <p className="more-com" onClick={loadMoreComments}>
                                More Comments
                            </p>
                            <FaCaretDown className="caret-down" />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProjectView;
