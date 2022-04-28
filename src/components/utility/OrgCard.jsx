import "../../styles/community.css";
import { Link } from "react-router-dom";
import getLinkogo from "../../getLinkLogo";

const OrgCard = ({ org }) => {
    return(
        <>
        <div className="com">
            <img src={org.logo_url} alt="alt" />
            <h2>{org.name}</h2>
            <p>
                {org.isIndependant
                    ? "Independent"
                    : org.institute}
            </p>
            {/* <p>Delhi Public School, Vasant Kunj</p> */}
            <div className="socials">
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
                    : ""
                }
            </div>
            <Link className="view" to={`org/${org._id}`}>
                View Page
            </Link>
        </div>
        </>
    )
}

export default OrgCard;