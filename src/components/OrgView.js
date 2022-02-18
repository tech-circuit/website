import "../styles/org.css";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import BASE_API_URL from "../constants";
import { Notyf } from "notyf";
import getLinkogo from "../getLinkLogo";

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

const OrgView = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    const [org, setOrg] = useState([]);
    const {orgId} = useParams()

    useEffect(() => {

        const getOrg = async () => {
            const orgDataJson = await fetch(`${BASE_API_URL}/org/id/${orgId}`);
            const orgData = await orgDataJson.json();

            if (orgData.org) {
                setOrg(orgData.org);
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getOrg();
            // getUsers();
        } catch (err) {
            notyf.error("some error occured");
        }
    }, [orgId]);

    return(
        <section className="org-cont">
            <Link className="org-back" to="/forum">
                <FaChevronLeft />
                Back
            </Link>
            <div className="org-wrap">
                <div className="main-info">
                    <div className="main-box">
                        <h1>{org.name}</h1>
                        <p>
                            {org.isIndependant
                            ? "Independant"
                            : org.institute}
                        </p>
                        <img src={org.logo_url} className="org-pfp" alt="alt" />
                        <p className="site">
                            <a 
                                target="_blank" 
                                rel="noreferrer"
                                href={org.website_url}
                            >{org.website_url}
                            </a>
                        </p>
                        <div className="org-links">   
                            <h4>
                                {org.links > 0 //galat hai
                                ? "Visit"
                                : ""}
                            </h4>
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
                        <button className="ReqJoinButton">Request to Join</button>                  
                    </div>
                </div>
                <div className="other-info">                
                    <div className="org-div aboutorg">
                        <h3>Organisation Info</h3>
                        <p>{org.description}</p>
                    </div>
                    <div className="org-div current-mods">
                        <h3>Current Members ({org.members ? org.members.length : ""})</h3>
                        <div>
                            {org.members
                                ? org.members
                                        .slice(0)
                                        .reverse()
                                        .map((member) => {
                                            return (                                                  
                                            <div className="mod-div">
                                                <img src="/assets/samvr.jpeg" alt="alt" />
                                                <div className="mod-text">
                                                    <h4>{member.name}</h4>
                                                    <p>{member.pos}</p>
                                                </div>
                                                </div>
                                            );
                                        })
                                : ""}
                        </div>
                    </div>
                    <div className="org-div hosted-events">
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
                    </div>
                </div>
            </div>

        </section>
    )
}

export default OrgView;