import { useState, useEffect } from "react";
import BASE_API_URL from "../../constants";
import notyf from "../../tcNotyf";

export function useFieldsAvailable() {
    const [fieldsAvailable, setFieldsAvailable] = useState(
        /** @type {string[]} */ []
    );

    const getFieldsAvailable = async () => {
        const res = await fetch(`${BASE_API_URL}/project/fields`).then((r) =>
            r.json()
        );

        if (res.fields) {
            // converts type of `data/fields.js` (Record<string, Record<string, string>>) to a flat array of fields (Array<string>)
            setFieldsAvailable(
                Object.values(res.fields).flatMap(Object.values)
            );
        } else {
            notyf.error("Some Error occurred");
        }
    };

    useEffect(() => {
        getFieldsAvailable();
    }, []);

    return fieldsAvailable;
}
