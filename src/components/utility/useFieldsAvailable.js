import { useState, useEffect } from "react";
import BASE_API_URL from "../../constants";
import notyf from "../../tcNotyf";

export function useFieldsAvailable() {
    const [fieldsAvailable, setFieldsAvailable] = useState(
        /** @type {string[]} */ []
    );

    const getFieldsAvailable = async () => {
        const resJSON = await fetch(`${BASE_API_URL}/project/fields`);
        const res = await resJSON.json();

        if (res.fields) {
            // converts type of `data/fields.js` (Record<string, Record<string, string>>) to a flat array of fields (Array<string>)
            // const fields = Object.keys(res.fields).map(fieldGrp => {
            //     return Object.values(res.fields[fieldGrp])
            // })

            let fields = [];
            for (let fieldGrp of Object.keys(res.fields)) {
                for (let field of Object.values(res.fields[fieldGrp])) {
                    fields.push(field);
                }
            }

            setFieldsAvailable(fields);
        } else {
            notyf.error("Some Error occurred");
        }
    };

    useEffect(() => {
        getFieldsAvailable();
    }, []);

    return fieldsAvailable;
}
