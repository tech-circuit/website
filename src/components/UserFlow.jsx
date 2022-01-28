import { useEffect, useState } from "react";
import { Notyf } from "notyf";
import BASE_API_URL from "../constants";
import { Redirect } from "react-router-dom";
import "../styles/user-flow.css";

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

const Component = ({ pfp }) => {
    const [page, setPage] = useState(1);

    return (
        <>
            <div className="top-nav">
                <div className="progress-indicator">Basic</div>
                <div className="progress-indicator">Basic</div>
                <div className="progress-indicator">Basic</div>
                <div className="progress-indicator">Basic</div>
                <div className="progress-indicator">Basic</div>
            </div>

            <div className="flow-page basic-page">
                <div className="basic-left">
                    <div className="flow-head-cont">
                        <h1 className="flow-name">Hello World</h1>
                        <div className="flow-email">vedanta1412galkn#kjns</div>
                    </div>
                    <div className="flow-basic-unit">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="theVedanta_1"
                        />
                    </div>
                    <div className="flow-basic-unit">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Web Developer, Designer, Blockchain Dev"
                        />
                    </div>
                    <div className="flow-double-cont">
                        <div className="flow-basic-unit">
                            <label htmlFor="country">Country</label>
                            <select name="country">
                                <option value="">None</option>
                            </select>
                        </div>
                        <div className="flow-basic-unit">
                            <label htmlFor="state">State</label>
                            <select name="state">
                                <option value="">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="flow-basic-unit">
                        <label htmlFor="about">About me</label>
                        <textarea
                            type="text"
                            name="about"
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. Pretium eget ut et blandit cursus. Mattis malesuada at semper cursus."
                        ></textarea>
                    </div>
                </div>
                <div className="basic-right">
                    <img src={pfp} alt="pfp" />
                    <p>We recommend an image of 500x500px</p>
                    <div className="basic-btn-hold">
                        <button className="pfp-edit">Edit</button>
                        <button className="pfp-delete">Delete</button>
                    </div>
                </div>
            </div>

            <div className="bottom-nav">
                <button
                    className="back-page"
                    onClick={() => {
                        setPage(page - 1);
                    }}
                >
                    Go back
                </button>
                <button className="next-page" onClick={() => setPage(page + 1)}>
                    Proceed
                </button>
            </div>
        </>
    );
};

const UserFlow = () => {
    const [pfp, setPfp] = useState(false);
    const [auth, setAuth] = useState("undefined");
    const authToken = localStorage.getItem("authToken");

    const getPfp = async () => {
        try {
            const pfpData = await fetch(
                `${BASE_API_URL}/user/auth-pfp?access_token=${authToken}`
            );
            const pfpJson = await pfpData.json();

            if (pfpJson.pfp) {
                setPfp(pfpJson.pfp);
                setAuth(true);
            } else {
                setAuth(false);
            }
        } catch (err) {
            notyf.error("Some Error Occured");
            setAuth(false);
        }
    };

    useEffect(() => {
        getPfp();
    });

    return auth === true ? (
        <Component pfp={pfp} />
    ) : auth === "undefined" ? (
        <></>
    ) : (
        <Redirect to="/" />
    );
};

export default UserFlow;
