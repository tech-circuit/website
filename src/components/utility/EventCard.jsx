import { Link } from "react-router-dom";

const EventCard = ({ view, event, id }) => {
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

    return (
        <div className="event">
            <img src={event.cover_image} alt="alt" />
            <div className="eventBody">
                <div className="head">
                    <h1>{event.name}</h1>
                    <h2>
                        Organised{" "}
                        {event.isIndependent
                            ? "independently"
                            : `by ${event.institute}`}
                    </h2>
                </div>
                <h3 className="ava">
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
                </h3>
                <div className="details">
                    <h4>
                        Happening{" "}
                        {event.host === "both" ? "online/onsite" : event.host}
                    </h4>
                    <p>Starts</p>
                    <h5>{`${
                        monthNames[new Date(event.startDate).getMonth()]
                    } ${new Date(event.startDate).getDate()}, ${new Date(
                        event.startDate
                    ).getFullYear()}`}</h5>
                    <p>Ends</p>
                    <h5>{`${
                        monthNames[new Date(event.endDate).getMonth()]
                    } ${new Date(event.endDate).getDate()}, ${new Date(
                        event.endDate
                    ).getFullYear()}`}</h5>
                </div>
                <Link
                    to={
                        id.toString() === event.uploader
                            ? `/edit-event/${event._id}`
                            : "#"
                    }
                    className="view"
                    onClick={view}
                >
                    {id.toString() === event.uploader ? "Edit" : "View"} Event
                </Link>
                <a href={`event/${event._id}`}>View on sep page</a> 
            </div>
        </div>
    );
};

export default EventCard;
