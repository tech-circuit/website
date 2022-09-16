import { ClipLoader } from "react-spinners";

const SelectOrg = ({ inp, orgs, setSelect }) => {
    return (
        <div className="select-user">
            {orgs.length !== 0 ? (
                orgs.map((org) => (
                    <div
                        className="user-cell"
                        key={org._id}
                        onClick={() => {
                            setSelect(false);
                            inp.value = org.name;
                            inp.setAttribute("data-user", org._id);
                        }}
                    >
                        <img src={org.pfp_url} alt="pfp" />
                        <h4>{org.name}</h4>
                    </div>
                ))
            ) : (
                <ClipLoader />
            )}
        </div>
    );
};

export default SelectOrg;
