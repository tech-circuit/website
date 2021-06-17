import React from "react";
import "../forums.css";
import { FaPlus } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Modal from "react-modal";
import ReactModal from "react-modal";
import TextBox from "./TextBox";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

ReactModal.defaultStyles = {};

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

const Forums = () => {
  document.getElementsByTagName('html')[0].style.scrollBehavior = 'initial'
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const openModal = () => {
    document.getElementsByClassName("head-2")[0].style.zIndex = 0;
    document.getElementsByTagName("nav")[0].style.zIndex = 0;
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    document.getElementsByClassName("head-2")[0].style.zIndex = 999;
    document.getElementsByTagName("nav")[0].style.zIndex = 9999;
  };

  const createPost = (isDraft) => {
    if (title.trim().length !== 0) {
      const content = localStorage.getItem("content");
      if (content.trim().length !== 0) {
        console.log("Title:", title);
        console.log("Content", content);
        const authToken = localStorage.getItem("authToken");
        console.log(authToken);
        let successMessage = "Posted successfully!"
        let errorMessage = "Could not post"
        if (isDraft) {
          successMessage = "Draft saved successfully!"
          errorMessage = "Could not save"
        }
        fetch(
          `https://techcircuit.herokuapp.com/forum/new?access_token=${authToken}`,
          {
            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
              title,
              content,
              is_draft: isDraft
            }),

            // Adding headers to the request
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then(async(response) => {
            closeModal()
            if(response.status === 200) {
              const resp = await response.json();
              console.log(resp.success)
              if(resp.success) {
                notyf.open({
                  type: 'success',
                  message: successMessage
                });
              } else {
                notyf.open({
                  type: 'error',
                  message: errorMessage
                });
              }
            } else {
              console.log(response.status)
              console.log(response)
              notyf.open({
                type: 'error',
                message: errorMessage
              });
            }
        })
        .catch(error => {
            console.log(error)
            closeModal()
            notyf.open({
              type: 'error',
              message: errorMessage
            });
        });
      }
    }
  };

  return (
    <React.Fragment>
      {/* modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="modal-content">
          <div className="header">
            <div className="left">
              <h1>Create Post</h1>
              <p>Share what’s on your mind with the community!</p>
            </div>
            <h2>Drafts(42)</h2>
          </div>
          <div className="input-fields">
            <h3>Title</h3>
            <input
              className="title"
              type="text"
              placeholder="Enter title"
              onChange={(event) => setTitle(event.target.value)}
            ></input>
            <TextBox />
          </div>
          <div className="buttons">
            <button className="create-post" onClick={() => createPost(false)}>
              Create Post
            </button>
            <button className="save-draft" onClick={() => createPost(true)}>Save Draft</button>
          </div>
        </div>
      </Modal>
      <header className="forumHeader head-1">
        <div className="container">
          <h1 className="forumTitle">
            <strong>techCircuit</strong> discussion forum
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </header>
      <header className="forumHeader head-2">
        <div className="container">
          <div className="search-box">
            <div className="input">
              <img src="/assets/magnifying-glass.svg" alt="alt" />
              <input
                type="text"
                placeholder="Search communities, posts, interests..."
              />
            </div>
            <button className="sortBtn">
              Sort by: <span id="sortVal">Latest</span>
              <div className="sortOpts">
                <button className="sortOpt">Recommended</button>
              </div>
            </button>
            <h3 className="add" onClick={openModal}>
              <FaPlus />
              New Post
            </h3>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="forumCards">
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
          <div className="forumCard">
            <a href="/full-forum" className="card-top">
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ullamcorper ultricies elit rhoncus, justo eget.
              </h2>
              <h3>
                posted 25 mins ago by <a href="/">samvrart</a> on designathon
              </h3>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 replies
                </button>
                <button>
                  <FaShareAlt />
                  &nbsp; Share
                </button>
                <button className="card-opt-done">
                  <FaBookmark />
                  &nbsp; Save
                </button>
                <button>
                  <FaArrowUp />
                  &nbsp; Upvote
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  &nbsp; Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forums;
