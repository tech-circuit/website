import { Link, useParams } from "react-router-dom";
import "../styles/events.css";
import { FaChevronLeft, FaShareAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import notyf from "../tcNotyf";
import getLinkogo from "../getLinkLogo";
import BASE_API_URL from "../constants";


const EventView = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [event, setEvents] = useState([]);
    const { eventId } = useParams();

    const isDateInPast = (firstDate, secondDate) => {
        if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
            return true;
        }

        return false;
    };   

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    useEffect(() => {
        const getEvent = async () => {
            const eventDataJson = await fetch(`${BASE_API_URL}/event/${eventId}`);
            const eventData = await eventDataJson.json();

            if (eventData.event) {
                setEvents(eventData.event);
                console.log(event)
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getEvent();
        } catch (err) {
            notyf.error("some error occured");
        }
    }, [eventId, event]);


    return (
        <>
            <div className="viewContainer">
                <section className="ViewEventWrap">
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
                        src={event.cover_image}
                        alt="alt"
                        className="fullEventBannerImg"
                    />

                    <div className="eventOrg">
                        <div>
                            <h1>{event.name}</h1>
                            <h3>
                                Organised
                                <Link to="/">
                                    {event.institute 
                                    ? ` by ${event.institute}` : " Independently"}
                                </Link>
                            </h3>
                        </div>
                    </div>

                    <div className="eventRegis">
                        {!isDateInPast(new Date(event.lastDate), new Date())
                            ? `${Math.abs(
                                Math.floor(
                                    (new Date().getTime() -
                                        new Date(event.lastDate).getTime()) /
                                        (1000 * 3600 * 24)
                                )
                            )} Days left | `
                            : ``}
                        Registrations{" "}
                        {isDateInPast(new Date(event.lastDate), new Date())
                            ? "closed"
                            : "open"}
                        
                        {isDateInPast(new Date(event.lastDate), new Date())
                            ? <button src={event.regLink}>Register</button>                            
                            : ""}
                    </div>

                    <div className="fullEventUnit">
                        <h4>Eligibility Criteria</h4>
                        <p>{event.eligibility}</p>
                    </div>

                    <div className="fullEventInfo">
                        <div className="fullEventUnit">
                            <h4>Event starts</h4>
                            <p>
                                {`${
                                    monthNames[new Date(event.startDate).getMonth()]
                            } ${new Date(event.startDate).getDate()}, ${new Date(
                                event.startDate
                            ).getFullYear()}`}
                            </p>
                        </div>
                        <div className="fullEventUnit">
                            <h4>Event ends</h4>
                            <p>
                                {`${
                                    monthNames[new Date(event.endDate).getMonth()]
                                } ${new Date(event.endDate).getDate()}, ${new Date(
                                    event.endDate
                                ).getFullYear()}`}
                            </p>
                        </div>
                        <div className="fullEventUnit">
                            <h4>Visit event website</h4>
                            <p>
                                <Link to={event.website}>{event.website}</Link>
                            </p>
                        </div>
                    </div>

                    <div className="fullEventUnit">
                        <h4>About event</h4>
                        <p>{event.description ? event.description : "No description" }
                        </p>
                    </div>

                    <div className=" eventAddInfo">
                        <div className="fullEventUnit fullEventUnitOrg">
                            <h4>Event Tags</h4>
                            <p className="tags">
                                {event.tags
                                    ? event.tags
                                        .map((tag) => {
                                            return (
                                                <span>{tag} </span>
                                            );
                                        })
                                    : "No tags to display"}
                            </p>
                        </div>
                        <div className="fullEventUnit fullEventUnitOrg">
                            <h4>Location</h4>
                            <div className="location">
                                <p>Delhi NCR</p>
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
                                <img
                                    src="/assets/sample-banner.jpg"
                                    alt="alt"
                                />
                            </div>
                            <div className="eventClubRight fullEventUnit">
                                <h4>
                                    <Link to="/">View club page</Link>
                                </h4>
                                <p>
                                    nCrypt: Tech Club of Delhi Public School
                                    Sushant Lok Gurgaon
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="eventContact">
                        <div className="eventLinks fullEventUnit">
                            <h4>Important Links</h4>
                            <div className="eventPlats">
                                {event.links
                                    ? event.links
                                        .slice(0)
                                        .reverse()
                                        .map((link) => {
                                            return (
                                                <a
                                                    href={link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {getLinkogo(link)}
                                                </a>
                                            );
                                        })
                                    : ""}
                            </div>
                        </div>

                        <div className="eventContactLinks">
                            <div className="fullEventUnit">
                                <h4>Contact</h4>
                                <p>Phone: {event.phone ? event.phone : "Not provided"}</p>
                                <p>Email: {event.email ? event.email : "Not provided"}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default EventView;
