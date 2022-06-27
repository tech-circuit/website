import "../../styles/community.css";
import getLinkogo from "../../getLinkLogo";
import { Link } from "react-router-dom";

const OrgCard = ({ org, id }) => {
    return (
        <div className="com">
            <img src={org.logo_url} alt="alt" />
            <h2>{org.name}</h2>
            <p>{org.isIndependent ? "Independent" : org.institute}</p>
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
                    : ""}
            </div>

            {org.admins.includes(id) ? (
                <Link to={`/edit-org/${org._id}`} className="view">
                    Edit Organisation
                </Link>
            ) : (
                <Link to={`/org/${org._id}`} className="view">
                    View Organisation
                </Link>
            )}
        </div>
    );
};

export default OrgCard;
