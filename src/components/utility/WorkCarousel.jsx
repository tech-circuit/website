import OwlCarousel from "react-owl-carousel2";
import { useEffect, useRef } from "react";

const WorkCarousel = ({ sortRef, fieldsAvailable, setCurrentField }) => {
    useEffect(() => {
        // remove last empty element from carousel
        for (const item of document.querySelectorAll(".owl-item")) {
            for (const stage of item.querySelectorAll(".owl-stage")) {
                stage.style.display = "none";
            }
        }
    });

    return (
        <>
            <OwlCarousel
                ref={sortRef}
                options={{
                    rewind: true,
                    autoplay: true,
                    loop: true,
                    autoplayTimeout: 3000,
                    nav: false,
                    items: 9,
                }}
            >
                {fieldsAvailable.map((field) => (
                    <CarouselItem
                        key={field}
                        field={field}
                        setCurrentField={setCurrentField}
                    />
                ))}
            </OwlCarousel>
        </>
    );
};

function CarouselItem({ field, setCurrentField }) {
    const ref = useRef();

    // Add event listener to owl carousel's div element rather than h1
    // allows to click anywhere inside the element rather than just on text
    // useEffect(() => {
    //     let parentEl = ref.current.parentElement;
    //     const handleClick = (e) => {
    //         setCurrentField((currentField) =>
    //             field === currentField ? null : field
    //         );
    //     };
    //     parentEl.addEventListener("click", handleClick);

    //     return () => {
    //         parentEl.removeEventListener("click", handleClick);
    //     };
    // }, [setCurrentField, field]);

    return (
        <h1
            ref={ref}
            onClick={(e) => {
                setCurrentField((currentField) =>
                    field === currentField ? null : field
                );
            }}
        >
            {field}
        </h1>
    );
}

export default WorkCarousel;
