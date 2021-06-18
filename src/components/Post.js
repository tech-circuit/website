import React from "react";
import "../forum.css";
import { FaCommentAlt } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import TimeAgo from 'react-timeago';
import { Notyf } from 'notyf';
import { useParams } from "react-router-dom";

const authToken = localStorage.getItem("authToken");

const notyf = new Notyf({
  duration: 2500,
  position: {
    x: 'left',
    y: 'bottom'
  },
  types: [
    {
      type: 'error',
      background: '#FF6B6B',
      dismissible: true,
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'cancel',
        color: '#ffffff'
      }
    },
    {
      type: 'success',
      background: '#85D49C',
      dismissible: true,
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'check_circle',
        color: '#ffffff'
      }
    }
  ]
})

const Post = () => {
  const [response, setResponse] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [commentContent, setCommentContent] = React.useState("");
  const { postId } = useParams();

  const createComment = () => {
    fetch(`https://techcircuit.herokuapp.com/forum/comment/new?access_token=${authToken}`, {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          comment: commentContent,
          post_id: postId
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }
    ).then(async(response) => {
      let res = await response.json()
      console.log(res)
      if(res.success === true) {
        notyf.open({
          type: 'success',
          message: 'Comment posted successfully.'
        });
        window.location.reload()
      } else {
        notyf.open({
          type: 'error',
          message: res.error
        })
      }
    })
  }

  React.useEffect(() => {
    fetch(`https://techcircuit.herokuapp.com/forum/post/${postId}?access_token=${authToken}`)
    .then(async(res) => {
        let resp = await res.json()
        console.log(resp)
        if (resp.success === true) {
          setResponse(resp)
          setComments(resp.comments)
        }
    })
  }, [postId])

  return (
    <React.Fragment>
      <div className="container fullForumCont">
        <div className="forumCards fullForumCards">
          <Link className="back" to="/forum">
            <FaChevronLeft />
            Back
          </Link>
          <div className="forumCard fullForumCard">
            <h2>
              {response.title}
            </h2>
            <h3>
              posted <TimeAgo date={response.date}/> by <a href="/">{response.author}</a>
            </h3>
            <div dangerouslySetInnerHTML={{__html: response.content}} className="post-content">
            </div>
            <br></br><br></br>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; Reply
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button>
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaArrowUp />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="forumCard comment-card">
          <h2>
            Comments({comments.length}) &nbsp;
            <FaCommentAlt />
          </h2>
          <div className="add-comment">
              <div className="add-comm-top">
                <img src="/assets/accounticon.png" alt="alt" />
                <textarea
                  name="comment"
                  placeholder="What do you think about this post..."
                  onChange={(event) => setCommentContent(event.target.value)}
                ></textarea>
              </div>
              <div className="comment-btns">
                {/* <button className="btn com-cancel">Cancel</button> */}
                <button className="btn com-create" onClick={() => createComment()}>Post Comment</button>
              </div>
          </div>
          {comments.map((comment, index) => (
            <div className="comment">
            <a href="/" className="comm-icon">
              <img src={comment.author_pfp_url} alt="alt" />
            </a>
            <div className="comm-content">
              <div className="details">
                <a href="/">{comment.author_username}</a>
                <p className="on"><TimeAgo date={comment.date}/></p>
              </div>
              <p className="comm-body">
                {comment.comment}
              </p>
              <div className="card-options">
                <div className="l-opts">
                  <button>
                    <FaShareAlt />
                    &nbsp; Share
                  </button>
                  <button>
                    <FaBookmark />
                    &nbsp; Save
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
