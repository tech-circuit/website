import "../styles/org.css";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkogo from "../getLinkLogo";
import MemberCard from "./utility/MemberCard";

const OrgView = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [org, setOrg] = useState({});
    const [members, setMembers] = useState([]);
    const { orgId } = useParams();

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
            return userData.user
        } else {
            console.log("error")
        }
    };

    const addPostToMembers = (admins, members, alumni) => {
        const membersToAdd = [];
        admins.forEach((admin) => {
            membersToAdd.push({id: admin, post: "Admin"});
        }
        );
        members.forEach((member) => {
            membersToAdd.push({id: member, post: "Member"});
        }
        );
        alumni.forEach((alumni) => {
            membersToAdd.push({id: alumni, post: "Alumni"});
        }
        );
        return membersToAdd;
    }

    useEffect(() => {
        if (org.admins) {
            let allMembers = addPostToMembers(org.admins, org.members, org.alumni);
            console.log(members.length)
            if (members.length < allMembers.length) {
                const membersToInflate = []
                allMembers.forEach(async (member) => {
                    let user = await getUser(member.id)
                    membersToInflate.push({user: user, post: member.post});
                    if (membersToInflate.length === allMembers.length) {
                        let sortedList = []
                        allMembers.forEach(member => {
                            membersToInflate.forEach(memberToInflate => {
                                if (memberToInflate.user._id === member.id) {
                                    sortedList.push(memberToInflate)
                                    if (sortedList.length === allMembers.length) {
                                        console.log(sortedList)
                                        setMembers(sortedList)
                                    }
                                }
                            })
                        })
                    }
                })
            }
        }
    }, [org, members])

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
                            {org.isIndependent
                                ? "Independent"
                                : org.institute}
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
                        <button className="ReqJoinButton">
                            Request to Join
                        </button>
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
                            {org.admins ? org.members.length + org.admins.length + org.alumni.length : ""})
                        </h3>
                        <div className="members">
                            {members
                                ? members
                                      .slice(0)
                                      .map((member) => {
                                          return (
                                            <MemberCard key={member.user._id} user={member.user} post={member.post}/>
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

export default OrgView;
