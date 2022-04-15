import "../../styles/community.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const OrgCard = ({view}) => {
    // document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    // const [orgs, setOrgs] = useState([]);

    // useEffect(() => {
    //     const getOrgs = async () => {
    //         const orgDataJson = await fetch(`${BASE_API_URL}/org`);
    //         const orgData = await orgDataJson.json();

    //         if (orgData.orgs) {
    //             setOrgs(orgData.orgs);
    //         } else {
    //             notyf.error("Some error occured");
    //         }
    //     };

    //     try {
    //         getOrgs();
    //     } catch (err) {
    //         notyf.error("some error occured");
    //     }
    // }, []);

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