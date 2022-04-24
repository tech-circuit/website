import OwlCarousel from "react-owl-carousel2";
import { useRef } from "react";

const options = {
    items: 9,
    rewind: true,
    autoplay: true,
    loop: true,
    autoplayTimeout: 3000,
    nav: false,
};

const WorkCarousel = () => {
    const sortRef = useRef("sort");

    return(
        <>                        
            <OwlCarousel ref={sortRef} options={options}>
                <h1>Web Development</h1>
                <h1>UI/UX Design</h1>
                <h1>Web Dev</h1>
                <h1>Web Dev</h1>
                <h1>UI/UX Design</h1>
                <h1>Machine Learning</h1>
                <h1>Web Dev</h1>
                <h1>UI/UX Design</h1>
                <h1>Web Dev</h1>
                <h1>Web Dev</h1>
                <h1>UI/UX Design</h1>
                <h1>Web Dev</h1>
            </OwlCarousel>
        </>
    )
}

export default WorkCarousel;