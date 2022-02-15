import "../styles/community.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import BASE_API_URL from "../constants";
import { Notyf } from "notyf";
import getLinkogo from "../getLinkLogo";

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

const Community = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [page, setPage] = useState("orgs");
    const [users, setUsers] = useState([]);
    const [orgs, setOrgs] = useState([]);

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
        const getUsers = async () => {
            const userDataJson = await fetch(`${BASE_API_URL}/user/get`);
            const userData = await userDataJson.json();

            if (userData.users) {
                setUsers(userData.users);
            } else {
                notyf.error("Some error occured");
            }
        };

        const getOrgs = async () => {
            const orgDataJson = await fetch(`${BASE_API_URL}/org`);
            const orgData = await orgDataJson.json();

            if (orgData.orgs) {
                setOrgs(orgData.orgs);
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getOrgs();
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
                    <a
                        href="/create-org"
                        className={page === "orgs" ? "" : "hide"}
                        id="newOrg"
                    >
                        Create New Org
                    </a>
                </div>
            </div>

            <div
                className={
                    page === "orgs" ? "coms container" : "coms container hide"
                }
            >
                {orgs.map((org) => {
                    return (
                        <div className="com">
                            <img src={org.logo_url} alt="alt" />
                            <h2>{org.name}</h2>
                            <p>
                                {org.isIndependant
                                    ? "Independant"
                                    : org.institute}
                            </p>
                            {/* <p>Delhi Public School, Vasant Kunj</p> */}
                            <div className="socials">
                                {org.links
                                    ? org.links
                                          .slice(0)
                                          .reverse()
                                          .map((link) => {
                                              return (
                                                  <a
                                                      href={link}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                  >
                                                      {getLinkogo(link)}
                                                  </a>
                                              );
                                          })
                                    : ""}
                            </div>
                            <Link className="view" to={`org/${org._id}`}>
                                View Page
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div
                className={
                    page === "users" ? "coms container" : "coms container hide"
                }
            >
                {users.map((user) => {
                    return (
                        <div className="com user">
                            <Link to={`user/${user._id}`}>
                                <a href="/user">
                                    <img src={user.pfp_url} alt="alt" />
                                    <h2>{user.name}</h2>
                                    <p>{user.title}</p>
                                    <p>{user.username}</p>
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
                                </a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Community;
