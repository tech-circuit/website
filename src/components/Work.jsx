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
import { useFieldsAvailable } from "./utility/useFieldsAvailable";
import { useSwiper } from "swiper/react";

const Work = ({ socket }) => {
    // const [workSort, setWorkSort] = useState("Coding")
    const [searchProjects, setSearchProjects] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    const sortRef = useRef(null);
    const carouselRef = useRef(null);
    const [searchInput, setSearchInput] = useState("");
    const fieldsAvailable = useFieldsAvailable();
    const [fullView, setfullView] = useState(false);
    const [id, setId] = useState("");
    const [selectedProject, setSelectedProject] = useState({});

    const view = (project) => {
        window.history.pushState({}, "", `/project/${project._id}`);
        setSelectedProject(project);
        setfullView(true);
    };

    const close = () => {
        window.history.pushState({}, "", `/work`);
        setfullView(false);
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
        setSearchInput(inp);
        if (inp !== "") {
            if (inp.length < 4) return notyf.error("Query too short");
            carouselRef.current.scrollIntoView({ behavior: "smooth" });
            setSearchLoading(true);
            const resJson = await fetch(`${BASE_API_URL}/project/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search: inp, field: currentField }),
            });
            const res = await resJson.json();

            if (res.projects) {
                setSearchProjects(res.projects);
                setSearching(true);
                res.projects.length === 0 && notyf.error("No results");
            } else {
                console.log(res);
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
                    body: JSON.stringify({ field: currentField }),
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

        if (currentField != null) {
            getFieldProjects();
        } else {
            setSearchLoading(false);
            setSearchProjects([]);
            setSearching(false);
        }
    }, [currentField]);

    useEffect(() => {
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
                    <div className="carHold" ref={carouselRef}>
                        <div className="owl-controls">
                            <button id="carPrev">
                                <FaChevronLeft />
                            </button>
                            <button id="carNext">
                                <FaChevronRight />
                            </button>
                        </div>
                        <WorkCarousel
                            fieldsAvailable={fieldsAvailable}
                            sortRef={sortRef}
                            setCurrentField={setCurrentField}
                        />
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
                    <Filter
                        fieldsAvailable={fieldsAvailable}
                        field={currentField}
                        setField={setCurrentField}
                    />
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
                    {searchInput ? (
                        <h1>
                            {searchProjects.length} projects found in "
                            {searchInput}"
                        </h1>
                    ) : (
                        <h1>{currentField} Projects</h1>
                    )}
                    <div className="workCards">
                        {searchProjects.map((project) => {
                            return (
                                <ProjectCard
                                    project={project}
                                    view={view}
                                    key={project._id}
                                    id={id}
                                    x
                                />
                            );
                        })}
                    </div>
                </section>
            ) : (
                <ProjectView
                    fieldsAvailable={fieldsAvailable}
                    view={view}
                    id={id}
                />
            )}

            <section
                className={fullView ? "fullEvent fullEventActive" : "fullEvent"}
            >
                {fullView && (
                    <FullProject
                        socket={socket}
                        project={selectedProject}
                        close={close}
                    />
                )}
            </section>
        </>
    );

    // function sortWork(eve) {
    //   setWorkSort(eve.target.textContent);
    // }
};

function ProjectView({ view, id, fieldsAvailable }) {
    const [projects, setProjects] = useState([]);
    const newProjects = [...projects]
        .sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
        .slice(0, 10);
    const projectsByFields = fieldsAvailable.map((field) => {
        return {
            title: field,
            projects: projects
                .filter((project) => project.fields.includes(field))
                .slice(0, 6),
        };
    });

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
            <section className="projects container firstProjSec">
                <h1>New</h1>
                <div className="workCards">
                    {newProjects.map((project) => {
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
            {projectsByFields.map((field) =>
                field.projects.length !== 0 ? (
                    <section
                        key={field.title}
                        className="projects container firstProjSec"
                    >
                        <h1>{field.title}</h1>
                        <div className="workCards">
                            {field.projects.map((project) => {
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
                ) : null
            )}
        </>
    );
}

export default Work;
