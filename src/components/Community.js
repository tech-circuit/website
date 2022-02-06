import "../styles/community.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import BASE_API_URL from "../constants";
import { Notyf } from "notyf";

const Community = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [page, setPage] = useState("orgs");
    const [users, setUsers] = useState([]);

    // document.addEventListener("scroll", () => {
    //   if (document.querySelector(".comSearch")) {
    //     if (document.querySelector(".comSearch").offsetTop !== 386) {
    //       document.querySelector(".comSearch").classList.add("sha");
    //     } else {
    //       document.querySelector(".comSearch").classList.remove("sha");
    //     }
    //   }
    // });

    const switchPage = (eve) => {
        document.querySelector(".sortComAct").classList.remove("sortComAct");
        eve.target.classList.add("sortComAct");
        setPage(page === "orgs" ? "users" : "orgs");
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const notyf = new Notyf({
            duration: 2500,
            position: {
                x: "left",
                y: "bottom",
            },
            types: [
                {
                    type: "error",
                    background: "#FF6B6B",
                    dismissible: true,
                    icon: {
                        className: "material-icons",
                        tagName: "i",
                        text: "cancel",
                        color: "#ffffff",
                    },
                },
                {
                    type: "success",
                    background: "#85D49C",
                    dismissible: true,
                    icon: {
                        className: "material-icons",
                        tagName: "i",
                        text: "check_circle",
                        color: "#ffffff",
                    },
                },
            ],
        });

        const getUsers = async () => {
            const userDataJson = await fetch(`${BASE_API_URL}/user/get`);
            const userData = await userDataJson.json();

            console.log(userData);

            if (userData.users) {
                setUsers(userData.users);
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getUsers();
        } catch (err) {
            notyf.error("some error occured");
        }
    }, []);

    return (
        <>
            <header className="forumHeader head-1">
                <div className="container">
                    <h1 className="forumTitle">
                        Welcome to <strong>techCircuit</strong>&nbsp;Community
                    </h1>
                    <p>
                        Over 500 Clubs and organzations (primarily high schools
                        and colleges) from all over the Globe are part of the tC
                        community!
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
                    <button
                        className={page === "orgs" ? "" : "hide"}
                        id="newOrg"
                    >
                        <a href="/create-org">
                            Create New Org
                        </a>
                    </button>
                </div>
            </div>

            <div
                className={
                    page === "orgs" ? "coms container" : "coms container hide"
                }
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
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
                    <Link className="view" to="/org">
                        View Page
                    </Link>
                </div>
            </div>

            <div
                className={
                    page === "users" ? "coms container" : "coms container hide"
                }
            >
                {users.map((user) => {
                    return (
                        <div className="com user">
                            <a href="/user">
                                <img src={user.pfp_url} alt="alt" />
                                <h2>{user.name}</h2>
                                <p>{user.title}</p>
                                {/* <p>Delhi Public School, Vasant Kunj</p> */}
                                {/* <div className="socials">
                                    <a href="/">
                                        <FaInstagram />
                                    </a>
                                    <a href="/">
                                        <FaInstagram />
                                    </a>
                                    <a href="/">
                                        <FaInstagram />
                                    </a>
                                </div> */}
                            </a>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Community;
