import "../styles/profile.css";
import ProfileInfo from "./ProfileInfo";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BASE_API_URL from "../constants";

const Profile = () => {
    const [tab, setTab] = useState("Your Info");
    const [authenticated, setAuthenticated] = useState("checking");

    const checkIfAuthenticated = async () => {
        const authedJson = await fetch(
            `${BASE_API_URL}/user/auth-pfp?access_token=${localStorage.getItem(
                "authToken"
            )}`
        );
        const authed = await authedJson.json();

        if (authed.pfp) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    };

    useEffect(() => {
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
                        className={
                            tab === "Your Info" ? "profile-tab-active" : ""
                        }
                    >
                        Your Info
                    </h3>
                    {/* <h3
                        className={
                            tab === "Projects" ? "profile-tab-active" : ""
                        }
                        onClick={(eve) => changeTab(eve)}
                    >
                        Projects
                    </h3>
                    <h3
                        className={tab === "Drafts" ? "profile-tab-active" : ""}
                        onClick={(eve) => changeTab(eve)}
                    >
                        Drafts
                    </h3>
                    <h3
                        className={
                            tab === "Your Posts" ? "profile-tab-active" : ""
                        }
                        onClick={(eve) => changeTab(eve)}
                    >
                        Your Posts
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
                {tab === "Your Info" ? <ProfileInfo /> : ""}
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
