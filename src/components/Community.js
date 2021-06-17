import "../community.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";

const Community = () => {
  const [page, setPage] = useState("orgs");

  document.addEventListener("scroll", () => {
    if (document.querySelector(".comSearch").offsetTop !== 386) {
      document.querySelector(".comSearch").classList.add("sha");
    } else {
      document.querySelector(".comSearch").classList.remove("sha");
    }
  });

  return (
    <>
      <header className="forumHeader head-1">
        <div className="container">
          <h1 className="forumTitle">
            Welcome to <strong>techCircuit</strong>&nbsp;Community
          </h1>
          <p>
            Over 500 Clubs and organzations (primarily high schools and
            colleges) from all over the Globe are part of the tC community!
          </p>
        </div>
      </header>
      <header className="forumHeader head-2 comHead">
        <div className="container sortCom">
          <button
            onClick={(e) => switchPage(e)}
            className={page === "orgs" ? "sortComAct" : ""}
          >
            Orgs
          </button>
          <button
            onClick={(e) => switchPage(e)}
            className={page === "users" ? "sortComAct" : ""}
          >
            Users
          </button>
        </div>
      </header>

      <div className="comSearch container">
        <div className="comLeft">
          <div className="input">
            <img src="/assets/magnifying-glass.svg" alt="alt" />
            <input type="text" placeholder="Search Organisations" />
          </div>
          <button>Sort by Region</button>
        </div>
        <div className="comRight">
          <button className={page === "orgs" ? "" : "hide"} id="newOrg">
            Create New Org
          </button>
        </div>
      </div>

      <div
        className={page === "orgs" ? "coms container" : "coms container hide"}
      >
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
        <div className="com">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Code Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
          <Link className="view" to="/">
            View Page
          </Link>
        </div>
      </div>

      <div
        className={page === "users" ? "coms container" : "coms container hide"}
      >
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="com user">
          <img src="/assets/sample-banner.jpg" alt="alt" />
          <h2>Coding Wars</h2>
          <p>Delhi Public School, Vasant Kunj</p>
          <p>Delhi Public School, Vasant Kunj</p>
          <div className="socials">
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </>
  );

  function switchPage(eve) {
    document.querySelector(".sortComAct").classList.remove("sortComAct");
    eve.target.classList.add("sortComAct");
    setPage(page === "orgs" ? "users" : "orgs");
  }
};

export default Community;
