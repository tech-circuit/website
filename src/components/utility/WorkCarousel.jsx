import OwlCarousel from "react-owl-carousel2";

const options = {
    items: 9,
    rewind: true,
    autoplay: true,
    loop: true,
    autoplayTimeout: 3000,
    nav: false,
};

const WorkCarousel = ({ sortRef }) => {
    return (
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
    );
};

export default WorkCarousel;
