import { FaShareAlt, FaCaretDown, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import getLinkLogo from "../../getLinkLogo";
import { useState, useEffect } from "react";
import BASE_API_URL from "../../constants";
import notyf from "../../tcNotyf";
import { ClipLoader } from "react-spinners";

const authToken = localStorage.getItem("authToken");

const FullProject = ({ project, close, socket }) => {
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [creatingComment, setCreatingComment] = useState(false);
    const [nextPage, setNextPage] = useState(0);
    const [moreComments, setMoreComments] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalComments, setTotalComments] = useState(0);

    const PAGINATION_LIMIT = 5;

    const collabList = () => {
        if (project.collaborators) {
            let collabList = project.collaborators.split(",");
            let linkArray = collabList.map((collab, n) => {
                return (
                    <Link to="/" key={n}>
                        {collab}
                        {n === collabList.length - 1 ? "" : ","}
                    </Link>
                );
            });
            return linkArray;
        }
        return <></>;
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

    const checkIfAuthenticated = () => {
        fetch(`${BASE_API_URL}/user/pfp?access_token=${authToken}`)
            .then((res) => {
                if (res.status !== 404) {
                    setAuthenticated(true);
                }
            })
            .catch((err) => console.log(err));
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

    useEffect(() => {
        setLoading(true);
        fetch(
            `${BASE_API_URL}/work/comments/${project._id}?access_token=${authToken}&limit=${PAGINATION_LIMIT}&page=0`
        ).then(async (res) => {
            let resp = await res.json();
            if (resp.success === true) {
                setComments(resp.comments);
                setTotalComments(resp.totalComments);
                if (resp.next) {
                    setNextPage(resp.next.pageNumber);
                    setMoreComments(true);
                }
            }
            setLoading(false);
        });
        document.getElementsByTagName("html")[0].style.scrollBehavior =
            "smooth";
        checkIfAuthenticated();
    }, [project, project._id]);

    console.log(authenticated);

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
                src={project?.cover_image || "/assets/sample-banner.jpg"}
                alt="alt"
                className="fullProjectBanneri"
            />

            <div className="projectOrg">
                <div>
                    <h1>{project?.title}</h1>
                    <h3>{collabList()}</h3>
                </div>
                <Link to={`/project/${project._id}`} className="view-proj">
                    View Project
                </Link>
            </div>

            <div className="eventAddInfo">
                <div className="fullProjectUnit fullProjectUnitOrg">
                    <h4>Fields</h4>
                    <p className="pFields">
                        {project.fields?.join(", ") || "No fields to display"}
                    </p>
                </div>
                <div className="fullProjectUnit fullProjectUnitOrg">
                    <h4>Project Tags</h4>
                    <p className="tags">
                        {project.tags?.join(", ") || "No tags to display"}
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
                                      {getLinkLogo(link)}
                                  </a>
                              );
                          })
                    : "No links to display"}
            </div>

            <div className="fullProjectUnit">
                <h4>About</h4>
                <p>{project.description}</p>
            </div>

            {project.event?.length ? (
                <div className="fullProjectUnit">
                    <h4>For Event</h4>
                    <Link to="/" className="projectEvent">
                        Tech Syndicate: Intech'21 (2021)
                    </Link>
                </div>
            ) : (
                <></>
            )}

            <div className="fullProjectUnit">
                <h4>Comments ({totalComments})</h4>
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
                            onChange={(e) => setCommentContent(e.target.value)}
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
                            {creatingComment ? "Loading..." : "Post Comment"}
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
        </>
    );
};

export default FullProject;
