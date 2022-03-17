import "../styles/work.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";
import BASE_API_URL from "../constants";
import { Notyf } from "notyf";
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

const options = {
    items: 9,
    rewind: true,
    autoplay: true,
    loop: true,
    autoplayTimeout: 3000,
    nav: false,
};

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
                        <OwlCarousel ref={sortRef} options={options}>
                            <h1>Web Development</h1>
                            <h1>UI/UX Design</h1>
                            <h1>Web Dev</h1>
                            <h1>Web Dev</h1>
                            <h1>UI/UX Design</h1>
                            <h1>Machine Learning</h1>
                            <h1>Web Dev</h1>
                            <h1>UI/UX Design</h1>
                            <h1>Web Dev</h1>
                            <h1>Web Dev</h1>
                            <h1>UI/UX Design</h1>
                            <h1>Web Dev</h1>
                        </OwlCarousel>
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
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>

                    <div to="/" className="workCard" onClick={view}>
                        <img src="/assets/sample-banner.jpg" alt="" />
                        <h2>Arena | Chess Platform Concept</h2>
                        <h3>Isam</h3>
                    </div>
                </div>
            </section>

            <section
                className={fullView ? "fullEvent fullEventActive" : "fullEvent"}
            >
                <button className="return" onClick={close}>
                    <FaChevronLeft />
                    &nbsp;&nbsp;Back
                </button>

                <div className="fullEventBanner">
                    <img src="/assets/sample-banner.jpg" alt="alt" />
                    <h1>Event Banner</h1>
                    <h3>
                        Organised by{" "}
                        <Link to="/">nCrypt DPS Sushant Lok Gurgaon</Link>
                    </h3>
                </div>

                <div className="eventRegis">
                    <p>Registeration Open till 13th May 11:59pm</p>
                    <button>Register</button>
                </div>

                <div className="fullEventUnit">
                    <h4>Eligibility Criteria</h4>
                    <p>For students of Class XI - XII across India</p>
                </div>

                <div className="fullEventInfo">
                    <div className="fullEventUnit">
                        <h4>Starts</h4>
                        <p>15th May, 2021</p>
                    </div>
                    <div className="fullEventUnit">
                        <h4>Starts</h4>
                        <p>15th May, 2021</p>
                    </div>
                    <div className="fullEventUnit">
                        <h4>Starts</h4>
                        <p>15th May, 2021</p>
                    </div>
                </div>

                <div className="fullEventUnit">
                    <h4>About event</h4>
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

                <div className=" eventAddInfo">
                    <div className="fullEventUnit fullEventUnitOrg">
                        <h4>Event Tags</h4>
                        <p class="tags">
                            All-in-one, Inter-school, International, hackathon,
                            designathon, quizing, crossword
                        </p>
                    </div>
                    <div className="fullEventUnit fullEventUnitOrg">
                        <h4>Location</h4>
                        <div class="location">
                            <p>Delhi NCR, India</p>
                        </div>
                    </div>
                </div>

                <div className="eventOrganizers">
                    <div className="fullEventUnit fullEventUnitOrg">
                        <h4>Mode of conductance</h4>
                        <p>Completely Online</p>
                    </div>
                    <div className="eventClub">
                        <div className="eventClubLeft">
                            <img src="/assets/sample-banner.jpg" alt="alt" />
                        </div>
                        <div className="eventClubRight fullEventUnit">
                            <h4>
                                <Link to="/">View club page</Link>
                            </h4>
                            <p>
                                nCrypt: Tech Club of Delhi Public School Sushant
                                Lok Gurgaon
                            </p>
                        </div>
                    </div>
                </div>

                <div className="eventContact">
                    <div className="eventLinks fullEventUnit">
                        <h4>Important Links</h4>
                        <div className="eventPlats">
                            <a href="/">
                                <img src="/assets/disc.svg" alt="" />
                            </a>
                            <a href="/">
                                <img src="/assets/disc.svg" alt="" />
                            </a>
                            <a href="/">
                                <img src="/assets/disc.svg" alt="" />
                            </a>
                        </div>
                    </div>

                    <div className="eventContactLinks">
                        <div className="fullEventUnit">
                            <h4>Contact</h4>
                            <a href="/">https://the.the/the/the</a>
                        </div>
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
