import { useEffect, useState } from "react";
import notyf from "../tcNotyf";
import BASE_API_URL from "../constants";
import { Redirect, Link } from "react-router-dom";
import "../styles/user-flow.css";
import getLinkLogo from "../getLinkLogo";
import {
    FaLink,
    FaPlusCircle,
    FaTrash,
    FaPen,
    FaTrashAlt,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { shake, validate } from "../validate";

const Component = ({ pfp, user, socket }) => {
    const [page, setPage] = useState(1);
    const [skills, setSkills] = useState([]);
    const [links, setLinks] = useState([]);
    const [linksObj, setLinksObj] = useState({});
    const [usernameTaken, setUsernameTaken] = useState(false);
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
    const [pfpLink, setPfpLink] = useState("");
    const topNavLineStyle = {
        width: `${
            page === 4 ? page * 100 : page === 1 ? page * 100 : page * 100 - 50
        }%`,
    };
    const [orgs, setOrgs] = useState([]);

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

    const imgUpload = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const b64 = reader.result.split("base64,")[1];
            fetch(`${BASE_API_URL}/image/upload`, {
                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify({
                    b64,
                }),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                },
            })
                .then(async (response) => {
                    const resp = await response.json();
                    setPfpLink(resp.link.toString());
                })
                .catch((error) => console.log(error));
        };
    };

    const imgCheck = (e) => {
        const inputFile = e.target.files[0];
        const allowedExt = ["png", "jpg", "jpeg", "gif"];

        if (allowedExt.includes(inputFile.name.split(".")[1])) {
            imgUpload(inputFile);
            document.querySelector("#pfpUpload").src =
                URL.createObjectURL(inputFile);
        } else {
            notyf.error("Invalid file type");
        }
    };

    // const requestOrgJoin = async (id) => {
    //     const res = await fetch(
    //         `${BASE_API_URL}/org/req/${id}?access_token=${localStorage.getItem(
    //             "authToken"
    //         )}`,
    //         { method: "POST", headers: { "Content-Type": "application/json" } }
    //     );
    //     const data = await res.json();

    //     if (data.already) {
    //         notyf.error("Already Requested to this Org");
    //     } else if (data.done) {
    //         socket.emit("notif", data.receivers);
    //         setPage(page + 1);
    //     } else {
    //         notyf.error("Some Error has Occurred");
    //     }
    // };

    const checkUsernameTaken = async () => {
        try {
            const username = document
                .querySelector("input[name='username']")
                .value.trim();
            const usernameUpdateJson = await fetch(
                `${BASE_API_URL}/user/update?access_token=${localStorage.getItem(
                    "authToken"
                )}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username }),
                }
            );
            const usernameUpdated = await usernameUpdateJson.json();

            if (usernameUpdated.success) {
                setUsernameTaken(false);
            } else {
                setPage(1);
                setUsernameTaken(true);
                shake(document.querySelector("input[name='username']"));
            }
        } catch (err) {
            setPage(1);
            setUsernameTaken(true);
            shake(document.querySelector("input[name='username']"));
        }
    };

    useEffect(() => {
        const getOrgs = async () => {
            const res = await fetch(
                `${BASE_API_URL}/org?access_token=${localStorage.getItem(
                    "authToken"
                )}`
            );
            const data = await res.json();

            setOrgs(data.orgs);
        };
        getOrgs();
    }, [user]);
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
            const username = document
                .querySelector("input[name='username']")
                .value.trim();
            const title = document.querySelector("input[name='title']").value;
            const country = document
                .querySelector("select[name='country']")
                .value.trim();
            const state = document.querySelector("select[name='state']").value;
            const about = document
                .querySelector("textarea[name='about']")
                .value.trim();

            const body = {
                username,
                title,
                country,
                state,
                about,
                skills: skills,
                links: links,
                pfp_url: pfpLink === "" ? user.pfp_url : pfpLink,
                setUp: true,
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

        if (page === 2) {
            if (!validate(["username", "title"], false)) {
                setPage(1);
            } else {
                checkUsernameTaken();
            }
        }

        if (page === 3) {
            document.querySelector(".next-page").textContent = "Done";
        } else {
            document.querySelector(".next-page").textContent = "Proceed";
        }

        if (page === 4) {
            document.querySelector(".bottom-nav").classList.add("exit-flow");
            submit();
        }
        if (page === 5) setPage(4);
    }, [page, links, skills, pfpLink, user]);

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
                {/* <div
                    className={
                        page === 4
                            ? "progress-indicator pi-active"
                            : page > 4
                            ? "progress-indicator pi-finished"
                            : "progress-indicator"
                    }
                >
                    Clubs
                </div> */}
                <div
                    className={
                        page === 4
                            ? "progress-indicator pi-active"
                            : page > 4
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
                        <label htmlFor="username">Username *</label>
                        <input
                            type="text"
                            name="username"
                            required
                            placeholder="theVedanta_1"
                            defaultValue={user.username}
                        />
                        {usernameTaken ? (
                            <p style={{ color: "#ff6b6b" }}>
                                Username is taken
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flow-basic-unit">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Web Developer, Designer, Blockchain Dev"
                            defaultValue={user.title}
                        />
                    </div>
                    <div className="flow-double-cont">
                        <div className="flow-basic-unit">
                            <label htmlFor="country">Country</label>
                            <select name="country" required>
                                <option value="">None</option>
                            </select>
                        </div>
                        <div className="flow-basic-unit">
                            <label htmlFor="state">State</label>
                            <select name="state" required>
                                <option value="">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="flow-basic-unit">
                        <label htmlFor="about">About me</label>
                        <textarea
                            type="text"
                            name="about"
                            defaultValue={user.about ? user.about : ""}
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. Pretium eget ut et blandit cursus. Mattis malesuada at semper cursus."
                        ></textarea>
                    </div>
                </div>
                <div className="basic-right">
                    <img src={pfp} alt="pfp" id="pfpUpload" />
                    <p>We recommend an image of 500x500px</p>
                    <div className="basic-btn-hold">
                        <label className="pfp-edit" htmlFor="pfpInp">
                            <FaPen />
                            Edit
                        </label>
                        <input
                            type="file"
                            name="pfp"
                            id="pfpInp"
                            style={{ display: "none" }}
                            onChange={(eve) => imgCheck(eve)}
                            accept=".gif,.jpg,.jpeg,.png"
                        />
                        <button
                            className="pfp-delete"
                            onClick={() => {
                                setPfpLink("/assets/userFlowIcon.svg");
                                document.querySelector("#pfpUpload").src =
                                    "/assets/userFlowIcon.svg";
                            }}
                        >
                            <FaTrashAlt />
                            Delete
                        </button>
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
                            <div className="link-unit" key={link}>
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

            {/* <div
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
                    {orgs
                        ? orgs.map((org) => {
                              return (
                                  <div className="com" key={org._id}>
                                      <img src={org.logo_url} alt="alt" />
                                      <h2>{org.name}</h2>
                                      <p>
                                          {org.isIndependent
                                              ? ""
                                              : org.institute}
                                      </p>
                                      <p>{org.description}</p>
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
                                          {org.links.map((link) => {
                                              return (
                                                  <a
                                                      href={link}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                  >
                                                      {getLinkLogo(link)}
                                                  </a>
                                              );
                                          })}
                                      </div>
                                      <button
                                          className="view"
                                          onClick={() =>
                                              requestOrgJoin(org._id)
                                          }
                                      >
                                          Request to join
                                      </button>
                                  </div>
                              );
                          })
                        : ""}
                    <div className="org-page-ded"></div>
                </div>
            </div> */}

            <div
                id="page-4"
                className={
                    page === 4
                        ? "flow-page finish-page flow-page-active"
                        : page > 4
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
                    <Link to="/projects" className="finish-create">
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

const UserFlow = ({ socket }) => {
    const [pfp, setPfp] = useState(false);
    const [auth, setAuth] = useState("undefined");
    const [user, setUser] = useState({});

    useEffect(() => {
        const getPfp = async () => {
            try {
                const pfpData = await fetch(
                    `${BASE_API_URL}/user/info?access_token=${localStorage.getItem(
                        "authToken"
                    )}`
                );
                const pfpJson = await pfpData.json();

                if (pfpJson.user) {
                    setPfp(pfpJson.user.pfp_url);
                    setUser(pfpJson.user);
                    setAuth(true);
                    pfpJson.user.setUp
                        ? (window.location.href = "/404")
                        : console.log("Please sign up");
                } else {
                    setAuth(false);
                }
            } catch (err) {
                notyf.error("Some Error Occured");
                setAuth(false);
            }
        };

        getPfp();
    }, []);

    return auth === "undefined" ? (
        <div className="load-cont">
            <ClipLoader />
        </div>
    ) : auth === true ? (
        <Component pfp={pfp} user={user} socket={socket} />
    ) : (
        <Redirect to="/" />
    );
};

export default UserFlow;
