import "../styles/community.css";
import { useState, useEffect } from "react";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import UserCard from "./utility/UserCard";
import OrgCard from "./utility/OrgCard";
import { Link } from "react-router-dom";

const Community = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [page, setPage] = useState("orgs");
    const [users, setUsers] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [id, setId] = useState("");

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
            const userDataJson = await fetch(`${BASE_API_URL}/user/all`);
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

        const getId = async () => {
            try {
                const authToken = localStorage.getItem("authToken");

                if (authToken) {
                    const dataJson = await fetch(
                        `${BASE_API_URL}/user/info?access_token=${authToken}`
                    );
                    const data = await dataJson.json();

                    if (data.user) {
                        setId(data.user._id);
                    } else {
                        notyf.error("some error occured");
                    }
                } else {
                    setId("");
                }
            } catch (err) {
                notyf.error("some error occured");
            }
        };

        try {
            getOrgs();
            getUsers();
            getId();
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
                    <Link
                        to="/create-org"
                        className={page === "orgs" ? "" : "hide"}
                        id="newOrg"
                    >
                        Create New Org
                    </Link>
                </div>
            </div>

            <div
                className={
                    page === "orgs" ? "coms container" : "coms container hide"
                }
            >
                {orgs.map((org) => {
                    return <OrgCard key={org._id} org={org} id={id} />;
                })}
            </div>

            <div
                className={
                    page === "users" ? "coms container" : "coms container hide"
                }
            >
                {users.map((user) => {
                    return <UserCard key={user._id} user={user} />;
                })}
            </div>
        </>
    );
};

export default Community;
