import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewSlider = () => {
    const [nav1, setNav1] = useState<any>(null);
    const [nav2, setNav2] = useState<any>(null);

    const slider1Ref = useRef<any>();
    const slider2Ref = useRef<any>();

    useEffect(() => {
        setNav1(slider1Ref);
        setNav2(slider2Ref);
    });

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <h2>Slider Syncing (AsNavFor)</h2>
            <Slider {...settings} asNavFor={nav2} ref={slider1Ref.current}>
                <div>
                    <div className="bg-gray-500 w-96 h-96"></div>
                </div>
                <div>
                    <div className="bg-gray-500 w-96 h-96"></div>
                </div>
                <div>
                    <div className="bg-gray-500 w-96 h-96"></div>
                </div>
                <div>
                    <div className="bg-gray-500 w-96 h-96"></div>
                </div>
            </Slider>
            <h4>Second Slider</h4>
            <Slider
                asNavFor={nav1}
                ref={slider2Ref.current}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
            >
                <div>
                    <div className="bg-green-500 w-96 h-96"></div>
                </div>
                <div>
                    <div className="bg-green-500 w-96 h-96"></div>
                </div>
                <div>
                    <div className="bg-green-500 w-96 h-96"></div>
                </div>
                <div>
                    <div className="bg-green-500 w-96 h-96"></div>
                </div>
                <div>
                    <div className="bg-green-500 w-96 h-96"></div>
                </div>
                <div>
                    <div className="bg-green-500 w-96 h-96"></div>
                </div>
            </Slider>
        </>
    );
};

export default ReviewSlider;
