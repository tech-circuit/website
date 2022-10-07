import { useEffect } from "react";
import "../../styles/all.css";
import { useFieldsAvailable } from "./useFieldsAvailable";

const Fields = ({ fields, setFields, skill = false }) => {
    const fieldsAvailable = useFieldsAvailable();

    useEffect(() => {
        if (fields.length === 5) {
            for (let f of document.querySelectorAll(".field")) {
                f.classList.add("field-disabled");
            }
        } else {
            for (let f of document.querySelectorAll(".field")) {
                f.classList.remove("field-disabled");
            }
        }
    }, [fields]);

    return (
        <>
            {!skill && <h3>Fields</h3>}
            <div className={`field-hold ${skill && "skill-hold"}`}>
                {skill && <label htmlFor="fields">My skills</label>}
                <input
                    type="text"
                    value={fields && fields.join(", ")}
                    readOnly
                    name="fields"
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
                        <button onClick={() => setFields([])}>clear all</button>
                    </div>
                    <div className="fields">
                        {fieldsAvailable.map((field) => {
                            return (
                                <button
                                    className={
                                        fields && fields.includes(field)
                                            ? "field field-active"
                                            : "field"
                                    }
                                    key={field}
                                    onClick={() => {
                                        if (fields.length !== 5) {
                                            if (!fields.includes(field))
                                                setFields([...fields, field]);
                                            else
                                                setFields(
                                                    fields.filter(
                                                        (fl) => fl !== field
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
    );
};

export default Fields;
