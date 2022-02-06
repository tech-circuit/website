import { useEffect, useState } from "react";
import { Notyf } from "notyf";
import BASE_API_URL from "../constants";
import { Redirect, Link } from "react-router-dom";
import "../styles/user-flow.css";
import {
    FaGithub,
    FaLink,
    FaLinkedin,
    FaPlusCircle,
    FaTrash,
    FaInstagram,
} from "react-icons/fa";
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
    const [skills, setSkills] = useState([]);
    const [links, setLinks] = useState([]);
    const [linksObj, setLinksObj] = useState({});
    const tcSkills = [
        "Web Dev",
        "UI Design",
        "Web Development",
        "Visual Design",
        "ksjbcdjbcn",
        "ksdjncskjcnsdkjcn",
        "skjdncsnckjdncdc",
        "software",
    ];
    const [user, setUser] = useState({});
    const topNavLineStyle = {
        width: `${
            page === 5 ? page * 100 : page === 1 ? page * 100 : page * 100 - 50
        }%`,
    };

    const handleSkill = (e) => {
        const card = e.target.classList.contains("skill-card")
            ? e.target
            : e.target.parentElement;
        if (!card.classList.contains("skill-card-active")) {
            if (skills.length < 6) {
                card.classList.add("skill-card-active");
                setSkills([...skills, card.textContent.trim()]);
            }
        } else {
            card.classList.remove("skill-card-active");
            setSkills(
                skills.filter((skill) => skill !== card.textContent.trim())
            );
        }
    };

    const getMatches = (input) => {
        let matchList = [];
        const titles = tcSkills;

        for (let i = 0; i < titles.length; i++) {
            if (titles[i].toLowerCase().indexOf(input.toLowerCase()) !== -1) {
                matchList.push(titles[i]);
            }
        }

        return matchList;
    };

    const search = (e) => {
        const cards = document.querySelectorAll(".skill-card");

        if (e.target.value.trim().length === 0) {
            document
                .querySelector(".skill-cards")
                .classList.remove("skill-cards-searching");
            cards.forEach((card) => {
                card.classList.remove("skill-card-hidden");
            });
        } else {
            const search = e.target.value.toLowerCase();
            cards.forEach((card) => {
                card.classList.add("skill-card-hidden");
            });
            document
                .querySelector(".skill-cards")
                .classList.add("skill-cards-searching");

            const matches = getMatches(search);
            // console.log(matches);
            for (let match of matches) {
                for (let card of cards) {
                    if (
                        card.textContent.toLowerCase().trim() ===
                        match.toLowerCase().trim()
                    ) {
                        card.classList.remove("skill-card-hidden");
                    }
                }
            }
        }
    };

    const getLinkLogo = (link) => {
        let logo = <FaLink className="create-link-brand" />;
        const platforms = {
            github: <FaGithub className="create-link-brand" />,
            linkedin: <FaLinkedin className="create-link-brand" />,
        };

        for (let platform of Object.keys(platforms)) {
            if (link.includes(platform)) {
                logo = platforms[platform];
            }
        }

        return logo;
    };

    const addLink = async () => {
        if (document.querySelector("#add-link-inp").value !== "") {
            let linkList = [];
            for (let linkNode of document.querySelectorAll(
                ".link-unit input"
            )) {
                linkList.push(linkNode.value.toLowerCase().trim());
            }

            setLinks(linkList);
            document.querySelector("#add-link-inp").value = "";
        } else {
            document
                .querySelector("#add-link-inp")
                .parentElement.classList.add("shake-anim");

            setTimeout(() => {
                document
                    .querySelector("#add-link-inp")
                    .parentElement.classList.remove("shake-anim");
            }, 1000);
        }
    };

    const removeLink = async (linkVal) => {
        let linkList = links.filter((link) => link !== linkVal);
        setLinks(linkList);
    };

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(
                `${BASE_API_URL}/user/info?access_token=${localStorage.getItem(
                    "authToken"
                )}`
            );
            const data = await res.json();
            setUser(data.user);

            if (data.user.skills.length !== 0 || data.user.links.length !== 0)
                window.location.href = "/";
        };
        getUser();
    }, []);
    useEffect(() => {
        if (skills.length >= 6) {
            for (let card of document.querySelectorAll(".skill-card")) {
                card.classList.add("skill-card-full");
            }
        } else {
            for (let card of document.querySelectorAll(".skill-card-full")) {
                card.classList.remove("skill-card-full");
            }
        }
    }, [skills]);
    useEffect(() => {
        let theObj = {};
        for (let link of links) {
            theObj[link] = getLinkLogo(link);
        }
        setLinksObj(theObj);

        if (links.length === 6) {
            document
                .querySelector("#add-link-unit")
                .classList.add("add-link-unit-hide");
        } else if (links.length < 6) {
            document
                .querySelector("#add-link-unit")
                .classList.remove("add-link-unit-hide");
        }
    }, [links]);
    useEffect(() => {
        const submit = async () => {
            const username = document.querySelector(
                "input[name='username']"
            ).value;
            const title = document.querySelector("input[name='title']").value;
            const country = document.querySelector(
                "select[name='country']"
            ).value;
            const state = document.querySelector("select[name='state']").value;
            const about = document.querySelector(
                "textarea[name='about']"
            ).value;

            const body = {
                username,
                title,
                country,
                state,
                about,
                skills: skills,
                links: links,
            };
            const submittedJSon = await fetch(
                `${BASE_API_URL}/user/update?access_token=${localStorage.getItem(
                    "authToken"
                )}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );
            const submitted = await submittedJSon.json();

            if (!submitted.done) {
                notyf.error("Some Error Occurred");
            }
        };

        if (page === 4) {
            document.querySelector(".next-page").textContent = "Done";
        } else {
            document.querySelector(".next-page").textContent = "Proceed";
        }

        if (page === 5) {
            document.querySelector(".bottom-nav").classList.add("exit-flow");
            // document.querySelector(".top-nav").classList.add("exit-flow-t");

            submit();
        }
        if (page === 6) setPage(5);
    }, [page, links, skills]);

    return (
        <div className="user-flow-cont">
            <div className="top-nav">
                <div
                    className={
                        page === 1
                            ? "progress-indicator pi-active"
                            : page > 1
                            ? "progress-indicator pi-finished"
                            : "progress-indicator"
                    }
                >
                    Basic
                    <div className="top-nav-line" style={topNavLineStyle}></div>
                </div>
                <div
                    className={
                        page === 2
                            ? "progress-indicator pi-active"
                            : page > 2
                            ? "progress-indicator pi-finished"
                            : "progress-indicator"
                    }
                >
                    Skills
                </div>
                <div
                    className={
                        page === 3
                            ? "progress-indicator pi-active"
                            : page > 3
                            ? "progress-indicator pi-finished"
                            : "progress-indicator"
                    }
                >
                    Links
                </div>
                <div
                    className={
                        page === 4
                            ? "progress-indicator pi-active"
                            : page > 4
                            ? "progress-indicator pi-finished"
                            : "progress-indicator"
                    }
                >
                    Clubs
                </div>
                <div
                    className={
                        page === 5
                            ? "progress-indicator pi-active"
                            : page > 5
                            ? "progress-indicator pi-finished"
                            : "progress-indicator"
                    }
                >
                    Finish
                </div>
            </div>

            <div
                id="page-1"
                className={
                    page === 1
                        ? "flow-page basic-page flow-page-active"
                        : page > 1
                        ? "flow-page basic-page passed"
                        : "flow-page basic-page toCome"
                }
            >
                <div className="basic-left">
                    <div className="flow-head-cont">
                        <h1 className="flow-name">{user.name}</h1>
                        <div className="flow-email">{user.email}</div>
                    </div>
                    <div className="flow-basic-unit">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="theVedanta_1"
                            value={user.username}
                        />
                    </div>
                    <div className="flow-basic-unit">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Web Developer, Designer, Blockchain Dev"
                            value={user.title}
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
                            value={user.about}
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

            <div
                id="page-2"
                className={
                    page === 2
                        ? "flow-page skills-page flow-page-active"
                        : page > 2
                        ? "flow-page skills-page passed"
                        : "flow-page skills-page toCome"
                }
            >
                <h2>Select upto 6 skills</h2>
                <div className="skills-search">
                    <div className="input">
                        <img src="/assets/magnifying-glass.svg" alt="alt" />
                        <input
                            type="text"
                            placeholder="Search Skills"
                            onKeyUp={(eve) => search(eve)}
                        />
                    </div>
                </div>

                <div className="skill-cards">
                    {tcSkills.map((skill) => {
                        return (
                            <div
                                key={tcSkills.indexOf(skill)}
                                className="skill-card"
                                onClick={(eve) => handleSkill(eve)}
                            >
                                <h1>{skill}</h1>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                id="page-3"
                className={
                    page === 3
                        ? "flow-page links-page flow-page-active"
                        : page > 3
                        ? "flow-page links-page passed"
                        : "flow-page links-page toCome"
                }
            >
                <div className="create-links input">
                    <label>Add upto 6 links</label>
                    <div className="link-unit" id="add-link-unit">
                        <FaLink className="create-link-brand" />
                        <input
                            maxLength="200"
                            type="text"
                            placeholder="example: https://github.com/kevin"
                            id="add-link-inp"
                        />
                        <FaPlusCircle
                            className="create-link-opt"
                            onClick={addLink}
                        />
                    </div>
                    {links.map((link) => {
                        return (
                            <div className="link-unit">
                                {linksObj[link]}
                                <input
                                    maxLength="200"
                                    type="text"
                                    placeholder="example: https://github.com/kevin"
                                    value={link}
                                    readonly
                                    key={`link-${links.indexOf(link)}`}
                                    id={`link-${links.indexOf(link)}`}
                                />
                                <FaTrash
                                    className="create-link-opt create-link-delete"
                                    onClick={() =>
                                        removeLink(
                                            document.querySelector(
                                                `#link-${links.indexOf(link)}`
                                            ).value
                                        )
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                id="page-4"
                className={
                    page === 4
                        ? "flow-page org-page flow-page-active"
                        : page > 4
                        ? "flow-page org-page passed"
                        : "flow-page org-page toCome"
                }
            >
                <div className="coms">
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
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
                        <button className="view">Request to join</button>
                    </div>
                    <div className="org-page-ded"></div>
                </div>
            </div>

            <div
                id="page-5"
                className={
                    page === 5
                        ? "flow-page finish-page flow-page-active"
                        : page > 5
                        ? "flow-page finish-page passed"
                        : "flow-page finish-page toCome"
                }
            >
                <img src="/assets/flow.png" alt="flow" />
                <h1>Post a project</h1>
                <p>
                    Create a project to show off your skills to the community ;)
                </p>

                <div className="finish-btns">
                    <Link to="/">Skip for now</Link>
                    <Link className="finish-create" to="/">
                        Create
                    </Link>
                </div>
            </div>

            <div className="bottom-nav">
                <button
                    className="back-page"
                    disabled={page === 1 ? true : false}
                    onClick={() => {
                        setPage(page - 1);
                    }}
                >
                    Go back
                </button>
                <button
                    className="next-page"
                    onClick={() => {
                        setPage(page + 1);
                    }}
                >
                    Proceed
                </button>
            </div>
        </div>
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

    return auth === "undefined" ? (
        ""
    ) : auth === true ? (
        <Component pfp={pfp} />
    ) : (
        <Redirect to="/" />
    );
};

export default UserFlow;
