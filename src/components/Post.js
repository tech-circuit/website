import React from "react";
import "../styles/forum.css";
import { FaCommentAlt } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import {
    FaTwitterSquare,
    FaFacebookSquare,
    FaLink,
    FaChevronLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Notyf } from "notyf";
import { useParams } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import { FacebookShareButton, TwitterShareButton } from "react-share";

const authToken = localStorage.getItem("authToken");

const notyf = new Notyf({
    duration: 2500,
    position: {
        x: "left",
        y: "bottom",
    },
    types: [
        {
            type: "error",
            background: "#FF6B6B",
            dismissible: true,
            icon: {
                className: "material-icons",
                tagName: "i",
                text: "cancel",
                color: "#ffffff",
            },
        },
        {
            type: "success",
            background: "#85D49C",
            dismissible: true,
            icon: {
                className: "material-icons",
                tagName: "i",
                text: "check_circle",
                color: "#ffffff",
            },
        },
    ],
});

const Post = () => {
    const [response, setResponse] = React.useState({});
    const [comments, setComments] = React.useState([]);
    const [commentContent, setCommentContent] = React.useState("");
    const { postId } = useParams();
    const [authenticated, setAuthenticated] = React.useState(false);
    const [report, setReport] = React.useState("none");
    const [reportPost, setReportPost] = React.useState("none");

    const createComment = () => {
        if (commentContent.trim().length !== 0) {
            document.getElementById("post-comment-button").disabled = true;
            document.getElementById("comment-input-area").value = "";
            setCommentContent("");
            fetch(
                `https://techcircuit.herokuapp.com/forum/comment/new?access_token=${authToken}`,
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
                console.log(res);
                if (res.success === true) {
                    updateComments();
                } else {
                    notyf.open({
                        type: "error",
                        message: res.error,
                    });
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
            `https://techcircuit.herokuapp.com/forum/post/${postId}?access_token=${authToken}`
        ).then(async (res) => {
            let resp = await res.json();
            console.log(resp);
            if (resp.success === true) {
                setComments(resp.comments);
            }
        });
    };

    const reportCurrentPost = () => {
        if (report !== "none") {
            fetch(
                `https://techcircuit.herokuapp.com/forum/report/new?access_token=${authToken}`,
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
                    console.log(resp);
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
        fetch(
            `https://techcircuit.herokuapp.com/user/pfp?access_token=${authToken}`
        )
            .then((res) => {
                if (res.status !== 404) {
                    setAuthenticated(true);
                }
            })
            .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        fetch(
            `https://techcircuit.herokuapp.com/forum/post/${postId}?access_token=${authToken}`
        ).then(async (res) => {
            let resp = await res.json();
            console.log(resp);
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
            `https://techcircuit.herokuapp.com/forum/${action}/${postID}?access_token=${authToken}`,
            { method: "POST" }
        ).then(async (response) => {
            let resp = await response.json();
            if (resp.success === true) {
                console.log(action);
                reFetch();
            } else {
                console.log(resp);
                notyf.open({
                    type: "error",
                    message: `Could not ${action} post`,
                });
            }
        });
    };

    const reFetch = () => {
        fetch(
            `https://techcircuit.herokuapp.com/forum/post/${postId}?access_token=${authToken}`
        ).then(async (res) => {
            let resp = await res.json();
            console.log(resp);
            if (resp.success === true) {
                setResponse(resp);
            }
        });
    };

    return (
        <React.Fragment>
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
                            <a href="/">{response.author}</a>
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
                                        ? localStorage.getItem("pfp")
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
                            <a href="/" className="comm-icon">
                                <img src={comment.author_pfp_url} alt="alt" />
                            </a>
                            <div className="comm-content">
                                <div className="details">
                                    <a href="/">{comment.author_username}</a>
                                    <p className="on">
                                        <TimeAgo date={comment.date} />
                                    </p>
                                </div>
                                <p className="comm-body">{comment.comment}</p>
                            </div>
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
        </React.Fragment>
    );
    // SAMPLE FUNCTION FOR BACKEND DEVS
    function the(eve) {
        console.log(eve.target.value);
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

    function reportBtn(postID) {
        setReportPost(postID);
        document
            .querySelector(".report-modal")
            .classList.add("report-modal-active");

        document.body.classList.add("report-modal-body");

        setTimeout(() => {
            document.body.addEventListener("click", bodyClick);
        }, 100);
    }

    function removeBodyOpacity() {
        document.body.classList.remove("report-modal-body");
    }
};

export default Post;
