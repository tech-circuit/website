const SelectUser = ({ inp, users, setSelect }) => {
    return (
        <div className="select-user">
            {users.map((user) => (
                <div
                    className="user-cell"
                    key={user._id}
                    onClick={() => {
                        setSelect(false);
                        inp.value = user.name;
                    }}
                >
                    <img src={user.pfp_url} alt="pfp" />
                    <h4>{user.name}</h4>
                </div>
            ))}
        </div>
    );
};

export default SelectUser;
