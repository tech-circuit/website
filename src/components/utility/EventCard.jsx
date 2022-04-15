import { Link } from "react-router-dom";

const EventCard = ({ view }) => {
    return (
        <div className="event">
            <img src="/assets/sample-banner.jpg" alt="alt" />
            <div className="eventBody">
                <div className="head">
                    <h1>nCRYPT 2021 Lorem </h1>
                    <h2>
                        Organised by <Link to="/">DUGUY</Link>
                    </h2>
                </div>
                <h3 className="ava">2 Days left | Registration Open</h3>
                <div className="details">
                    <h4>Happening online</h4>
                    <p>Starts</p>
                    <h5>May 15th, 2021</h5>
                    <p>Ends</p>
                    <h5>May 18th, 2021</h5>
                </div>
                <button to="/" className="view" onClick={view}>
                    View Page
                </button>
            </div>
        </div>
    );
};

export default EventCard;
