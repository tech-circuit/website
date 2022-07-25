import {
    FaTwitterSquare,
    FaFacebookSquare,
    FaLink,
    FaTrash,
} from "react-icons/fa";
import TimeAgo from "react-timeago";
import notyf from "../../tcNotyf";
import { FacebookShareButton, TwitterShareButton } from "react-share";

const ForumCard = ({ post, deleteBtn }) => {
    return (
        <div className="forumCard">
            <a href={`forum/post/${post._id}`} className="card-top">
                <div className="l-card-top">
                    <h2>{post.title}</h2>
                    <h3>
                        posted <TimeAgo date={post.date} /> by{" "} You
                    </h3>
                </div>
                <div className="r-card-top">
                    {post.thumbnail === undefined ? (
                        <></>
                    ) : (
                        <img
                            src={post.thumbnail}
                            alt="post-thumbnail"
                            className="post-thumbnail"
                        />
                    )}
                </div>
            </a>
            <div className="card-options">
                <div className="l-opts">
                    <a href={`forum/post/${post.id}/#comments`}>
                        <button>
                            <img
                                src="/assets/comments.svg"
                                alt="comments-icon"
                            />
                            &nbsp; {post.comments} comments
                        </button>
                    </a>
                    <button className="inactive-btn share-btn">
                        <img src="/assets/share.svg" alt="share-icon" />
                        <span
                            onClick={(e) => {
                                if (
                                    document.querySelector(
                                        ".share-opts-active"
                                    ) !== e.target.nextElementSibling
                                ) {
                                    document.querySelector(
                                        ".share-opts-active"
                                    ) &&
                                        document
                                            .querySelector(".share-opts-active")
                                            .classList.remove(
                                                "share-opts-active"
                                            );
                                }

                                e.target.nextElementSibling.classList.toggle(
                                    "share-opts-active"
                                );
                            }}
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
                                    }/forum/post/${post.id}`}
                                />
                            </a>
                            <a className="share-opt" href="/">
                                <FacebookShareButton
                                    children={<FaFacebookSquare />}
                                    url={`${
                                        window.location.protocol +
                                        "//" +
                                        window.location.host
                                    }/forum/post/${post.id}`}
                                />
                            </a>
                            <button
                                className="share-opt"
                                id="copy-forum"
                                onClick={(e) => {
                                    window.navigator.clipboard.writeText(
                                        `${
                                            window.location.protocol +
                                            "//" +
                                            window.location.host
                                        }/forum/post/${post.id}`
                                    );
                                    notyf.success("Copied to clipboard!");
                                }}
                            >
                                <FaLink />
                            </button>
                        </div>
                    </button>
                    {/* <button className="card-opt-done">
                    {post.is_saved ? (
                      <>
                        <img
                          src="/assets/active-save.svg"
                          alt="save-icon-active"
                          onClick={() => postAction("unsave", post.id)}
                        />
                        <span
                          style={{ color: "#29313D" }}
                          onClick={() => postAction("unsave", post.id)}
                        >
                          &nbsp; Saved
                        </span>
                      </>
                    ) : (
                      <>
                        <img
                          src="/assets/inactive-save.svg"
                          alt="save-icon-inactive"
                          onClick={() => postAction("save", post.id)}
                          className="inactive-save"
                        />
                        <span
                          className="inactive-save-text"
                          onClick={() => postAction("save", post.id)}
                        >
                          &nbsp; Save
                        </span>
                      </>
                    )}
                  </button> */}
                </div>
                <div className="r-opts">
                    {post.is_mine === true && (
                        <button
                            className="inactive-btn delete-post"
                            style={{ color: "#FF6B6B" }}
                            onClick={(eve) => deleteBtn(post.id)}
                        >
                            <FaTrash />
                            <span className="report-text">&nbsp; Delete</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForumCard;
