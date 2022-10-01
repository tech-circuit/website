import { useEffect, useState } from "react";
import BASE_API_URL from "../../constants";
import EventCard from "../utility/EventCard";

const Events = ({ userId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const eventDataJson = await fetch(
                `${BASE_API_URL}/event/user/${userId}`
            );

            const eventData = await eventDataJson.json();

            setEvents(eventData.events);
        };

        getData();
    }, [userId]);

    return (
        <div className="profile-events-hold">
            <div className="events">
                {events.map((event) => (
                    <EventCard
                        key={event._id}
                        id={userId}
                        event={event}
                        view={(the) => {
                            console.log("called");
                            window.location.href = `/event/${the._id}`;
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Events;
