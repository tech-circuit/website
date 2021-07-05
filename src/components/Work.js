import "../work.css";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";

const options = {
  items: 7,
  rewind: true,
  autoplay: true,
  loop: true,
  autoplayTimeout: 3000,
  nav: false,
};

const Work = () => {
  const [workSort, setWorkSort] = useState("Coding");

  const sortRef = useRef("sort");

  return (
    <>
      <header className="forumHeader head-1">
        <div className="container">
          <h1 className="forumTitle workTitle">
            Projects across multiple fields in tech done by the techCircuit
            Community!&nbsp;
            <a href="/">
              <strong>Learn More.</strong>
            </a>
          </h1>
          <div className="carHold">
            <button id="carPrev" onClick={() => sortRef.current.prev()}>
              <FaChevronLeft />
            </button>
            <button id="carNext" onClick={() => sortRef.current.next()}>
              <FaChevronRight />
            </button>
            <OwlCarousel ref={sortRef} options={options}>
              <h1>Web Development</h1>
              <h1>UI/UX Design</h1>
              <h1>Machine Learning</h1>
              <h1>Web Development</h1>
              <h1>UI/UX Design</h1>
              <h1>Machine Learning</h1>
              <h1>Web Development</h1>
              <h1>UI/UX Design</h1>
              <h1>Machine Learning</h1>
              <h1>Web Development</h1>
              <h1>UI/UX Design</h1>
              <h1>Machine Learning</h1>
            </OwlCarousel>
          </div>
        </div>
      </header>
      <header className="head-2 eventHead container eventHead2">
        <div className="eventSearch">
          <div className="input">
            <img src="/assets/magnifying-glass.svg" alt="alt" />
            <input type="text" placeholder="Search" />
          </div>
          <button className="eventFilter">
            <img src="/assets/filter.svg" alt="alt" />
            &nbsp;&nbsp;&nbsp;&nbsp;Filter Categories
          </button>
        </div>
        <div className="addEvent">
          <a href="/create-post">
            <FaPlus />
            &nbsp;&nbsp;Create Project
          </a>
        </div>
      </header>

      <section className="popular container">
        <h1>Popular & Trending</h1>
        <div className="workCards">
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
        </div>
      </section>

      <section className="projects container">
        <h1>C0D1NG5</h1>
        <div className="workSort">
          <button
            className={workSort === "Coding" ? "workSortActive" : ""}
            onClick={(e) => sortWork(e)}
          >
            Coding
          </button>
          <button
            className={workSort === "UI" ? "workSortActive" : ""}
            onClick={(e) => sortWork(e)}
          >
            UI
          </button>
          <button
            className={workSort === "Design" ? "workSortActive" : ""}
            onClick={(e) => sortWork(e)}
          >
            Design
          </button>
          <button
            className={workSort === "MOm" ? "workSortActive" : ""}
            onClick={(e) => sortWork(e)}
          >
            MOm
          </button>
          <button
            className={workSort === "Dard" ? "workSortActive" : ""}
            onClick={(e) => sortWork(e)}
          >
            Dard
          </button>
          <button
            className={workSort === "Dasness" ? "workSortActive" : ""}
            onClick={(e) => sortWork(e)}
          >
            Dasness
          </button>
        </div>
        <div className="workCards">
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
          <Link to="/" className="workCard">
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
          </Link>
        </div>
      </section>
    </>
  );

  function sortWork(eve) {
    setWorkSort(eve.target.textContent);
  }
};

export default Work;
