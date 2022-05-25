import { Link } from "react-router-dom";

const EventCard = ({ view, event, id }) => {
    return (
        <div className="event">
            <img src={event.cover_image} alt="alt" />
            <div className="eventBody">
                <div className="head">
                    <h1>{event.name}</h1>
                    {/* <h2>
                        Organised by <Link to="/">DUGUY</Link>
                    </h2> */}
                </div>
                <h3 className="ava">{event.lastDate}</h3>
                <div className="details">
                    <h4>
                        Happening{" "}
                        {event.host === "both" ? "online/onsite" : event.host}
                    </h4>
                    <p>Starts</p>
                    <h5>{event.startDate}</h5>
                    <p>Ends</p>
                    <h5>{event.endDate}</h5>
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
                    View Page
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
