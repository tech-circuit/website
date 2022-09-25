import "../../styles/user.css";
// import getLinkogo from "../../getLinkLogo";
// import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserCard = ({ user, post }) => {
    return (
        <>
            <div className="com user org-user-card">
                <Link to={`/user/${user._id}`}>
                    {/* <a href={`user/${user._id}`}> */}
                    <img src={user.pfp_url} alt="alt" />
                    <h2>{user.name}</h2>
                    <p>{post}</p>
                </Link>
            </div>
        </>
    );
};

export default UserCard;