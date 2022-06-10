import { ClipLoader } from "react-spinners";

const SelectUser = ({ inp, users, setSelect }) => {
    return (
        <div className="select-user">
            {users.length !== 0 ? (
                users.map((user) => (
                    <div
                        className="user-cell"
                        key={user._id}
                        onClick={() => {
                            setSelect(false);
                            inp.value = user.name;
                            inp.setAttribute("data-user", user._id);
                        }}
                    >
                        <img src={user.pfp_url} alt="pfp" />
                        <h4>{user.name}</h4>
                    </div>
                ))
            ) : (
                <ClipLoader />
            )}
        </div>
    );
};

export default SelectUser;
