import { Link } from "react-router-dom";
import "../events.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaPlus } from "react-icons/fa";

const Events = () => {
  document.getElementsByTagName('html')[0].style.scrollBehavior = 'initial'
  return (
    <>
      <header className="eventHead head-1 container">
        <h1>
          Browse through all events hosted by{" "}
          <strong style={{ fontWeight: "400" }}>100+ institutes</strong>
          &nbsp; and organisations!
        </h1>
      </header>
      <header className="head-2 eventHead container eventHead2">
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
          <a href="/">
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
                Lorem ipsum dolor inter-school tech event hosted by DPS Gurgaon{" "}
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
                Lorem ipsum dolor inter-school tech event hosted by DPS Gurgaon{" "}
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
                Lorem ipsum dolor inter-school tech event hosted by DPS Gurgaon{" "}
              </h2>
            </div>
          </div>
        </Carousel>
      </section>

      <section className="events container">
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
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
            <Link to="/" className="view">
              View Page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
