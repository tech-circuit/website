import React from "react";
import "../styles/forum.css";
import { FaCommentAlt } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import {
    FaTwitterSquare,
    FaFacebookSquare,
    FaLink,
    FaChevronLeft,
    FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import notyf from "../tcNotyf";
import { useParams } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import BASE_API_URL from "../constants";

const authToken = localStorage.getItem("authToken");

const Post = () => {
    const [response, setResponse] = React.useState({});
    const [comments, setComments] = React.useState([]);
    const [commentContent, setCommentContent] = React.useState("");
    const { postId } = useParams();
    const [authenticated, setAuthenticated] = React.useState(false);
    const [report, setReport] = React.useState("none");
    const [reportPost, setReportPost] = React.useState("none");
    const [deletePost, setDeletePost] = React.useState("none");

    const createComment = () => {
        if (commentContent.trim().length !== 0) {
            document.getElementById("post-comment-button").disabled = true;
            document.getElementById("comment-input-area").value = "";
            setCommentContent("");
            fetch(
                `${BASE_API_URL}/forum/comment/new?access_token=${authToken}`,
                {
                    // Adding method type
                    method: "POST",

                    // Adding body or contents to send
                    body: JSON.stringify({
                        comment: commentContent,
                        post_id: postId,
                    }),

                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            ).then(async (response) => {
                let res = await response.json();
                if (res.success === true) {
                    updateComments();
                } else {
                    if (res.error === "User not found.") {
                        notyf.error("Please log in to comment");
                    } else {
                        notyf.open({
                            type: "error",
                            message: res.error,
                        });
                    }
                }
                document.getElementById("post-comment-button").disabled = false;
            });
        } else {
            notyf.open({
                type: "error",
                message: "Please enter a comment.",
            });
        }
    };

    const updateComments = () => {
        fetch(
            `${BASE_API_URL}/forum/post/${postId}?access_token=${authToken}`
        ).then(async (res) => {
            let resp = await res.json();
            if (resp.success === true) {
                setComments(resp.comments);
            }
        });
    };

    const reportCurrentPost = () => {
        if (report !== "none") {
            fetch(
                `${BASE_API_URL}/forum/report/new?access_token=${authToken}`,
                {
                    // Adding method type
                    method: "POST",

                    // Adding body or contents to send
                    body: JSON.stringify({
                        post_id: reportPost,
                        message: report,
                    }),

                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            ).then(async (response) => {
                let resp = await response.json();
                if (resp.success === true) {
                    notyf.success({
                        message: "Reported successfully!",
                    });
                } else {
                    notyf.open({
                        type: "error",
                        message: resp.error,
                    });
                }
                document.getElementById("cancel-button").click();
                setReportPost("none");
                setReport("none");
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

    const deleteCurrentPost = () => {
        fetch(
            `${BASE_API_URL}/forum/delete/${deletePost}?access_token=${authToken}`
        ).then(async (response) => {
            let resp = await response.json();
            if (resp.success === true) {
                notyf.success({
                    message: "Deleted successfully!",
                });
                document.getElementById("delete-cancel-button").click();
                setDeletePost("none");
                window.location.href = "/forum";
            } else {
                notyf.open({
                    type: "error",
                    message: resp.error,
                });
            }
            document.getElementById("delete-cancel-button").click();
            setDeletePost("none");
        });
    };

    React.useEffect(() => {
        fetch(
            `${BASE_API_URL}/forum/post/${postId}?access_token=${authToken}`
        ).then(async (res) => {
            let resp = await res.json();
            // console.log(resp);
            if (resp.success === true) {
                setResponse(resp);
                setComments(resp.comments);
            }
        });
        document.getElementsByTagName("html")[0].style.scrollBehavior =
            "smooth";
        checkIfAuthenticated();
    }, [postId]);

    const options = {
        buttons: {
            backgroundColor: "rgba(30,30,36,0.8)",
            iconColor: "rgba(255, 255, 255, 0.8)",
            iconPadding: "10px",
            showAutoplayButton: false,
            showCloseButton: true,
            showDownloadButton: false,
            showFullscreenButton: false,
            showNextButton: true,
            showPrevButton: true,
            showThumbnailsButton: false,
            size: "40px",
        },
    };

    const postAction = (action, postID) => {
        fetch(
            `${BASE_API_URL}/forum/${action}/${postID}?access_token=${authToken}`,
            { method: "POST" }
        ).then(async (response) => {
            let resp = await response.json();
            if (resp.success === true) {
                reFetch();
            } else {
                if (authToken === null) {
                    notyf.error(`Please log in to ${action} this post.`);
                } else {
                    notyf.open({
                        type: "error",
                        message: `Could not ${action} post`,
                    });
                }
            }
        });
    };

    const reFetch = () => {
        fetch(
            `${BASE_API_URL}/forum/post/${postId}?access_token=${authToken}`
        ).then(async (res) => {
            let resp = await res.json();
            if (resp.success === true) {
                setResponse(resp);
            }
        });
    };

    const deleteComment = (id) => {
        fetch(
            `${BASE_API_URL}/forum/comment/delete?access_token=${authToken}&comment_id=${id}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }
        ).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                updateComments();
            } else {
                if (res.error) {
                    notyf.error(`${res.error}`);
                } else {
                    notyf.open({
                        type: "error",
                        message: res.error,
                    });
                }
            }
        });
    };

    return (
        <React.Fragment>
            <div className="opaq-layer"></div>
            <div className="container fullForumCont" id="fullForumCards">
                <div className="forumCards fullForumCards">
                    <Link className="back" to="/forum">
                        <FaChevronLeft />
                        Back
                    </Link>
                    <div className="forumCard fullForumCard">
                        <h2>{response.title}</h2>
                        <h3>
                            posted <TimeAgo date={response.date} /> by{" "}
                            <h4 href="/">{response.author}</h4>
                        </h3>
                        <SRLWrapper options={options}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: response.content,
                                }}
                                className="post-content"
                            ></div>
                        </SRLWrapper>
                        <br></br>
                        <br></br>
                        <div className="card-options">
                            <div className="l-opts">
                                {/* <button>
                  <FaCommentAlt />
                  &nbsp; Reply
                </button> */}
                                <button className="inactive-btn share-btn">
                                    <img
                                        src="/assets/share.svg"
                                        alt="share-icon"
                                    />
                                    <span
                                        onClick={(e) =>
                                            e.target.nextElementSibling.classList.toggle(
                                                "share-opts-active"
                                            )
                                        }
                                    >
                                        &nbsp; Share
                                    </span>
                                    <div className="share-opts">
                                        <a className="share-opt" href="/">
                                            <TwitterShareButton
                                                children={<FaTwitterSquare />}
                                                url={`${
                                                    window.location.protocol +
                                                    "//" +
                                                    window.location.host
                                                }/forum/post/${
                                                    response.post_id
                                                }`}
                                            />
                                        </a>
                                        <a className="share-opt" href="/">
                                            <FacebookShareButton
                                                children={<FaFacebookSquare />}
                                                url={`${
                                                    window.location.protocol +
                                                    "//" +
                                                    window.location.host
                                                }/forum/post/${
                                                    response.post_id
                                                }`}
                                            />
                                        </a>
                                        <button
                                            className="share-opt"
                                            id="copy-forum"
                                            onClick={(e) => {
                                                window.navigator.clipboard.writeText(
                                                    `${
                                                        window.location
                                                            .protocol +
                                                        "//" +
                                                        window.location.host
                                                    }/forum/post/${
                                                        response.post_id
                                                    }`
                                                );
                                                notyf.success(
                                                    "Copied to clipboard!"
                                                );
                                            }}
                                        >
                                            <FaLink />
                                        </button>
                                    </div>
                                </button>
                                {/* <button>
                                    <FaBookmark />
                                    &nbsp; Save
                                </button> */}
                                <button className="inactive-btn">
                                    {response.is_upvoted ? (
                                        <>
                                            <img
                                                style={{
                                                    color: "#29313d",
                                                    opacity: "1",
                                                }}
                                                src="/assets/active-upvote.svg"
                                                alt="img"
                                                onClick={() =>
                                                    postAction(
                                                        "unupvote",
                                                        response.post_id
                                                    )
                                                }
                                            />
                                            <span
                                                style={{
                                                    color: "#29313d",
                                                    opacity: "1",
                                                }}
                                                onClick={() =>
                                                    postAction(
                                                        "unupvote",
                                                        response.post_id
                                                    )
                                                }
                                            >
                                                &nbsp; Upvoted
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src="/assets/inactive-upvote.svg"
                                                alt="upvote-icon-inactive"
                                                onClick={() =>
                                                    postAction(
                                                        "upvote",
                                                        response.post_id
                                                    )
                                                }
                                            />
                                            <span
                                                onClick={() =>
                                                    postAction(
                                                        "upvote",
                                                        response.post_id
                                                    )
                                                }
                                            >
                                                &nbsp; Upvote
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="r-opts">
                                {response.is_mine === true ? (
                                    <button
                                        className="inactive-btn delete-post"
                                        style={{ color: "#FF6B6B" }}
                                        onClick={(eve) =>
                                            deleteBtn(response.post_id)
                                        }
                                    >
                                        <FaTrash />
                                        <span className="report-text">
                                            &nbsp; Delete
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        className="inactive-btn report-post"
                                        onClick={(eve) =>
                                            reportBtn(response.post_id)
                                        }
                                    >
                                        <FaExclamationTriangle />
                                        <span className="report-text">
                                            &nbsp; Report
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="forumCard comment-card" id="comments">
                    <h2>
                        Comments({comments.length}) &nbsp;
                        <FaCommentAlt />
                    </h2>
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
                                name="comment"
                                placeholder="What do you think about this post..."
                                onChange={(event) =>
                                    setCommentContent(event.target.value)
                                }
                                id="comment-input-area"
                            ></textarea>
                        </div>
                        <div className="comment-btns">
                            {/* <button className="btn com-cancel">Cancel</button> */}
                            <button
                                className="btn com-create"
                                onClick={() => createComment()}
                                id="post-comment-button"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                    {comments.map((comment, index) => (
                        <div className="comment" id={comment.id}>
                            <img
                                src={comment.author_pfp_url}
                                alt="alt"
                                className="comm-icon"
                            />
                            <div className="comm-content">
                                <div className="details">
                                    <h4 href="/">{comment.author_username}</h4>
                                    <p className="on">
                                        <TimeAgo date={comment.date} />
                                    </p>
                                </div>
                                <p className="comm-body">{comment.comment}</p>
                            </div>
                            {comment.is_mine ? (
                                <div className="comm-card-opts">
                                    <button
                                        id="delete-comment"
                                        onClick={(e) =>
                                            deleteComment(comment.id)
                                        }
                                    >
                                        <FaTrash />
                                        &nbsp;&nbsp;<span>Delete comment</span>
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="report-modal">
                <h1>Report Post</h1>
                <div className="report-opts" onChange={(e) => the(e)}>
                    <div className="report-opt">
                        <input
                            type="radio"
                            name="report"
                            value="Hate speech or graphic violence"
                        />
                        <label htmlFor="report">
                            Hate speech or graphic violence
                        </label>
                    </div>
                    <div className="report-opt">
                        <input
                            type="radio"
                            name="report"
                            value="Unwanted commercial content or spam"
                        />
                        <label htmlFor="report">
                            Unwanted commercial content or spam
                        </label>
                    </div>
                    <div className="report-opt">
                        <input
                            type="radio"
                            name="report"
                            value="Harassment or bullying"
                        />
                        <label htmlFor="report">Harassment or bullying</label>
                    </div>
                    <div className="report-opt">
                        <input
                            type="radio"
                            name="report"
                            value="Pornography or sexually explicit material"
                        />
                        <label htmlFor="report">
                            Pornography or sexually explicit material
                        </label>
                    </div>
                </div>

                <div className="report-btns">
                    <button
                        className="report-close"
                        onClick={(e) => {
                            e.target.parentElement.parentElement.classList.remove(
                                "report-modal-active"
                            );
                            removeBodyOpacity();
                        }}
                        id="cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        className="report-submit"
                        onClick={(e) => reportCurrentPost()}
                    >
                        Report
                    </button>
                </div>
            </div>

            <div className="delete-modal">
                <h1>Are you sure you want to delete this post?</h1>

                <div className="report-btns">
                    <button
                        className="report-close"
                        onClick={(e) => {
                            e.target.parentElement.parentElement.classList.remove(
                                "delete-modal-active"
                            );
                            removeBodyOpacity();
                        }}
                        id="delete-cancel-button"
                    >
                        No
                    </button>
                    <button
                        onClick={(e) => deleteCurrentPost()}
                        className="delete-submit"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
    // SAMPLE FUNCTION FOR BACKEND DEVS
    function the(eve) {
        if (eve.target.value !== "none") {
            document
                .querySelector(".report-submit")
                .classList.add("report-submit-proceed");
            setReport(eve.target.value);
        }
    }

    function bodyClick(eve) {
        if (eve.target.id === "root") {
            document
                .querySelector(".report-modal")
                .classList.remove("report-modal-active");

            removeBodyOpacity();

            document.body.removeEventListener("click", bodyClick);
        }
    }

    function deleteBtn(postID) {
        setDeletePost(postID);
        document
            .querySelector(".delete-modal")
            .classList.add("delete-modal-active");

        document.body.classList.add("report-modal-body");

        setTimeout(() => {
            document.body.addEventListener("click", bodyClick);
        }, 100);
    }

    function reportBtn(postID) {
        if (authToken !== null) {
            setReportPost(postID);
            document
                .querySelector(".report-modal")
                .classList.add("report-modal-active");

            document.body.classList.add("report-modal-body");

            setTimeout(() => {
                document.body.addEventListener("click", bodyClick);
            }, 100);
        } else {
            notyf.error("Please log in to report");
        }
    }

    function removeBodyOpacity() {
        document.body.classList.remove("report-modal-body");
    }
};

export default Post;
