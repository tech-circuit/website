import { ClipLoader } from "react-spinners";

const Search = ({ func, loading, placeholder }) => {
    let timeout;

    const fire = (input) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func(input);
        }, 1000);
    };

    return (
        <div className="input">
            {!loading ? (
                <img src="/assets/magnifying-glass.svg" alt="alt" />
            ) : (
                <ClipLoader size={23} />
            )}
            <input
                type="text"
                placeholder={placeholder}
                onChange={(eve) => {
                    fire(eve.target.value.toString().trim().toLowerCase());
                }}
            />
        </div>
    );
};

export default Search;
