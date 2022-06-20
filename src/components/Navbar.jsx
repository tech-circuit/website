import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import BASE_API_URL from "../constants";
const clientId =
    "884360040700-4093n49it73naktrttlljb9ad6ga4jjo.apps.googleusercontent.com";

const Navbar = () => {
    const location = useLocation();
    const [activePage, setActivePage] = useState(location.pathname);
    const [hamActive, setHam] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [pfpUrl, setpfpUrl] = useState("");

    useEffect(() => {
        setActivePage(location.pathname);
        if (localStorage.getItem("authToken") !== null) {
            fetch(
                `${BASE_API_URL}/user/info?access_token=${localStorage.getItem(
                    "authToken"
                )}`
            )
                .then(async (res) => {
                    if (res.status !== 404) {
                        setLoggedIn(true);
                    }
                    const pfpJson = await res.json();
                    setpfpUrl(pfpJson.user.pfp_url);
                    const { setUp } = pfpJson.user;
                    if (!setUp) {
                        window.location.href.split("/").pop() === "sign-up"
                            ? console.log("Please sign up")
                            : (window.location.href = "/sign-up");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [location]);

    useEffect(() => {
        if (hamActive) {
            for (let link of document.querySelectorAll(".nav-links-active a")) {
                link.addEventListener("click", () => {
                    setHam(!hamActive);
                });
            }
        }
    }, [hamActive]);

    const onSuccess = (res) => {
        const { email, familyName, givenName, googleId, imageUrl, name } =
            res.profileObj;
        const authToken = res.tokenObj.access_token;
        localStorage.removeItem("authToken");
        localStorage.removeItem("pfp");
        localStorage.setItem("pfp", imageUrl);
        localStorage.setItem("authToken", authToken);
        fetch(`${BASE_API_URL}/user/gauth`, {
            method: "POST",
            body: JSON.stringify({
                email,
                familyName,
                givenName,
                googleId,
                imageUrl,
                name,
                access_token: authToken,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(async (response) => {
                setLoggedIn(true);
                setpfpUrl(`${BASE_API_URL}/user/pfp?access_token=${authToken}`);
                const res = await response.json();
                const { setUp } = res.user;
                if (!setUp) {
                    window.location.href = "/sign-up";
                } else {
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }
            })
            .catch((error) => console.log(error));
    };

    const onFailure = (res) => {
        console.log("Login failed: res:", res);
    };

    const logout = () => {
        if (localStorage.getItem("authToken") !== null) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("pfp");
            setpfpUrl("");
            setLoggedIn(false);
            window.location.reload();
        }
    };

    const notif = () => {
        console.log("coming here");
        let el = document.getElementsByClassName('notif-card')[0]
        if (el.style.display !== 'none') {
            el.style.display = 'none'
        } else {
            el.style.display = 'block'
        }
    }

    return (
        <nav className="container nav">
            <div className="nav-left">
                <Link
                    className="nav-logo-holder"
                    to="/"
                    onClick={(e) => setActivePage("/")}
                >
                    <img
                        src="/assets/fulllogo.png"
                        alt="alt"
                        className="logo"
                    />
                </Link>
                <Link
                    id="short-nav-logo"
                    className="nav-logo-holder"
                    to="/"
                    onClick={(e) => setActivePage("/")}
                >
                    <img src="/assets/short.svg" alt="alt" className="logo" />
                </Link>
                <div
                    className={
                        hamActive ? "nav-links nav-links-active" : "nav-links"
                    }
                >
                    <Link
                        to="/forum"
                        onClick={(e) => setActivePage("/forum")}
                        className={
                            activePage === "/forum"
                                ? "nav-link nav-link-active"
                                : "nav-link"
                        }
                    >
                        Forum
                    </Link>
                    <Link
                        to="/about"
                        onClick={(e) => setActivePage("/about")}
                        className={
                            activePage === "/about"
                                ? "nav-link nav-link-active"
                                : "nav-link"
                        }
                    >
                        About
                    </Link>
                    <Link
                        to="/work"
                        onClick={(e) => setActivePage("/work")}
                        className={
                            activePage === "/work"
                                ? "nav-link nav-link-active"
                                : "nav-link"
                        }
                    >
                        Work
                    </Link>
                    <Link
                        to="/events"
                        onClick={(e) => setActivePage("/events")}
                        className={
                            activePage === "/events"
                                ? "nav-link nav-link-active"
                                : "nav-link"
                        }
                    >
                        Events
                    </Link>
                    <Link
                        to="/community"
                        onClick={(e) => setActivePage("/community")}
                        className={
                            activePage === "/community"
                                ? "nav-link nav-link-active"
                                : "nav-link"
                        }
                    >
                        Community
                    </Link>
                    <Link
                        to="/resources"
                        onClick={(e) => setActivePage("/resources")}
                        className={
                            activePage === "/resources"
                                ? "nav-link nav-link-active"
                                : "nav-link"
                        }
                    >
                        Resources
                    </Link>
                    <a
                        href="https://dsc.gg/techcircuit"
                        className="disc-btn"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Discord
                    </a>
                </div>
            </div>
            <div className="nav-right">
                {loggedIn ? (
                    <>
                        <button
                            className={
                                hamActive ? "logout logout-active" : "logout"
                            }
                            onClick={notif}
                            style={{ marginRight: "1.2vw" }}
                        >
                            <img src="/assets/bell.png" alt="logout" style={{ width: "1.1vw" }}/>
                        </button>
                        <a href="/profile">
                            <img
                                src={
                                    pfpUrl === ""
                                        ? "/assets/userFlowIcon.svg"
                                        : pfpUrl
                                }
                                className={hamActive ? "pfp pfp-active" : "pfp"}
                                alt="pfp"
                            ></img>
                        </a>
                        <button
                            className={
                                hamActive ? "logout logout-active" : "logout"
                            }
                            onClick={logout}
                        >
                            <img src="/assets/logout.png" alt="logout" />
                        </button>
                    </>
                ) : (
                    <GoogleLogin
                        clientId={clientId}
                        render={(renderProps) => (
                            <button
                                className={
                                    hamActive
                                        ? "login-btn login-btn-active"
                                        : "login-btn"
                                }
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                Login
                            </button>
                        )}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={false}
                    />
                )}
                <div
                    className={hamActive ? "ham ham-active" : "ham"}
                    onClick={() => setHam(!hamActive)}
                >
                    <div className="line"></div>
                </div>
            </div>
            <div className="notif-card">
                <p>Your notifications</p>
                <div className="notif-card-body">
                    <div className="notif">
                        <div className="left">
                            <img src="https://github.com/laxyapahuja.png" alt="notif-img" className="notif-img"/>
                        </div>
                        <div className="right">
                            <p>New comment on your post 'Mapcident' by JohnDoe</p>
                            <p id="time">A day ago</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="notif">
                        <div className="left">
                            <img src="https://github.com/laxyapahuja.png" alt="notif-img" className="notif-img"/>
                        </div>
                        <div className="right">
                            <p>New comment on your post 'Mapcident' by JohnDoe</p>
                            <p id="time">A day ago</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="notif">
                        <div className="left">
                            <img src="https://github.com/laxyapahuja.png" alt="notif-img" className="notif-img"/>
                        </div>
                        <div className="right">
                            <p>New comment on your post 'Mapcident' by JohnDoe</p>
                            <p id="time">A day ago</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="notif">
                        <div className="left">
                            <img src="https://github.com/laxyapahuja.png" alt="notif-img" className="notif-img"/>
                        </div>
                        <div className="right">
                            <p>New comment on your post 'Mapcident' by JohnDoe</p>
                            <p id="time">A day ago</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="notif">
                        <div className="left">
                            <img src="https://github.com/laxyapahuja.png" alt="notif-img" className="notif-img"/>
                        </div>
                        <div className="right">
                            <p>New comment on your post 'Mapcident' by JohnDoe</p>
                            <p id="time">A day ago</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="notif">
                        <div className="left">
                            <img src="https://github.com/laxyapahuja.png" alt="notif-img" className="notif-img"/>
                        </div>
                        <div className="right">
                            <p>New comment on your post 'Mapcident' by JohnDoe</p>
                            <p id="time">A day ago</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="notif">
                        <div className="left">
                            <img src="https://github.com/laxyapahuja.png" alt="notif-img" className="notif-img"/>
                        </div>
                        <div className="right">
                            <p>New comment on your post 'Mapcident' by JohnDoe</p>
                            <p id="time">A day ago</p>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
        </nav>
        
    );
};

export default Navbar;
