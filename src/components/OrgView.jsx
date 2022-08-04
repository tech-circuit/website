import "../styles/org.css";
import { FaBehanceSquare, FaChevronLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkogo from "../getLinkLogo";
import MemberCard from "./utility/MemberCard";
import SelectUser from "./utility/SelectUser";

const OrgView = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [org, setOrg] = useState({});
    const [members, setMembers] = useState([]);
    const { orgId } = useParams();
    const [id, setId] = useState("");
    const [tab, setTab] = useState("Org Info");

    function changeTab(e) {
        setTab(e.target.textContent);
    }

    useEffect(() => {
        const getOrg = async () => {
            const orgDataJson = await fetch(`${BASE_API_URL}/org/id/${orgId}`);
            const orgData = await orgDataJson.json();
            const orgToSet = orgData.org;

            if (orgToSet) {
                setOrg(orgToSet);
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getOrg();
        } catch (err) {
            notyf.error("some error occured");
        }
    }, [orgId]);

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
                <OrgInfo org={org} id={id} orgId={orgId} members={members} />
            )}
            {tab === "Membership requests" && <MemReqs />}
        </>
    );
};

const OrgInfo = ({ org, id, orgId, members }) => {
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
                            <button className="ReqJoinButton">
                                Request to Join
                            </button>
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

const MemReqs = () => {
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

    const addPerson = () => {
        const pos = document.querySelector("#addModPos").value;
        const personId = document
            .querySelector("#addModName")
            .getAttribute("data-user");
        const person = users.find((user) => user._id === personId);

        if (person) {
            pos === "admin"
                ? setAdmins([...admins, person._id])
                : pos === "member"
                ? setMembers([...members, person._id])
                : setAlumni([...alumni, person._id]);

            const personForUI = users.find((user) => user._id === person._id);
            personForUI.pos = pos;

            setPersons([...persons, personForUI]);
            document.querySelector("#addModName").value = "";
            document.querySelector("#addModName").setAttribute("data-user", "");
            document.querySelector("#addModPos").value = "member";
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
                            <select
                                id="addModPos"
                                placeholder="Position"
                                className="mod-input"
                            >
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                                <option value="alumni">Alumni</option>
                            </select>
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
                    <div className="sent-card">
                        <img src="/assets/account.png" alt="acc" />
                        <h4>Ishaan Das</h4>
                        <h5>Highschool student, Filmmaker, UI/UX Designer</h5>
                        <div className="sent-links">
                            <a href="/" className="sent-link">
                                <FaBehanceSquare />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrgView;
