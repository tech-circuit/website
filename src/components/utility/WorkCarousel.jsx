import OwlCarousel from "react-owl-carousel2";
import { useState, useEffect } from "react";
import BASE_API_URL from "../../constants";

const options = {
    items: 9,
    rewind: true,
    autoplay: true,
    loop: true,
    autoplayTimeout: 3000,
    nav: false,
};

const WorkCarousel = ({ sortRef }) => {
    const [fieldsAvailable, setFieldsAvailable] = useState(
        /** @type {string[]} */ []
    );

    const getFieldsAvailable = async () => {
        const res = await fetch(`${BASE_API_URL}/project/fields`).then((r) =>
            r.json()
        );

        // converts type of `data/fields.js` (Record<string, Record<string, string>>) to a flat array of fields (Array<string>)
        setFieldsAvailable(Object.values(res.fields).flatMap(Object.values));
    };

    useEffect(() => {
        getFieldsAvailable();
    }, []);

    return (
        <>
            <OwlCarousel ref={sortRef} options={options}>
                {fieldsAvailable.map((field) => (
                    <h1>{field}</h1>
                ))}
            </OwlCarousel>
        </>
    );
};

export default WorkCarousel;
