import "../styles/org.css";
import { FaBehanceSquare, FaChevronLeft, FaTimesCircle } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkogo from "../getLinkLogo";
import MemberCard from "./utility/MemberCard";
import SelectUser from "./utility/SelectUser";

const OrgView = ({ socket }) => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [org, setOrg] = useState({});
    const [members, setMembers] = useState([]);
    const { orgId } = useParams();
    const [id, setId] = useState();
    const [tab, setTab] = useState("Org Info");
    const [invited, setInvited] = useState(false);
    const [reqSent, setReqSent] = useState(false);

    function changeTab(e) {
        setTab(e.target.textContent);
    }

    useEffect(() => {
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
            getId();
        } catch (err) {
            notyf.error("some error occured");
        }
    }, []);

    useEffect(() => {
        const getOrg = async () => {
            const orgDataJson = await fetch(`${BASE_API_URL}/org/id/${orgId}`);
            const orgData = await orgDataJson.json();
            const orgToSet = orgData.org;

            if (orgToSet) {
                setOrg(orgToSet);
                if (orgToSet.requests.includes(id)) {
                    setReqSent(true);
                } else if (orgToSet.invites.includes(id)) {
                    setInvited(true);
                }
            } else {
                notyf.error("Some error occured");
                console.log("err");
            }
        };

        try {
            getOrg();
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            const req = params.get("requests");
            if (req) {
                setTab("Membership requests");
            }
        } catch (err) {
            notyf.error("some error occured");
        }
    }, [orgId, id]);

    const getUser = async (userId) => {
        const userDataJson = await fetch(`${BASE_API_URL}/user/id/${userId}`);
        const userData = await userDataJson.json();

        if (userData.user) {
            return userData.user;
        } else {
            console.log("error");
        }
    };

    const addPostToMembers = (admins, members, alumni) => {
        const membersToAdd = [];
        admins.forEach((admin) => {
            membersToAdd.push({ id: admin, post: "Admin" });
        });
        members.forEach((member) => {
            membersToAdd.push({ id: member, post: "Member" });
        });
        alumni.forEach((alumni) => {
            membersToAdd.push({ id: alumni, post: "Alumni" });
        });
        return membersToAdd;
    };

    useEffect(() => {
        if (org.admins) {
            let allMembers = addPostToMembers(
                org.admins,
                org.members,
                org.alumni
            );

            if (members.length < allMembers.length) {
                const membersToInflate = [];

                allMembers.forEach(async (member) => {
                    let user = await getUser(member.id);
                    membersToInflate.push({ user: user, post: member.post });

                    if (membersToInflate.length === allMembers.length) {
                        let sortedList = [];

                        allMembers.forEach((member) => {
                            membersToInflate.forEach((memberToInflate) => {
                                if (memberToInflate.user._id === member.id) {
                                    sortedList.push(memberToInflate);
                                    if (
                                        sortedList.length === allMembers.length
                                    ) {
                                        console.log(sortedList);
                                        setMembers(sortedList);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        }
    }, [org, members]);

    return (
        <>
            {org.admins && org.admins.includes(id) && (
                <header className="head-2 profile-tabs org-tabs">
                    <div className="left-tabs">
                        <h3
                            onClick={(eve) => changeTab(eve)}
                            className={
                                tab === "Org Info" ? "profile-tab-active" : ""
                            }
                        >
                            Org Info
                        </h3>
                        <h3
                            className={
                                tab === "Membership requests"
                                    ? "profile-tab-active"
                                    : ""
                            }
                            onClick={(eve) => changeTab(eve)}
                        >
                            Membership requests
                        </h3>
                        <h3
                            className={
                                tab === "Event requests"
                                    ? "profile-tab-active"
                                    : ""
                            }
                            onClick={(eve) => changeTab(eve)}
                        >
                            Event requests
                        </h3>
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
            )}

            {tab === "Org Info" && (
                <OrgInfo org={org} id={id} orgId={orgId} members={members} reqSent={reqSent} invited={invited} socket={socket}/>
            )}
            {tab === "Membership requests" && <MemReqs orgId={orgId} socket={socket} />}
        </>
    );
};

const OrgInfo = ({ org, id, orgId, members, reqSent, invited, socket }) => {
    const requestOrgJoin = async (id) => {
        const res = await fetch(
            `${BASE_API_URL}/org/req/${id}?access_token=${localStorage.getItem(
                "authToken"
            )}`,
            { method: "POST", headers: { "Content-Type": "application/json" } }
        );
        const data = await res.json();

        if (data.already) {
            notyf.error("Already Requested to this Org");
        } else if (data.done) {
            socket.emit("notif", data.receivers);
            notyf.success("Request sent");
            window.location.reload();
        } else {
            notyf.error("Some Error has Occurred");
        }
    };
    
    return (
        <section className="org-cont">
            <Link className="org-back" to="/community">
                <FaChevronLeft />
                Back
            </Link>
            <div className="org-wrap">
                <div className="main-info">
                    <div className="main-box">
                        <h1>{org.name}</h1>
                        <p>
                            {org.isIndependent ? "Independent" : org.institute}
                        </p>
                        <img src={org.logo_url} className="org-pfp" alt="alt" />
                        <p className="site">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={org.website_url}
                            >
                                {org.website_url}
                            </a>
                        </p>
                        <div className="org-links">
                            {/* <h4>
                                {org.links > 0 //galat hai
                                    ? "Visit"
                                    : ""}
                            </h4> */}
                            <div className="orglink-icons">
                                {org.links
                                    ? org.links
                                          .slice(0)
                                          .reverse()
                                          .map((link) => {
                                              return (
                                                  <a
                                                      href={link}
                                                      key={link}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                  >
                                                      {getLinkogo(link)}
                                                  </a>
                                              );
                                          })
                                    : ""}
                            </div>
                        </div>
                        {org.admins && org.admins.includes(id) ? (
                            <>
                                <Link
                                    to={`/edit-org/${orgId}`}
                                    className="edit-org-btn"
                                >
                                    Edit organisation
                                </Link>
                                <button className="leave-org">
                                    Leave organisation
                                </button>
                            </>
                        ) : (
                            <>
                                {invited ? (
                                    <>
                                        <p>You have been invited to join this organisation! Accept/Reject the offer</p>
                                        <div className="decide-mem">
                                            <button className="accept-mem">
                                                <BsFillCheckCircleFill />
                                            </button>
                                            <button className="decline-mem">
                                                <FaTimesCircle />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {reqSent ? (
                                            <button className="ReqJoinButton" disabled style={{ opacity: 0.6 }}>
                                                Already Requested
                                            </button>
                                        ) : (
                                            <button className="ReqJoinButton" onClick={() =>
                                                requestOrgJoin(orgId)
                                            }>
                                                Request to Join
                                            </button> 
                                        )}
                                    </>
                                )}
                            </>                        
                        )}
                    </div>
                </div>
                <div className="other-info">
                    <div className="org-div aboutorg">
                        <h3>Organisation Info</h3>
                        <p>{org.description}</p>
                    </div>
                    <div className="org-div current-mods">
                        <h3>
                            Members (
                            {org.admins
                                ? org.members.length +
                                  org.admins.length +
                                  org.alumni.length
                                : ""}
                            )
                        </h3>
                        <div className="members">
                            {members
                                ? members.slice(0).map((member) => {
                                      return (
                                          <MemberCard
                                              key={member.user._id}
                                              user={member.user}
                                              post={member.post}
                                          />
                                      );
                                  })
                                : ""}
                        </div>
                    </div>
                    {/* <div className="org-div hosted-events">
                        <h3>Hosted Events</h3>
                        <table>
                            <tr>
                                <td>Robotronics' 2020</td>
                                <td>February 2020</td>
                            </tr>
                            <tr>
                                <td>AlphaNODE 2019</td>
                                <td>November 2019</td>
                            </tr>
                            <tr>
                                <td>Intratech 2019</td>
                                <td>August 2019</td>
                            </tr>
                        </table>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

const MemReqs = ({ orgId, socket }) => {
    const [users, setUsers] = useState([]);
    const [select, setSelect] = useState(false);
    const [members, setMembers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [alumni, setAlumni] = useState([]);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userDataJson = await fetch(`${BASE_API_URL}/user/all`);
                const userData = await userDataJson.json();

                if (userData.users) {
                    setUsers(userData.users);
                } else {
                    notyf.error("Some error occured");
                }
            } catch (err) {
                notyf.error("Some Error has occurred");
            }
        };

        getUsers();
    }, []);

    const getMatches = (input) => {
        let matchList = [];

        for (let i = 0; i < users.length; i++) {
            if (
                users[i].name
                    .trim()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) !== -1
            ) {
                matchList.push(users[i].name.trim().toLowerCase());
            }
        }

        return matchList;
    };

    const search = () => {
        const searchVal = document
            .querySelector("#addModName")
            .value.trim()
            .toLowerCase();

        let matches = getMatches(searchVal);

        if (searchVal === "") {
            for (let cell of document.querySelectorAll(".user-cell")) {
                cell.classList.remove("hide");
            }
        } else {
            for (let cell of document.querySelectorAll(".user-cell")) {
                cell.classList.add("hide");
            }

            for (let match of matches) {
                for (let { name } of users) {
                    if (match === name.trim().toLowerCase()) {
                        for (let cellName of document.querySelectorAll(
                            ".user-cell h4"
                        )) {
                            if (
                                cellName.textContent.trim().toLowerCase() ===
                                name.trim().toLowerCase()
                            ) {
                                cellName.parentElement.classList.remove("hide");
                            }
                        }
                    }
                }
            }
        }
    };

    const inviteOrgJoin = async (orgId, inviteId) => {
        const res = await fetch(
            `${BASE_API_URL}/org/invite/${orgId}?access_token=${localStorage.getItem(
                "authToken"
            )}`,
            { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ invite: inviteId }) }
        );
        const data = await res.json();

        if (data.already) {
            notyf.error("Already Invited to this Org");
        } else if (data.done) {
            socket.emit("notif", data.receivers);
            notyf.success("Invited to this Org");
        } else {
            notyf.error("Some Error has Occurred");
        }
    };

    const addPerson = () => {
        const personId = document
            .querySelector("#addModName")
            .getAttribute("data-user");
        const person = users.find((user) => user._id === personId);
        if (person) {
            document.querySelector("#addModName").value = "";
            document.querySelector("#addModName").setAttribute("data-user", "");
            const personId = person._id
            inviteOrgJoin(orgId, personId);
        } else {
            notyf.error("Please select a user");
        }
    };

    return (
        <section className="member-reqs">
            <div className="invite-mem">
                <h1>Invite Members</h1>
                <div className="invitation-block">
                    <div className="mod-wrap">
                        <div className="mod-input-wrap">
                            <input
                                id="addModName"
                                placeholder="Name"
                                className="mod-input"
                                type="text"
                                style={{ cursor: "pointer" }}
                                onChange={search}
                                onClick={() => setSelect(!select)}
                            />
                            {select ? (
                                <SelectUser
                                    inp={document.querySelector("#addModName")}
                                    users={users}
                                    setSelect={setSelect}
                                />
                            ) : (
                                ""
                            )}
                            <FaPlusCircle
                                className="addMemIcon"
                                onClick={addPerson}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="sent-reqs">
                <h1>Review membership requests</h1>
                <div className="sent-cards">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div className="sent-card" key={i}>
                            <img src="/assets/ishana.jpg" alt="acc" />
                            <h4>Ishaan Das</h4>
                            <h5>
                                Highschool student, Filmmaker, UI/UX Designer
                            </h5>
                            <div className="sent-links">
                                <a href="/" className="sent-link">
                                    <FaBehanceSquare />
                                </a>
                            </div>

                            <div className="decide-mem">
                                <button className="accept-mem">
                                    <BsFillCheckCircleFill />
                                </button>
                                <button className="decline-mem">
                                    <FaTimesCircle />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrgView;
