import { Link } from "react-router-dom";
import "../styles/events.css";
import { FaChevronLeft, FaShareAlt } from "react-icons/fa";
// import { useEffect } from "react";

const EventView = () => {
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
                        src="/assets/sample-banner.jpg"
                        alt="alt"
                        className="fullEventBannerImg"
                    />

                    <div className="eventOrg">
                        <div>
                            <h1>alphaNode 2022</h1>
                            <h3>
                                Organised by
                                <Link to="/">
                                    {" "}
                                    nCrypt DPS Sushant Lok Gurgaon
                                </Link>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam turpis diam enim odio. Faucibus
                            sagittis, non enim nibh. Diam consectetur maecenas
                            varius nibh at. Porttitor nunc nascetur ultricies
                            vulputate. Egestas at egestas ut mi lectus morbi nam
                            lacus viverra. Sed purus praesent viverra posuere
                            ridiculus tempor. Enim habitasse dictum tristique
                            duis ac sagittis viverra.
                        </p>
                    </div>

                    <div className=" eventAddInfo">
                        <div className="fullEventUnit fullEventUnitOrg">
                            <h4>Event Tags</h4>
                            <p className="tags">
                                All-in-one, Inter-school, International,
                                hackathon, designathon, quizing, crossword
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
            </div>
        </>
    );
};

export default EventView;
