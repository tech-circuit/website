import React from "react";
import "../styles/forum.css";
import {
    FaExclamationTriangle,
    FaTwitterSquare,
    FaFacebookSquare,
    FaLink,
    FaChevronRight,
    FaChevronLeft,
} from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Modal from "react-modal";
import ReactModal from "react-modal";
import TextBox from "./TextBox";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import TimeAgo from "react-timeago";
import { ClipLoader } from "react-spinners";

ReactModal.defaultStyles = {};
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

const Forums = () => {
    let currentPage = 1;
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [posts, setPosts] = React.useState([]);
    const [content, setContent] = React.useState("");
    const [totalPages, setTotalPages] = React.useState(0);
    const [pages, setPages] = React.useState([]);
    const [pageSelected, setPageSelected] = React.useState(1);
    const [report, setReport] = React.useState("none");
    const [reportPost, setReportPost] = React.useState("none");
    const [sorts, setSorts] = React.useState(["Latest", "Hottest", "Popular"]);
    const [currentSort, setCurrentSort] = React.useState("latest");
    const [doSearch, setDoSearch] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const setCurrentPage = (page) => {
        console.log(totalPages);
        console.log(page);
        if (page === "next") {
            if (pages[pages.length - 1] < totalPages) {
                currentPage = pages[pages.length - 1] + 1;
                setPageSelected(page);
                let newPages = [];
                let limit = 6;
                if (currentPage + limit > totalPages) {
                    limit = totalPages - currentPage;
                }
                for (let i = 0; i < limit; i++) {
                    newPages.push(currentPage + i);
                }
                console.log(newPages);
                setPages(newPages);
                reFetch();
            }
        } else if (page === "prev") {
            if (currentPage > 1) {
                currentPage = pages[0] - 1;
                setPageSelected(page);
                let newPages = [];
                for (let i = 5; i > -1; i--) {
                    newPages.push(currentPage - i);
                }
                console.log(newPages);
                setPages(newPages);
                reFetch();
            }
        } else {
            currentPage = page;
            setPageSelected(page);
            reFetch();
        }
    };

    const openModal = () => {
        document.getElementsByClassName("head-2")[0].style.zIndex = 0;
        document.getElementsByTagName("nav")[0].style.zIndex = 0;
        setIsOpen(true);
    };

    const closeModal = () => {
        notyf.dismissAll();
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
                let successMessage = "Posted successfully!";
                let errorMessage = "Could not post";
                if (isDraft) {
                    successMessage = "Draft saved";
                    errorMessage = "Could not save draft";
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
                            is_draft: isDraft,
                        }),

                        // Adding headers to the request
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }
                )
                    .then(async (response) => {
                        closeModal();
                        if (response.status === 200) {
                            const resp = await response.json();
                            console.log(resp.success);
                            if (resp.success) {
                                notyf.open({
                                    type: "success",
                                    message: successMessage,
                                });
                                reFetch();
                            } else {
                                notyf.open({
                                    type: "error",
                                    message: errorMessage,
                                });
                            }
                        } else {
                            console.log(response.status);
                            console.log(response);
                            notyf.open({
                                type: "error",
                                message: errorMessage,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        closeModal();
                        notyf.open({
                            type: "error",
                            message: errorMessage,
                        });
                    });
            }
        }
    };

    const setThumbnail = (posts) => {
        posts.forEach((p) => {
            const content = p.content;
            try {
                const imgURL = content.split('src="')[1].split('"')[0];
                p.thumbnail = imgURL;
            } catch (error) {
                p.thumbnail = undefined;
            }
        });
        return posts;
    };

    const getContent = (content) => {
        console.log(content);
        setContent(content);
    };

    const postAction = (action, postID) => {
        fetch(
            `https://techcircuit.herokuapp.com/forum/${action}/${postID}?access_token=${authToken}`,
            { method: "POST" }
        ).then(async (response) => {
            let resp = await response.json();
            if (resp.success === true) {
                reFetch(true);
            } else {
                console.log(resp);
                notyf.open({
                    type: "error",
                    message: `Could not ${action} post`,
                });
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

    const reFetch = (upv) => {
        let upvoteFetch = upv || false;
        if (!upvoteFetch) window.scrollTo(0, 0);
        let url = `https://techcircuit.herokuapp.com/forum?page=${currentPage}&sort=${currentSort}&access_token=${authToken}`;
        if (doSearch) {
            url = `https://techcircuit.herokuapp.com/forum/search?q=${searchQuery}&page=${currentPage}&access_token=${authToken}`;
        }
        fetch(url).then(async (response) => {
            let resp = await response.json();
            if (resp.success === true) {
                console.log(resp.authenticated);
                const updatedPosts = setThumbnail(resp.posts);
                console.log(updatedPosts);
                setPosts(updatedPosts);
            }
        });
    };

    React.useEffect(() => {
        console.log("fetch call");
        let url = `https://techcircuit.herokuapp.com/forum?page=1&sort=${currentSort}&access_token=${authToken}`;
        if (doSearch) {
            url = `https://techcircuit.herokuapp.com/forum/search?q=${searchQuery}&page=${currentPage}&access_token=${authToken}`;
        }
        fetch(url).then(async (response) => {
            console.log("got smth");
            let resp = await response.json();
            if (resp.success === true) {
                console.log(resp.authenticated);
                const updatedPosts = setThumbnail(resp.posts);
                console.log(updatedPosts);
                document.querySelector(".css-q3o1l2")
                    ? document.querySelector(".css-q3o1l2").remove()
                    : console.log("none");
                setPosts(updatedPosts);
                setTotalPages(resp.total_pages);
            }
        });
    }, [currentSort, currentPage, doSearch, searchQuery]);

    const toggleSort = (e) => {
        let classListToUpdate =
            document.getElementById("sort-modal-div").classList;
        if (classListToUpdate.length === 2) {
            document
                .getElementById("sort-modal-div")
                .classList.remove("sort-modal-active");
        } else if (classListToUpdate.length === 1) {
            document
                .getElementById("sort-modal-div")
                .classList.add("sort-modal");
            document
                .getElementById("sort-modal-div")
                .classList.add("sort-modal-active");
        }
    };

    React.useEffect(() => {
        if (currentPage === 1) {
            let initialPages = [];
            let limit = 6;
            if (totalPages < limit) {
                limit = totalPages;
            }
            for (let i = 1; i < limit + 1; i++) {
                initialPages.push(i);
            }
            setPages(initialPages);
        }
    }, [totalPages, currentPage]);

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
                    </div>
                    <div className="input-fields">
                        <label>Title</label>
                        <input
                            className="title"
                            type="text"
                            placeholder="Enter title"
                            onChange={(event) => setTitle(event.target.value)}
                        ></input>
                        <TextBox handleContentChange={getContent} />
                    </div>
                    <div className="buttons">
                        <button
                            className="create-post"
                            onClick={() => createPost(false)}
                        >
                            Create Post
                        </button>
                    </div>
                </div>
            </Modal>
            <header className="forumHeader head-1">
                <div className="container">
                    <h1 className="forumTitle">
                        <strong>techCircuit</strong> discussion forum
                    </h1>
                    {/* <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p> */}
                </div>
            </header>
            <header className="forumHeader head-2">
                <div className="container forum-search-cont">
                    <div className="search-box">
                        <div className="search-box-left">
                            <div className="input">
                                <img
                                    src="/assets/magnifying-glass.svg"
                                    alt="alt"
                                />
                                <input
                                    type="text"
                                    placeholder="Search communities, posts, interests..."
                                    onKeyUp={(event) => {
                                        let value = event.target.value;
                                        if (value.trim().length === 0) {
                                            setDoSearch(false);
                                            setSearchQuery("");
                                        } else {
                                            setDoSearch(true);
                                            setSearchQuery(event.target.value);
                                        }
                                    }}
                                />
                            </div>
                            {sorts.map((sort, index) => {
                                return index === 0 ? (
                                    <button
                                        className="sortBtn"
                                        onClick={(e) => toggleSort(e)}
                                    >
                                        Sort by:{" "}
                                        <span id="sortVal">{sort}</span>
                                    </button>
                                ) : null;
                            })}
                            <div className="sort-modal" id="sort-modal-div">
                                {sorts.map((sort, index) => {
                                    return index === 0 ? null : (
                                        <button
                                            onClick={() => {
                                                setCurrentSort(
                                                    sort.toLowerCase()
                                                );
                                                let oldIndex =
                                                    sorts.indexOf(sort);
                                                let newArrayWithCurrentSort =
                                                    sorts
                                                        .slice(0, oldIndex)
                                                        .concat(
                                                            sorts.slice(
                                                                oldIndex + 1
                                                            )
                                                        );
                                                setSorts([
                                                    sorts[oldIndex],
                                                    ...newArrayWithCurrentSort,
                                                ]);
                                                toggleSort();
                                            }}
                                        >
                                            {sort}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <h3 className="add" onClick={openModal}>
                            <img
                                src="/assets/post-add.svg"
                                alt="post-add-icon"
                            />
                            Create new post
                        </h3>
                    </div>
                </div>
            </header>

            <div className="container forumCardHold">
                <div className="forumCards">
                    <ClipLoader />
                    {posts.map((post, index) => (
                        <div className="forumCard">
                            <a
                                href={`forum/post/${post.id}`}
                                className="card-top"
                            >
                                <div className="l-card-top">
                                    <h2>{post.title}</h2>
                                    <h3>
                                        posted <TimeAgo date={post.date} /> by{" "}
                                        <a href="/">{post.author}</a>
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
                                        <img
                                            src="/assets/share.svg"
                                            alt="share-icon"
                                        />
                                        <span
                                            onClick={(e) => {
                                                if (
                                                    document.querySelector(
                                                        ".share-opts-active"
                                                    ) !==
                                                    e.target.nextElementSibling
                                                ) {
                                                    document.querySelector(
                                                        ".share-opts-active"
                                                    )
                                                        ? document
                                                              .querySelector(
                                                                  ".share-opts-active"
                                                              )
                                                              .classList.remove(
                                                                  "share-opts-active"
                                                              )
                                                        : nullFunc();
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
                                                    children={
                                                        <FaTwitterSquare />
                                                    }
                                                    url={`${
                                                        window.location
                                                            .protocol +
                                                        "//" +
                                                        window.location.host
                                                    }/forum/post/${post.id}`}
                                                />
                                            </a>
                                            <a className="share-opt" href="/">
                                                <FacebookShareButton
                                                    children={
                                                        <FaFacebookSquare />
                                                    }
                                                    url={`${
                                                        window.location
                                                            .protocol +
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
                                                            window.location
                                                                .protocol +
                                                            "//" +
                                                            window.location.host
                                                        }/forum/post/${post.id}`
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
                                    <button className="inactive-btn">
                                        {post.is_upvoted ? (
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
                                                            post.id
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
                                                            post.id
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
                                                            post.id
                                                        )
                                                    }
                                                />
                                                <span
                                                    onClick={() =>
                                                        postAction(
                                                            "upvote",
                                                            post.id
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
                                        onClick={(eve) => reportBtn(post.id)}
                                    >
                                        <FaExclamationTriangle />
                                        <span className="report-text">
                                            &nbsp; Report
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="pages">
                        {totalPages > 6 ? (
                            <FaChevronLeft
                                id="page-prev"
                                onClick={() => setCurrentPage("prev")}
                            />
                        ) : null}
                        {pages.map((page, index) => {
                            return (
                                <button
                                    key={index}
                                    className={
                                        page === pageSelected
                                            ? "page page-active"
                                            : "page"
                                    }
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        {totalPages > 6 ? (
                            <FaChevronRight
                                id="page-next"
                                onClick={() => setCurrentPage("next")}
                            />
                        ) : null}
                    </div>
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

            {/* FILTER UI -------------------------------------------------------------------------------------------------------------------------- */}
            {/* <div className="filter-modal">
                <h1>
                    Forum Categories
                    <button id="forum-filter-clear">Clear All</button>
                </h1>
                <div className="categs">
                    <button className="categ categ-active">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ categ-active">Hackathons</button>

                    <button className="categ categ-active">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ categ-active">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>

                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                    <button className="categ">Hackathons</button>
                </div>
                <div className="forum-filter-control">
                    <button id="apply">APPLY</button>
                    <button id="close-filter">Close</button>
                </div>
            </div> */}
        </React.Fragment>
    );

    // SAMPLE FUNCTION FOR BACKEND DEVS
    function the(eve) {
        document
            .querySelector(".report-submit")
            .classList.add("report-submit-proceed");
        console.log(eve.target.value);
        setReport(eve.target.value);
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

    function nullFunc() {
        return;
    }
};

export default Forums;
