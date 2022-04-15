import "../../styles/user.css";
import { FaInstagram } from "react-icons/fa";

const UserCard = ({view}) => {
    // document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     const getUsers = async () => {
    //         const userDataJson = await fetch(`${BASE_API_URL}/user/all`);
    //         const userData = await userDataJson.json();

    //         if (userData.users) {
    //             setUsers(userData.users);
    //         } else {
    //             notyf.error("Some error occured");
    //         }
    //     };

    //     try {
    //         getUsers();
    //     } catch (err) {
    //         notyf.error("some error occured");
    //     }
    // })

    return(
        <>
            <div className="com user">
                <div to="/" onClick={view}>
                    <a href="/user">
                        <img src="/assets/samvr.jpeg" alt="alt" />
                        <h2>Ishaan Das</h2>
                        <p>Designer</p>
                        <p>ishaanndas</p>
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
                    </a>
                </div>
            </div>
        </>
    )
}

export default UserCard;