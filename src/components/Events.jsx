import { Link } from "react-router-dom";
import "../styles/events.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { FaPlus, FaChevronLeft, FaShareAlt } from "react-icons/fa";
import EventCard from "./utility/EventCard";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";

const Events = () => {
    const [fullView, setfullView] = useState(false);
    const [events, setEvents] = useState([]);
    const [id, setId] = useState("");

    const view = () => {
        setfullView(true);
    };
    const close = () => {
        setfullView(false);
    };

    useEffect(() => {
        const getEvents = async () => {
            const dataJson = await fetch(`${BASE_API_URL}/event`);
            const data = await dataJson.json();

            data.events
                ? setEvents(data.events)
                : notyf.error("Some error occurred");
        };
        const getUser = async () => {
            const dataJson = await fetch(
                `${BASE_API_URL}/user/info?access_token=${localStorage.getItem(
                    "authToken"
                )}`
            );
            const data = await dataJson.json();

            data.user
                ? setId(data.user._id)
                : notyf.error("Some error occurred");
        };

        getUser();
        getEvents();
    }, []);

    return (
        <>
            <div
                className={
                    fullView ? "event-cover event-cover-active" : "event-cover"
                }
                onClick={close}
            ></div>
            <header className="eventHead head-1 container">
                <h1>
                    Browse through all events hosted by{" "}
                    <strong style={{ fontWeight: "400" }}>
                        100+ institutes
                    </strong>
                    &nbsp; and organisations!
                </h1>
            </header>
            <header className="eventHead2 head-2 eventHead container">
                <div className="eventSearch">
                    <div className="input">
                        <img src="/assets/magnifying-glass.svg" alt="alt" />
                        <input type="text" placeholder="Search" />
                    </div>
                    <button className="eventFilter">
                        <img src="/assets/filter.svg" alt="alt" />
                        &nbsp;&nbsp;&nbsp;&nbsp;Filter Region
                    </button>
                </div>
                <div className="addEvent">
                    <a href="/create-event">
                        <FaPlus />
                        &nbsp;&nbsp;Organize an Event
                    </a>
                </div>
            </header>

            <section className="showcase container">
                <Carousel
                    className="eventCarousel"
                    interval="3000"
                    autoPlay={true}
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                >
                    <div>
                        <div className="imgHold">
                            <img src="/assets/sample-banner.jpg" alt="alt" />
                            <div className="imgShadow"></div>
                        </div>
                        <div className="event-banner-text">
                            <h1>Alphanode 2021 by N.O.D.E.</h1>
                            <h2>
                                Lorem ipsum dolor inter-school tech event hosted
                                by DPS Gurgaon{" "}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <div className="imgHold">
                            <img src="/assets/sample-banner.jpg" alt="alt" />
                            <div className="imgShadow"></div>
                        </div>
                        <div className="event-banner-text">
                            <h1>Alphanode 2021 by N.O.D.E.</h1>
                            <h2>
                                Lorem ipsum dolor inter-school tech event hosted
                                by DPS Gurgaon{" "}
                            </h2>
                        </div>
                    </div>
                    <div>
                        <div className="imgHold">
                            <img src="/assets/sample-banner.jpg" alt="alt" />
                            <div className="imgShadow"></div>
                        </div>
                        <div className="event-banner-text">
                            <h1>Alphanode 2021 by N.O.D.E.</h1>
                            <h2>
                                Lorem ipsum dolor inter-school tech event hosted
                                by DPS Gurgaon
                            </h2>
                        </div>
                    </div>
                </Carousel>
            </section>

            <section className="whole-event-hold">
                <div className="container">
                    <h1 id="event-card-heading">
                        Upcoming Events&nbsp;<a href="/">View All</a>
                    </h1>
                </div>
                <div className="events container">
                    {events.map((event) => {
                        return (
                            <EventCard
                                view={view}
                                event={event}
                                key={event._id}
                                id={id}
                            />
                        );
                    })}
                </div>
            </section>

            <section
                className={fullView ? "fullEvent fullEventActive" : "fullEvent"}
            >
                <div className="event-top">
                    <Link className="event-back" to="/">
                        <FaChevronLeft />
                        Back
                    </Link>
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
                    className="fullEventBanneri"
                />

                <div className="eventOrg">
                    <div>
                        <h1>alphaNode 2022</h1>
                        <h3>
                            Organised by
                            <Link to="/"> nCrypt DPS Sushant Lok Gurgaon</Link>
                        </h3>
                    </div>
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
                        <p className="tags">
                            All-in-one, Inter-school, International, hackathon,
                            designathon, quizing, crossword
                        </p>
                    </div>
                    <div className="fullEventUnit fullEventUnitOrg">
                        <h4>Location</h4>
                        <div className="location">
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
};

export default Events;
