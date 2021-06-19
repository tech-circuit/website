import React from "react";
import "../forum.css";
import { FaExclamationTriangle } from "react-icons/fa";
import Modal from "react-modal";
import ReactModal from "react-modal";
import TextBox from "./TextBox";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import TimeAgo from 'react-timeago';

ReactModal.defaultStyles = {};
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

const Forums = () => {
  document.getElementsByTagName('html')[0].style.scrollBehavior = 'initial'
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [drafts, setDrafts] = React.useState("0");
  const [content, setContent] = React.useState("");

  const openModal = () => {
    document.getElementsByClassName("head-2")[0].style.zIndex = 0;
    document.getElementsByTagName("nav")[0].style.zIndex = 0;
    setIsOpen(true);
  };

  const closeModal = () => {
    notyf.dismissAll()
    setIsOpen(false);
    document.getElementsByClassName("head-2")[0].style.zIndex = 999;
    document.getElementsByTagName("nav")[0].style.zIndex = 9999;
  };

  const createPost = (isDraft) => {
    if (title.trim().length !== 0) {
      if (content.trim().length !== 0) {
        console.log("Title:", title);
        console.log("Content", content);
        const authToken = localStorage.getItem("authToken");
        console.log(authToken);
        let successMessage = "Posted successfully!"
        let errorMessage = "Could not post"
        if (isDraft) {
          successMessage = "Draft saved"
          errorMessage = "Could not save draft"
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
                reFetch()
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

  const setThumbnail = (posts) => {
    posts.forEach((p) => {
      const content = p.content
      try {
        const imgURL = content.split('src="')[1].split('"')[0]
        p.thumbnail = imgURL
      } catch (error) {
        p.thumbnail = undefined
      }
    })
    return posts
  }

  const getContent = (content) => {
    console.log(content)
    setContent(content)
  }

  const postAction = (action, postID) => {
    fetch(`https://techcircuit.herokuapp.com/forum/${action}/${postID}?access_token=${authToken}`, { method: "POST" })
    .then(async(response) => {
      let resp = await response.json()
      if(resp.success === true) {
        if(action === "save" || action === "unsave") {
          notyf.open({
            type: 'success',
            message: `Post ${action}d`
          });
        }
        reFetch()
      } else {
        notyf.open({
          type: 'error',
          message: `Could not ${action} post`
        })
      }
    })
  }

  const reFetch = () => {
    fetch(`https://techcircuit.herokuapp.com/forum/?page=1&sort=latest&access_token=${authToken}`)
    .then(async(response) => {
        let resp = await response.json()
        if (resp.success === true) {
          console.log(resp.authenticated)
          const updatedPosts = setThumbnail(resp.posts)
          console.log(updatedPosts)
          setPosts(updatedPosts)
          setDrafts(resp.drafts)
        }  
    })
  }

  React.useEffect(() => {
    fetch(`https://techcircuit.herokuapp.com/forum/?page=1&sort=latest&access_token=${authToken}`)
    .then(async(response) => {
        let resp = await response.json()
        if (resp.success === true) {
          console.log(resp.authenticated)
          const updatedPosts = setThumbnail(resp.posts)
          console.log(updatedPosts)
          setPosts(updatedPosts)
          setDrafts(resp.drafts)
        }  
    })
  }, [])

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
            <h2>Drafts({drafts})</h2>
          </div>
          <div className="input-fields">
            <h3>Title</h3>
            <input
              className="title"
              type="text"
              placeholder="Enter title"
              onChange={(event) => setTitle(event.target.value)}
            ></input>
            <TextBox handleContentChange={getContent}/>
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
              <img src="/assets/post-add.svg" alt="post-add-icon"/>
              Create new post
            </h3>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="forumCards">
          {posts.map((post, index)=> (
            <div className="forumCard">
            <a href={`forum/post/${post.id}`} className="card-top">
                <div className="l-card-top">
                  <h2>
                    {post.title}
                  </h2>
                  <h3>
                    posted <TimeAgo date={post.date}/> by <a href="/">{post.author}</a>
                  </h3>
                </div>
                <div className="r-card-top">
                  {post.thumbnail === undefined ? <></> : 
                    <img src={post.thumbnail} alt="post-thumbnail" className="post-thumbnail"/>
                  }
                </div>
            </a>
            <div className="card-options">
              <div className="l-opts">
                <a href={`forum/post/${post.id}/#comments`}>
                  <button>
                      <img src="/assets/comments.svg" alt="comments-icon"/>
                      &nbsp; {post.comments} comments
                  </button>
                </a>
                <button>
                  <img src="/assets/share.svg" alt="share-icon" className="inactive-share"/>
                  <span className="inactive-share-text">&nbsp; Share</span>
                </button>
                <button className="card-opt-done">
                  {post.is_saved ? 
                    <>
                      <img src="/assets/active-save.svg" alt="save-icon-active" onClick={() => postAction("unsave", post.id)}/>
                      <span style={{ color: '#29313D' }}>&nbsp; Saved</span>
                    </>
                    :
                    <>
                      <img src="/assets/inactive-save.svg" alt="save-icon-inactive" onClick={() => postAction("save", post.id)} className="inactive-save"/>
                      <span className="inactive-save-text">&nbsp; Save</span>
                    </>
                  }
                  
                </button>
                <button>
                  {post.is_upvoted ? 
                    <>
                      <img src="/assets/active-upvote.svg" alt="upvote-icon-active" onClick={() => postAction("unupvote", post.id)}/>
                      <span style={{ color: '#29313D' }}>&nbsp; Upvoted</span>
                    </>
                    :
                    <>
                      <img src="/assets/inactive-upvote.svg" alt="upvote-icon-inactive" onClick={() => postAction("upvote", post.id)} className="inactive-upvote"/>
                      <span className="inactive-upvote-text">&nbsp; Upvote</span>
                    </>
                  }
                  
                </button>
              </div>
              <div className="r-opts">
                <button>
                  <FaExclamationTriangle />
                  <span className="report-text">&nbsp; Report</span>
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forums;
