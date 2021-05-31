import React from "react";
import "../forums.css";
import { FaCommentAlt } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

const FullForum = () => {
  return (
    <React.Fragment>
      <div className="container fullForumCont">
        <div className="forumCards">
          <div className="forumCard fullForumCard">
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ullamcorper ultricies elit rhoncus, justo eget.
            </h2>
            <h3>
              posted 25 mins ago by <a href="/">samvrart</a> on designathon
            </h3>
            <img src="/assets/sample-banner.jpg" alt="forum-banner" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Condimentum aliquam sagittis fermentum, quis cras. Adipiscing
              viverra cras dignissim felis pharetra morbi. At fermentum feugiat
              justo ullamcorper. Eu morbi amet pellentesque metus, id odio
              semper. Ipsum orci ullamcorper purus morbi. Augue nulla pharetra
              ut tempus, vulputate elementum. Augue consequat eget massa sed mi
              mi in at pellentesque. Scelerisque ut eu enim urna lacinia massa
              aenean ultrices. Nunc potenti at vitae volutpat, vitae at enim
              lorem id. Rutrum suspendisse pretium massa lorem ullamcorper
              malesuada neque, nunc gravida. Purus leo, rhoncus, scelerisque
              enim elit donec odio in dictum. Vel ut amet dignissim mauris
              facilisi massa. Egestas auctor laoreet dui, eleifend. Sit sagittis
              scelerisque nisi, malesuada hendrerit nec, imperdiet eu sed.
              Interdum sed porttitor nisi, vivamus at tortor cursus. Condimentum
              facilisis enim ipsum vivamus vestibulum posuere interdum. Proin
              fames ornare duis.
            </p>
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
            Comments(42) &nbsp;
            <FaCommentAlt />
          </h2>
          <div className="add-comment">
            <form>
              <div className="add-comm-top">
                <img src="/assets/accounticon.png" alt="" />
                <textarea
                  name="comment"
                  placeholder="What do you think about this post..."
                ></textarea>
              </div>
              <div className="comment-btns">
                <button className="btn com-cancel">Cancel</button>
                <button className="btn com-create">Post Comment</button>
              </div>
            </form>
          </div>
          <div className="comment">
            <a href="/" className="comm-icon">
              <img src="/assets/accounticon.png" alt="" />
            </a>
            <div className="comm-content">
              <div className="details">
                <a href="/">Samvrant Samantaray</a>
                <p className="on">20 mins ago</p>
              </div>
              <p className="comm-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                consequat bibendum est faucibus hendrerit nibh. Eget rhoncus
                ultricies ultrices lorem tempor massa cursus. Quis et tempor
                lacus etiam magnis nisi nunc rhoncus sed. Sed purus odio vel
                lectus aliquet ut ut. Porttitor mattis sit arcu tempor. Amet leo
                eget urna ac est purus posuere. Proin rhoncus, risus sed amet,
                feugiat molestie nisi, magna aliquam. Et nam ut.
              </p>
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
                    <FaExclamationTriangle />
                    &nbsp; Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <a href="/" className="comm-icon">
              <img src="/assets/accounticon.png" alt="" />
            </a>
            <div className="comm-content">
              <div className="details">
                <a href="/">Samvrant Samantaray</a>
                <p className="on">20 mins ago</p>
              </div>
              <p className="comm-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                consequat bibendum est faucibus hendrerit nibh. Eget rhoncus
                ultricies ultrices lorem tempor massa cursus. Quis et tempor
                lacus etiam magnis nisi nunc rhoncus sed. Sed purus odio vel
                lectus aliquet ut ut. Porttitor mattis sit arcu tempor. Amet leo
                eget urna ac est purus posuere. Proin rhoncus, risus sed amet,
                feugiat molestie nisi, magna aliquam. Et nam ut.
              </p>
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
                    <FaExclamationTriangle />
                    &nbsp; Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <a href="/" className="comm-icon">
              <img src="/assets/accounticon.png" alt="" />
            </a>
            <div className="comm-content">
              <div className="details">
                <a href="/">Samvrant Samantaray</a>
                <p className="on">20 mins ago</p>
              </div>
              <p className="comm-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                consequat bibendum est faucibus hendrerit nibh. Eget rhoncus
                ultricies ultrices lorem tempor massa cursus. Quis et tempor
                lacus etiam magnis nisi nunc rhoncus sed. Sed purus odio vel
                lectus aliquet ut ut. Porttitor mattis sit arcu tempor. Amet leo
                eget urna ac est purus posuere. Proin rhoncus, risus sed amet,
                feugiat molestie nisi, magna aliquam. Et nam ut.
              </p>
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
                    <FaExclamationTriangle />
                    &nbsp; Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FullForum;
