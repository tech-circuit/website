import "../styles/work.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
// import OwlCarousel from "react-owl-carousel2";
import BASE_API_URL from "../constants";
import ProjectCard from "./utility/ProjectCard";
import notyf from "../tcNotyf";
import WorkCarousel from "./utility/WorkCarousel";
import FullProject from "./utility/FullProject";

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
                        return <ProjectCard project={project} view={view} />;
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
                    {projects.map((project) => {
                        return <ProjectCard project={project} view={view} />;
                    })}
                </div>
            </section>

            <section
                className={fullView ? "fullEvent fullEventActive" : "fullEvent"}
            >
                <FullProject close={close} />
            </section>
        </>
    );

    // function sortWork(eve) {
    //   setWorkSort(eve.target.textContent);
    // }
};

export default Work;
