import "../styles/work.css";
import {
    FaChevronLeft,
    FaChevronRight,
    FaShareAlt,
    FaBehance,
    FaCaretDown,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
// import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";
import BASE_API_URL from "../constants";
import ProjectCard from "./utility/ProjectCard"
import { Notyf } from "notyf";
import WorkCarousel from "./utility/WorkCarousel";

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

const Work = () => {
    // const [workSort, setWorkSort] = useState("Coding");
    const [sortHover, setSortHover] = useState(false);
    const [projects, setProjects] = useState([]);
    const sortRef = useRef("sort");
    const [fullView, setfullView] = useState(false);

    const view = () => {
        setfullView(true);
    };

    const close = () => {
        setfullView(false);
    };

    const getProjects = async () => {
        const dataJson = await fetch(`${BASE_API_URL}/project`);
        const data = await dataJson.json();

        if (data.projects) {
            setProjects(data.projects);
        } else {
            notyf.error("Some Error occurred");
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
            <div
                className={
                    fullView ? "event-cover event-cover-active" : "event-cover"
                }
                onClick={close}
            ></div>
            <header className="forumHeader head-1">
                <div className="container">
                    <h1 className="forumTitle workTitle">
                        Projects across multiple fields in tech done by
                        the&nbsp;
                        <strong>techCircuit</strong>&nbsp;Community!
                    </h1>
                    <div className="carHold">
                        <button
                            id="carPrev"
                            onClick={() => sortRef.current.prev()}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            id="carNext"
                            onClick={() => sortRef.current.next()}
                        >
                            <FaChevronRight />
                        </button>
                        <WorkCarousel />
                    </div>
                </div>
            </header>
            <header className="head-2 eventHead container eventHead2 workHead">
                <div className="eventSearch">
                    <div className="input">
                        <img src="/assets/magnifying-glass.svg" alt="alt" />
                        <input type="text" placeholder="Search" />
                    </div>
                    <button
                        onMouseEnter={() => setSortHover(true)}
                        onMouseLeave={() => setSortHover(false)}
                        className="eventFilter"
                    >
                        <img
                            style={
                                sortHover
                                    ? { display: "inline" }
                                    : { display: "none" }
                            }
                            src="/assets/filter2.svg"
                            alt="alt"
                        />
                        <img
                            style={
                                sortHover
                                    ? { display: "none" }
                                    : { display: "inline" }
                            }
                            src="/assets/filter.svg"
                            alt="alt"
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;Filter Categories
                    </button>
                </div>
                <div className="addEvent">
                    <a href="/create-project">
                        <img src="/assets/plus.svg" alt="alt" />
                        &nbsp;&nbsp;Create Project
                    </a>
                </div>
            </header>

            <section className="projects container firstProjSec">
                <h1>
                    Popular & Trending&nbsp;<a href="/">View All</a>
                </h1>
                <div className="workCards">
                    {projects.map((project) => {
                        return (
                            <div
                                onClick={view}
                                key={project._id}
                                to={`/edit-project/${project._id}`}
                                className="workCard"
                            >
                                <img
                                    src={project.cover_image}
                                    alt="project img"
                                />
                                <h2>{project.title}</h2>
                                <h3>{project.collaborators}</h3>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="projects container">
                <h1>
                    C0D1NG5&nbsp;<a href="/">View All</a>
                </h1>
                {/* <div className="workSort">
                    <button
                        className={
                            workSort === "Coding" ? "workSortActive" : ""
                        }
                        onClick={(e) => sortWork(e)}
                    >
                        Coding
                    </button>
                    <button
                        className={workSort === "UI" ? "workSortActive" : ""}
                        onClick={(e) => sortWork(e)}
                    >
                        UI
                    </button>
                    <button
                        className={
                            workSort === "Design" ? "workSortActive" : ""
                        }
                        onClick={(e) => sortWork(e)}
                    >
                        Design
                    </button>
                    <button
                        className={workSort === "MOm" ? "workSortActive" : ""}
                        onClick={(e) => sortWork(e)}
                    >
                        MOm
                    </button>
                    <button
                        className={workSort === "Dard" ? "workSortActive" : ""}
                        onClick={(e) => sortWork(e)}
                    >
                        Dard
                    </button>
                    <button
                        className={
                            workSort === "Dasness" ? "workSortActive" : ""
                        }
                        onClick={(e) => sortWork(e)}
                    >
                        Dasness
                    </button>
                </div> */}
                <div className="workCards">                    
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => {
                    return <ProjectCard />;
                })}
                </div>
            </section>

            <section
                className={fullView ? "fullEvent fullEventActive" : "fullEvent"}
            >
                <div className="proj-top">
                    <button className="return" onClick={close}>
                        <FaChevronLeft />
                        &nbsp;&nbsp;Back
                    </button>
                    <div className="share-wrap">
                        <FaShareAlt />
                        <a className="share" href="/">
                            Share
                        </a>
                    </div>
                </div>

                <img
                    src="/assets/sample-banner.jpg"
                    alt="alt"
                    className="fullProjectBanneri"
                />

                <div className="projectOrg">
                    <div>
                        <h1>Axus Gaming- Brand Identity Study</h1>
                        <h3>
                            <Link to="/"> Ishaan Das, </Link>
                            <Link to="/"> Ribhav Sharma</Link>
                        </h3>
                    </div>
                    <button className="view-proj">View Project</button>
                </div>

                <div className="eventAddInfo">
                    <div className="fullProjectUnit fullProjectUnitOrg">
                        <h4>Fields</h4>
                        <p class="pFields">
                            UI/UX, Game Design, Branding, Chess
                        </p>
                    </div>
                    <div className="fullProjectUnit fullProjectUnitOrg">
                        <h4>Project Tags</h4>
                        <p class="tags">UI/UX, Design, Branding</p>
                    </div>
                </div>

                <div className="fullProjectUnit">
                    <h4>View it on</h4>
                    <FaBehance />
                </div>

                <div className="fullProjectUnit">
                    <h4>About</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam turpis diam enim odio. Faucibus sagittis, non
                        enim nibh. Diam consectetur maecenas varius nibh at.
                        Porttitor nunc nascetur ultricies vulputate. Egestas at
                        egestas ut mi lectus morbi nam lacus viverra. Sed purus
                        praesent viverra posuere ridiculus tempor. Enim
                        habitasse dictum tristique duis ac sagittis viverra.
                    </p>
                </div>

                <div className="fullProjectUnit">
                    <h4>For Event</h4>
                    <Link to="/" className="projectEvent">
                        Tech Syndicate: Intech'21 (2021)
                    </Link>
                </div>

                <div className="fullProjectUnit">
                    <h4>Comments (42)</h4>
                    <textarea
                        name="comments"
                        autoComplete="off"
                        className="comment-text"
                        placeholder="Post some critique or review regarding their work!"
                    ></textarea>
                    <div className="fullProjectButtons">
                        <button className="post-pcomment-btn">
                            Post Comment
                        </button>
                        <button className="post-pcancel-btn">Cancel</button>
                    </div>
                </div>

                <div className="proj-com-cont">
                    <div className="proj-com-card">
                        <img src="/assets/samvr.jpeg" alt="alt" />
                        <div className="proj-com-text">
                            <h4>Samvrant Samanstrueya</h4>
                            <p>Wonderful project loved it woah woah woah</p>
                        </div>
                    </div>
                    <div className="proj-com-card">
                        <img src="/assets/samvr.jpeg" alt="alt" />
                        <div className="proj-com-text">
                            <h4>Ishaan Das</h4>
                            <p>Wonderful project loved it woah woah woah</p>
                        </div>
                    </div>
                    <div className="proj-com-card">
                        <img src="/assets/samvr.jpeg" alt="alt" />
                        <div className="proj-com-text">
                            <h4>Laxya pahuja</h4>
                            <p>Wonderful project loved it woah woah woah</p>
                        </div>
                    </div>
                    <div className="more-com-wrap">
                        <p className="more-com">More Comments</p>
                        <FaCaretDown className="caret-down" />
                    </div>
                </div>
            </section>
        </>
    );

    // function sortWork(eve) {
    //   setWorkSort(eve.target.textContent);
    // }
};

export default Work;
