import "../../styles/user.css";
import getLinkogo from "../../getLinkLogo";
// import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserCard = ({ user, post }) => {
    return (
        <>
            <div className="com user" style={{ width: "30%", height: "22vw", marginRight: "3vh", marginTop: "1vh" }}>
                <Link to={`/user/${user._id}`}>
                    {/* <a href={`user/${user._id}`}> */}
                    <img src={user.pfp_url} alt="alt" />
                    <h2>{user.name}</h2>
                    <p>{post}</p>
                    <div className="socials">
                            {user.links
                                ? user.links
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
                </Link>
            </div>
        </>
    );
};

export default UserCard;
