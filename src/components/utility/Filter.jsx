import { useState } from "react";
import { IoFilter } from "react-icons/io5";

const Filter = ({ fields, setFields }) => {
    const [active, setActive] = useState(false);

    const staticfields = [
        "UI/UX",
        "Web Development",
        "Cryptic",
        "Blockchain",
        "3D Dev",
        "Dlor",
        "Lorem",
        "Sit",
        "Amet",
    ];

    return (
        <div className="field-hold filter-hold">
            <button className="eventFilter" onClick={() => setActive(!active)}>
                <IoFilter className="filter-icon" />
                &nbsp;&nbsp;&nbsp;&nbsp;Filter fields
            </button>

            <div className={`field-box ${active && "field-box-active"}`}>
                <div className="fields">
                    {staticfields.map((i) => {
                        return (
                            <button
                                className={
                                    fields.includes(i)
                                        ? "field field-active"
                                        : "field"
                                }
                                key={i}
                                onClick={() => {
                                    !fields.includes(i)
                                        ? setFields([i])
                                        : setFields([]);
                                }}
                            >
                                {i}
                            </button>
                        );
                    })}
                </div>
                <button
                    className="close"
                    style={{ color: "#747474" }}
                    onClick={() => {
                        setActive(false);
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Filter;
