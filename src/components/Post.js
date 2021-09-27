import React from "react";
import "../styles/forum.css";
import { FaCommentAlt } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Notyf } from "notyf";
import { useParams } from "react-router-dom";
import { SRLWrapper } from 'simple-react-lightbox';

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
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
    checkIfAuthenticated();
  }, [postId]);

  const options = {
    buttons: {
      backgroundColor: 'rgba(30,30,36,0.8)',
      iconColor: 'rgba(255, 255, 255, 0.8)',
      iconPadding: '10px',
      showAutoplayButton: false,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: false,
      showNextButton: true,
      showPrevButton: true,
      showThumbnailsButton: false,
      size: '40px'
    }
  }

  return (
    <React.Fragment>
      <div className="container fullForumCont">
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
                dangerouslySetInnerHTML={{ __html: response.content }}
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
                <button className="inactive-btn">
                  <img src="/assets/share.svg" alt="share-icon" />
                  <span>&nbsp; Share</span>
                </button>
                {/* <button>
                  <FaBookmark />
                  &nbsp; Save
                </button> */}
                <button className="inactive-btn">
                  <img
                    style={{ color: "#29313d", opacity: "1" }}
                    src="/assets/active-upvote.svg"
                    alt="img"
                    // onClick={() => postAction("unupvote", post.id)}
                  />
                  <span
                    style={{ color: "#29313d", opacity: "1" }}
                    // onClick={() => postAction("unupvote", post.id)}
                  >
                    &nbsp; Upvoted
                  </span>
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
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
                    ? `https://techcircuit.herokuapp.com/user/pfp?access_token=${authToken}`
                    : "/assets/accounticon.png"
                }
                alt="alt"
              />
              <textarea
                name="comment"
                placeholder="What do you think about this post..."
                onChange={(event) => setCommentContent(event.target.value)}
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
                <div className="card-options">
                  <div className="l-opts">
                    <button className="inactive-btn">
                      <img src="/assets/share.svg" alt="share-icon" />
                      <span>&nbsp; Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Post;
