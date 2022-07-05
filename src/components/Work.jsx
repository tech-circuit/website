import "../styles/work.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
// import OwlCarousel from "react-owl-carousel2";
import BASE_API_URL from "../constants";
import ProjectCard from "./utility/ProjectCard";
import notyf from "../tcNotyf";
import WorkCarousel from "./utility/WorkCarousel";
import FullProject from "./utility/FullProject";
import Search from "./utility/Search";
import Filter from "./utility/Filter";

const Work = () => {
    // const [workSort, setWorkSort] = useState("Coding")
    const [projects, setProjects] = useState([]);
    const [searchProjects, setSearchProjects] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [fields, setFields] = useState([]);
    const sortRef = useRef("sort");
    const [fullView, setfullView] = useState(false);
    const [id, setId] = useState("");
    const [selectedProject,setSelectedProject] = useState({});

    const view = (project) => {
        setSelectedProject(project);
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

    const getId = async () => {
        try {
            const authToken = localStorage.getItem("authToken");

            if (authToken) {
                const dataJson = await fetch(
                    `${BASE_API_URL}/user/info?access_token=${authToken}`
                );
                const data = await dataJson.json();

                if (data.user) {
                    setId(data.user._id);
                } else {
                    notyf.error("some error occured");
                }
            } else {
                setId("");
            }
        } catch (err) {
            notyf.error("some error occured");
        }
    };

    const search = async (inp) => {
        if (inp !== "") {
            setSearchLoading(true);
            const resJson = await fetch(`${BASE_API_URL}/project/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search: inp }),
            });
            const res = await resJson.json();

            if (res.projects) {
                setSearchProjects(res.projects);
                setSearching(true);
                res.projects.length === 0 && notyf.error("No results");
            } else {
                notyf.error("Some Error occurred");
                setSearching(false);
            }

            setSearchLoading(false);
        } else {
            setSearchLoading(false);
            setSearchProjects([]);
            setSearching(false);
        }
    };

    useEffect(() => {
        const getFieldProjects = async () => {
            setSearchLoading(true);
            const fieldProjectsJson = await fetch(
                `${BASE_API_URL}/project/field`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ field: fields[0] }),
                }
            );
            const fieldProjects = await fieldProjectsJson.json();

            if (fieldProjects.projects) {
                setSearchProjects(fieldProjects.projects);
                setSearching(true);
            } else {
                notyf.error("Some Error occurred");
                setSearching(false);
            }

            setSearchLoading(false);
        };

        if (fields.length !== 0) {
            getFieldProjects();
        } else {
            setSearchLoading(false);
            setSearchProjects([]);
            setSearching(false);
        }
    }, [fields]);

    useEffect(() => {
        getProjects();
        getId();
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
                        <WorkCarousel sortRef={sortRef} />
                    </div>
                </div>
            </header>
            <header className="head-2 eventHead container eventHead2 workHead">
                <div className="eventSearch">
                    <Search
                        func={search}
                        loading={searchLoading}
                        placeholder="Search for amazing projects"
                    />
                    <Filter fields={fields} setFields={setFields} />
                </div>
                <div className="addEvent">
                    <a href="/create-project">
                        <img src="/assets/plus.svg" alt="alt" />
                        &nbsp;&nbsp;Create Project
                    </a>
                </div>
            </header>

            {searching ? (
                <section className="projects container firstProjSec">
                    <h1>Top results</h1>
                    <div className="workCards">
                        {searchProjects.map((project) => {
                            return (
                                <ProjectCard
                                    project={project}
                                    view={view}
                                    key={project._id}
                                    id={id}
                                />
                            );
                        })}
                    </div>
                </section>
            ) : (
                <section className="projects container firstProjSec">
                    <h1>
                        Popular & Trending&nbsp;<a href="/">View All</a>
                    </h1>
                    <div className="workCards">
                        {projects.map((project) => {
                            return (
                                <ProjectCard
                                    project={project}
                                    view={view}
                                    key={project._id}
                                    id={id}
                                />
                            );
                        })}
                    </div>
                </section>
            )}

            <section
                className={fullView ? "fullEvent fullEventActive" : "fullEvent"}
            >
                <FullProject project={selectedProject} close={close} />
            </section>
        </>
    );

    // function sortWork(eve) {
    //   setWorkSort(eve.target.textContent);
    // }
};

export default Work;
