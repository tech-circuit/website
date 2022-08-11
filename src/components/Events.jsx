import "../styles/events.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { FaPlus } from "react-icons/fa";
import EventCard from "./utility/EventCard";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import Search from "./utility/Search";
import Filter from "./utility/Filter";
import FullEvent from "./FullEvent";
import { useFieldsAvailable } from "./utility/useFieldsAvailable";

const Events = () => {
    const [fullView, setfullView] = useState(false);
    const [events, setEvents] = useState([]);
    const fieldsAvailable = useFieldsAvailable();
    const [id, setId] = useState("");
    const [searchEvents, setSearchEvents] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [fields, setFields] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});

    const view = (event) => {
        window.history.pushState({}, "", `/event/${event._id}`);
        setSelectedEvent(event);
        setfullView(true);
    };
    const close = () => {
        window.history.pushState({}, "", `/events`);
        setfullView(false);
    };

    const search = async (inp) => {
        if (inp !== "") {
            setSearchLoading(true);
            const resJson = await fetch(`${BASE_API_URL}/event/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search: inp }),
            });
            const res = await resJson.json();

            if (res.events) {
                setSearchEvents(res.events);
                setSearching(true);
                res.events.length === 0 && notyf.error("No results");
            } else {
                notyf.error("Some Error occurred");
                setSearching(false);
            }

            setSearchLoading(false);
        } else {
            setSearchLoading(false);
            setSearchEvents([]);
            setSearching(false);
        }
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

        if (localStorage.getItem("authToken")) getUser();
        getEvents();
    }, []);

    useEffect(() => {
        const getFieldEvents = async () => {
            setSearchLoading(true);
            const fieldEventsJson = await fetch(`${BASE_API_URL}/event/field`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ field: fields[0] }),
            });
            const fieldEvents = await fieldEventsJson.json();

            if (fieldEvents.events) {
                setSearchEvents(fieldEvents.events);
                setSearching(true);
            } else {
                notyf.error("Some Error occurred");
                setSearching(false);
            }

            setSearchLoading(false);
        };

        if (fields.length !== 0) {
            getFieldEvents();
        } else {
            setSearchLoading(false);
            setSearchEvents([]);
            setSearching(false);
        }
    }, [fields]);

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
                    <Search
                        func={search}
                        loading={searchLoading}
                        placeholder="Search for events"
                    />
                    <Filter
                        fieldsAvailable={fieldsAvailable}
                        fields={fields}
                        setFields={setFields}
                    />
                </div>
                <div className="addEvent">
                    <a href="/create-event">
                        <FaPlus />
                        &nbsp;&nbsp;Organize an Event
                    </a>
                </div>
            </header>

            {searching ? (
                <>
                    <section className="whole-event-hold">
                        <div className="container">
                            <h1
                                id="event-card-heading"
                                className="search-heading"
                            >
                                Top results
                            </h1>
                        </div>
                        <div className="events container">
                            {searchEvents.map((event) => {
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
                </>
            ) : (
                <>
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
                                    <img
                                        src="/assets/sample-banner.jpg"
                                        alt="alt"
                                    />
                                    <div className="imgShadow"></div>
                                </div>
                                <div className="event-banner-text">
                                    <h1>Alphanode 2021 by N.O.D.E.</h1>
                                    <h2>
                                        Lorem ipsum dolor inter-school tech
                                        event hosted by DPS Gurgaon{" "}
                                    </h2>
                                </div>
                            </div>
                            <div>
                                <div className="imgHold">
                                    <img
                                        src="/assets/sample-banner.jpg"
                                        alt="alt"
                                    />
                                    <div className="imgShadow"></div>
                                </div>
                                <div className="event-banner-text">
                                    <h1>Alphanode 2021 by N.O.D.E.</h1>
                                    <h2>
                                        Lorem ipsum dolor inter-school tech
                                        event hosted by DPS Gurgaon{" "}
                                    </h2>
                                </div>
                            </div>
                            <div>
                                <div className="imgHold">
                                    <img
                                        src="/assets/sample-banner.jpg"
                                        alt="alt"
                                    />
                                    <div className="imgShadow"></div>
                                </div>
                                <div className="event-banner-text">
                                    <h1>Alphanode 2021 by N.O.D.E.</h1>
                                    <h2>
                                        Lorem ipsum dolor inter-school tech
                                        event hosted by DPS Gurgaon
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
                </>
            )}

            <section
                className={fullView ? "fullEvent fullEventActive" : "fullEvent"}
            >
                <FullEvent event={selectedEvent} close={close} />
            </section>
        </>
    );
};

export default Events;
