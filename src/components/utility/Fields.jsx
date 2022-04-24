import React, { useState } from "react";
import "../../styles/all.css";

const Fields = (props) => {
    const [fields, setFields] = useState([]);
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

    return(
        <>          
            <h3>Fields</h3>
            <div className="field-hold">
                <input
                    type="text"
                    value={fields.join(", ")}
                    readOnly
                    style={{ color: "#4678f9" }}
                    onClick={() =>
                        document
                            .querySelector(".field-box")
                            .classList.toggle("field-box-active")
                    }
                />
                <div className="field-box">
                    <div className="field-box-top">
                        <h1>Project Fields</h1>
                        <button onClick={() => setFields([])}>
                            clear all
                        </button>
                    </div>
                    <div className="fields">
                        {staticfields.map((field) => {
                            return (
                                <button
                                    className={
                                        fields.includes(field)
                                            ? "field field-active"
                                            : "field"
                                    }
                                    key={field}
                                    onClick={() => {
                                        if (fields.length !== 5) {
                                            if (!fields.includes(field))
                                                setFields([
                                                    ...fields,
                                                    field,
                                                ]);
                                            else
                                                setFields(
                                                    fields.filter(
                                                        (fl) =>
                                                            fl !== field
                                                    )
                                                );
                                        } else {
                                            setFields(
                                                fields.filter(
                                                    (fl) => fl !== field
                                                )
                                            );
                                        }
                                    }}
                                >
                                    {field}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        className="close"
                        style={{ color: "#747474" }}
                        onClick={() => {
                            document
                                .querySelector(".field-box")
                                .classList.remove("field-box-active");
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default Fields;