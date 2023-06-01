import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

const WorkCarousel = ({ fieldsAvailable, setCurrentField, currentField }) => {
    return (
        // <OwlCarousel
        //     ref={sortRef}
        //     options={{
        //         rewind: true,
        //         autoplay: true,
        //         loop: true,
        //         autoplayTimeout: 3000,
        //         nav: false,
        //         items: 9,
        //     }}
        // >
        //     {fieldsAvailable.map((field) => (
        //         <CarouselItem
        //             key={field}
        //             field={field}
        //             setCurrentField={setCurrentField}
        //         />
        //     ))}
        // </OwlCarousel>

        <Swiper
            slidesPerView={2}
            breakpoints={{
                700: { slidesPerView: 6 },
                1000: { slidesPerView: 9 },
            }}
            className="work-car"
            modules={[Autoplay, Navigation]}
            autoplay
            loop
            spaceBetween={10}
            navigation={{
                nextEl: "#carNext",
                prevEl: "#carPrev",
            }}
        >
            {fieldsAvailable.map((field) => (
                <SwiperSlide key={field}>
                    <CarouselItem
                        field={field}
                        setCurrentField={setCurrentField}
                        currentField={currentField}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

function CarouselItem({ field, setCurrentField, currentField }) {
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
        <div
            className={`work-car-item ${
                currentField === field
                    ? "work-car-item-active"
                    : currentField && "work-car-item-dim"
            }`}
        >
            <h1
                ref={ref}
                onClick={() => {
                    setCurrentField((currentField) =>
                        field === currentField ? null : field
                    );
                }}
            >
                {field}
            </h1>
        </div>
    );
}

export default WorkCarousel;
