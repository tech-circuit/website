import React from "react";
import "../forums.css";
import { FaPlus } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const Forums = () => {
  return (
    <React.Fragment>
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
              <img src="/assets/magnifying-glass.svg" alt="" />
              <input
                type="text"
                placeholder="Search communities, posts, intrests..."
              />
            </div>
            <h3 className="add">
              <FaPlus />
              New Post
            </h3>
          </div>
          <div className="sort-box">
            <h3>Sort By</h3>
            <div className="sort-opts">
              <h3 className="sort-opt sort-opt-active">Popular</h3>
              <h3 className="sort-opt">Trending</h3>
              <h3 className="sort-opt">Hot</h3>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="forumCards">
          <a href="/full-forum" className="forumCard">
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ullamcorper ultricies elit rhoncus, justo eget.
            </h2>
            <h3>
              posted 25 mins ago by <a href="/">samvrart</a> on designathon
            </h3>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 comments
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
          </a>
          <a href="/full-forum" className="forumCard">
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ullamcorper ultricies elit rhoncus, justo eget.
            </h2>
            <h3>
              posted 25 mins ago by <a href="/">samvrart</a> on designathon
            </h3>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 comments
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
          </a>
          <a href="/full-forum" className="forumCard">
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ullamcorper ultricies elit rhoncus, justo eget.
            </h2>
            <h3>
              posted 25 mins ago by <a href="/">samvrart</a> on designathon
            </h3>
            <div className="card-options">
              <div className="l-opts">
                <button>
                  <FaCommentAlt />
                  &nbsp; 12 comments
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
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forums;
