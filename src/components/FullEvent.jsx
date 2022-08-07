import { useEffect } from "react";
import { FaChevronLeft, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import getLinkLogo from "../getLinkLogo";

const FullEvent = ({ event, close }) => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";

    const isDateInPast = (firstDate, secondDate) => {
        if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
            return true;
        }

        return false;
    };
    useEffect(() => {
        console.log(event);
    });

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

    return (
        <>
            <div>
                <div className="event-top">
                    <Link onClick={close} className="event-back">
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
                    className="fullEventBanneri"
                />

                <div className="eventOrg">
                    <div>
                        <h1>{event.name}</h1>
                        <h3>
                            Organised by
                            <Link to="/">
                                {event.institute
                                    ? ` by ${event.institute}`
                                    : " Independently"}
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
                    {!isDateInPast(new Date(event.lastDate), new Date()) ? (
                        <button src={event.regLink}>Register</button>
                    ) : (
                        ""
                    )}
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
                            } ${new Date(
                                event.startDate
                            ).getDate()}, ${new Date(
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
                            <a
                                href={event?.website || ""}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {event.website}
                            </a>
                        </p>
                    </div>
                </div>

                <div className="fullEventUnit">
                    <h4>About event</h4>
                    <p>
                        {event.description
                            ? event.description
                            : "No description"}
                    </p>
                </div>

                <div className=" eventAddInfo">
                    <div className="fullEventUnit fullEventUnitOrg">
                        <h4>Event Tags</h4>
                        <p className="tags">
                            {event.tags
                                ? event.tags.map((tag) => {
                                      return <span>{tag} </span>;
                                  })
                                : "No tags to display"}
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
                                                  {getLinkLogo(link)}
                                              </a>
                                          );
                                      })
                                : ""}
                        </div>
                    </div>

                    <div className="eventContactLinks">
                        <div className="fullEventUnit">
                            <h4>Contact</h4>
                            <p>
                                Phone:{" "}
                                {event.phone ? event.phone : "Not provided"}
                            </p>
                            <p>
                                Email:{" "}
                                {event.email ? event.email : "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullEvent;

