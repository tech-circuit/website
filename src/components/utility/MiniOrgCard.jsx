import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MiniOrgCard = ({ org, leave }) => {
    return (
        <div className="profile-org-card">
            <div className="profile-org-img">
                <img src={org.logo_url} alt="org-logo" />
            </div>
            <div className="profile-org-info">
                <Link to={`/org/${org._id}`}>{org.name}</Link>
                <p>{org.description}</p>
            </div>
            {leave && (
                <div className="leave-opt">
                    <button>
                        <FaRegArrowAltCircleRight />
                        &nbsp;&nbsp;Leave
                    </button>
                </div>
            )}
        </div>
    );
};

export default MiniOrgCard;
