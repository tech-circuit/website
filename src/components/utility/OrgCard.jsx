import "../../styles/community.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const OrgCard = ({view}) => {
    return(
        <>
        <div className="com">
            <img src="/assets/samvr.jpeg" alt="alt" />
            <h2>Tech Syndicate</h2>
            {/* <p>
                {org.isIndependant
                    ? "Independant"
                    : org.institute}
            </p> */}
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
            <Link className="view" to="/" onClick={view}>
                View Page
            </Link>
        </div>
        </>
    )
}

export default OrgCard;