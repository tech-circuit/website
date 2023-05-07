import "../styles/profile.css";
import ProfileInfo from "./profile/ProfileInfo";
import Projects from "./profile/Projects";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BASE_API_URL from "../constants";
import Posts from "./profile/Posts";
import Events from "./profile/Events";

const Profile = () => {
    const [tab, setTab] = useState("Info");
    const [authenticated, setAuthenticated] = useState("checking");
    const [userId, setUserId] = useState("");

    const pages = {
        Info: <ProfileInfo />,
        Projects: <Projects userId={userId} />,
        Posts: <Posts userId={userId} />,
        Events: <Events userId={userId} />,
    };

    useEffect(() => {
        const checkIfAuthenticated = async () => {
            const authedJson = await fetch(
                `${BASE_API_URL}/user/info?access_token=${localStorage.getItem(
                    "authToken"
                )}`
            );
            const authed = await authedJson.json();

            if (authed.user) {
                setAuthenticated(true);
                setUserId(authed.user._id);
            } else {
                setAuthenticated(false);
            }
        };

        checkIfAuthenticated();
    });

    function changeTab(e) {
        setTab(e.target.textContent);
    }

    const profilePage = (
        <>
            <header className="head-2 profile-tabs">
                <div className="left-tabs">
                    <h3
                        onClick={(eve) => changeTab(eve)}
                        className={tab === "Info" ? "profile-tab-active" : ""}
                    >
                        Info
                    </h3>
                    <h3
                        className={
                            tab === "Projects" ? "profile-tab-active" : ""
                        }
                        onClick={(eve) => changeTab(eve)}
                    >
                        Projects
                    </h3>
                    {/* <h3
                        className={tab === "Posts" ? "profile-tab-active" : ""}
                        onClick={(eve) => changeTab(eve)}
                    >
                        Posts
                    </h3>
                    <h3
                        className={tab === "Events" ? "profile-tab-active" : ""}
                        onClick={(eve) => changeTab(eve)}
                    >
                        Events
                    </h3> */}
                    {/* <h3
                        className={tab === "Drafts" ? "profile-tab-active" : ""}
                        onClick={(eve) => changeTab(eve)}
                    >
                        Drafts
                    </h3>
                    <h3
                        className={
                            tab === "Saved Posts" ? "profile-tab-active" : ""
                        }
                        onClick={(eve) => changeTab(eve)}
                    >
                        Saved Posts
                    </h3>
                    <h3
                        className={
                            tab === "Notifications" ? "profile-tab-active" : ""
                        }
                        onClick={(eve) => changeTab(eve)}
                    >
                        Notifications
                    </h3> */}
                </div>
                {/* <div className="right-tabs">
                    <h3>Logout</h3>
                </div> */}
            </header>

            {/* TABS ------------------------------------------------------------------------------------------------ */}

            <div className="container">
                {/* {tab === "Your Info" ? <ProfileInfo /> : ""} */}
                {pages[tab.toString().trim()]}
            </div>
        </>
    );

    return authenticated === "checking" ? (
        <></>
    ) : authenticated ? (
        profilePage
    ) : (
        <Redirect to="/" />
    );
};

export default Profile;
