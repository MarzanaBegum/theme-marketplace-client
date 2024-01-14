import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import Slider, { Settings } from "react-slick";
import { api } from "../../../api";
import SliderArrow from "../../SvgCustomIcons/SliderArrow";
import SliderArrowLg from "../../SvgCustomIcons/SliderArrowLg";
import RatingStar from "../RatingStar";
import classNames from "classnames";
import useHomeRatings from "../../../api-call/useHomeRatings";

const sliderOneSettings: Settings = {
    slidesToShow: 1,
    dots: false,
    arrows: false,
    infinite: true,
    slidesToScroll: 1,
};

const sliderTwoSettings: Settings = {
    slidesToShow: 1,
    dots: false,
    arrows: false,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 1,
                centerMode: false,
                slidesToScroll: 1,
            },
        },
    ],
};

const sliderThreeSettings: Settings = {
    slidesToShow: 1,
    dots: false,
    arrows: false,
    infinite: true,
    slidesToScroll: 1,
};

function HomeSlider() {
    const [sliderOne, setSliderOne] = useState<any>();
    const [sliderTwo, setSliderTwo] = useState<any>();
    const [sliderThree, setSliderThree] = useState<any>();

    const slideNext = () => {
        sliderOne.slickNext();
    };
    const slidePrev = () => {
        sliderOne.slickPrev();
    };

    const { data } = useHomeRatings();
    if (!data) return <></>;

    return (
        <div className="container py-10 xl:py-[80px]">
            <div>
                <div className="text-2xl xl:text-[40px] 2xl:leading-[48px] xl:leading-[60px] sm:text-[32px] sm:leading-[36px] text-center leading-[1.5] font-medium text-neutral">
                    What our customers says
                </div>
                <div className="pt-2 xl:pt-4 2xl:pt-[18px]"></div>
                <div className="text-sm lg:w-[495px] xl:w-[630px] xl:text-lg xl:leading-[30px] lg:mx-auto font-normal leading-[1.5] 3xl:w-[821px] text-neutral-muted text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Adipiscing nisl, nam cursus quisque nunc.
                </div>
            </div>
            <div className="pt-5 sm:pt-6 xl:pt-10 2xl:pt-[60px]"></div>
            <div className="flex items-center justify-between">
                <div
                    onClick={slidePrev}
                    className="w-[60px] hidden lg:flex group h-[60px] items-center justify-center hover:bg-brand  rounded-full cursor-pointer bg-surface-muted "
                >
                    <SliderArrowLg
                        className=""
                        groupClassName="fill-[#9AA5B5] group-hover:fill-[#fff] "
                    />
                </div>
                <div className="lg:w-[calc(100%-180px)] 2xl:w-[calc(100%-380px)] w-full">
                    <Slider
                        {...sliderOneSettings}
                        asNavFor={sliderTwo}
                        ref={(slider) => setSliderOne(slider)}
                    >
                        {data.map((v, i) => (
                            <div key={"home_rating_1_" + i}>
                                <div className="bg-[#F9F9FF] h-[250px] p-[20px_13px] lg:p-10 sm:p-[20px] flex items-center flex-col justify-center">
                                    <RatingStar
                                        height={19}
                                        width={20}
                                        rating={v?.rating}
                                    />
                                    <div className="pt-4"></div>
                                    <div className="text-center line-clamp-4 lg:text-xl lg:leading-[35px] text-base text-[#252C48] italic w-full leading-[26px]">
                                        {v?.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div
                    onClick={slideNext}
                    className="w-[60px]  hidden lg:flex group h-[60px] rotate-180 items-center justify-center hover:bg-brand cursor-pointer rounded-full bg-surface-muted "
                >
                    <SliderArrowLg
                        className=""
                        groupClassName="fill-[#9AA5B5] group-hover:fill-[#fff] "
                    />
                </div>
            </div>

            <div className="pt-5 lg:pt-[30px]"></div>

            <div className="flex justify-center items-center gap-5 max-lg:h-[36px]">
                <div
                    onClick={slidePrev}
                    className="w-6 h-6 rotate-180 rounded-md cursor-pointer group lg:hidden hover:bg-brand bg-surface-muted "
                >
                    <SliderArrow groupClassName="fill-[#9AA5B5] group-hover:fill-[#fff]" />
                </div>
                {/* [&_.slick-center_img]:h-[110px]  */}
                <Slider
                    className={classNames(
                        `${
                            data.length === 1 ? "lg:w-[220px]" : "lg:w-[460px]"
                        } max-lg:w-[36px] w-full   [&_.slick-center_img]:w-[110px] [&_.slick-center_img]:h-[110px] [&_.slick-center_img]:p-[25px] [&_.slick-center_.img-wrapper_.img-active]:block [&>.slick-list>.slick-track]:flex [&>.slick-list>.slick-track]:items-center`
                    )}
                    asNavFor={sliderThree}
                    {...sliderTwoSettings}
                    ref={(slider) => setSliderTwo(slider)}
                    accessibility
                >
                    {data.map((v, i) => (
                        <div key={i} className="relative img-wrapper">
                            {v?.user?.profile ? (
                                <img
                                    onClick={() => sliderTwo.slickGoTo(i)}
                                    className="w-[36px] h-[36px] lg:w-[90px] lg:h-[90px] object-cover lg:p-[15px] border-transparent rounded-full focus:outline-none"
                                    src={v?.user?.profile}
                                    alt="profile"
                                />
                            ) : (
                                <img
                                    onClick={() => sliderTwo.slickGoTo(i)}
                                    src="/img/profile.png"
                                    alt="profile"
                                    className="w-[36px] h-[36px] lg:w-[90px] lg:h-[90px] object-cover lg:p-[15px] border-transparent rounded-full focus:outline-none"
                                />
                            )}
                            <div className="w-[80px] hidden img-active -z-[1] h-[80px] bg-[#EFF3FB] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                        </div>
                    ))}
                </Slider>
                <div
                    onClick={slideNext}
                    className="w-6 h-6 rounded-md cursor-pointer group lg:hidden hover:bg-brand bg-surface-muted "
                >
                    <SliderArrow groupClassName="fill-[#9AA5B5] group-hover:fill-[#fff]" />
                </div>
            </div>
            <div className="pt-1 lg:pt-3"></div>
            <div className="w-full">
                <Slider
                    asNavFor={sliderOne}
                    {...sliderThreeSettings}
                    ref={(slider) => setSliderThree(slider)}
                >
                    {data.map((v, i) => (
                        <div key={"home_rating_2_" + i}>
                            <div className="text-[#252C48] text-base lg:text-xl lg:leading-[1.5] leading-[26px] font-semibold text-center">
                                {v?.user?.firstName} {v?.user?.lastName}
                            </div>
                            <div className="pt-1"></div>
                            {/* <div className="text-[#3B415A] font-normal text-sm leading-[1.5] text-center">
                {v.title}
              </div> */}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default HomeSlider;
