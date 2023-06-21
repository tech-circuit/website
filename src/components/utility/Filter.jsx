import { useState } from "react";
import { IoFilter } from "react-icons/io5";

const Filter = ({ field, setField, fieldsAvailable }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="field-hold filter-hold">
            <button className="eventFilter" onClick={() => setActive(!active)}>
                <IoFilter className="filter-icon" />
                &nbsp;&nbsp;&nbsp;Filter fields
            </button>

            <div className={`field-box ${active && "field-box-active"}`}>
                <div className="fields">
                    {fieldsAvailable.map((i) => {
                        return (
                            <button
                                className={
                                    field === i ? "field field-active" : "field"
                                }
                                key={i}
                                onClick={() => {
                                    setField(field === i ? null : i);
                                }}
                            >
                                {i}
                            </button>
                        );
                    })}
                </div>
                <div className="filter-btns">
                    <button
                        onClick={() => setField(null)}
                        style={{ color: "#747474" }}
                    >
                        Reset
                    </button>
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

            <div
                className={`field-box-overlay ${
                    active && "field-box-overlay-active"
                }`}
                onClick={() => setActive(false)}
            ></div>
        </div>
    );
};

export default Filter;
