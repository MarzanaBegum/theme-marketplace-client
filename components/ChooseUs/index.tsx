import { NextPage } from "next";
import { WhyChooseData } from "../../utils/constant";
import classNames from "classnames";

const ChooseUs: NextPage = () => {
    const data = WhyChooseData;
    return (
        <div className="lg:bg-[#F9F9FF] bg-white">
            <div className="3xl:px-[180px] 3xl:py-[80px] 2xl:px-[126px] 2xl:py-[80px] xl:px-[60px] lg:px-[49px] lg:py-[40px] md:px-[50px] px-[20px] sm:px-[40px]">
                <h1 className="text-[#252C48] font-medium text-[24px] leading-[36px] text-center mb-[8px] sm:text-[32px] sm:leading-[42px] tracking-[0.25%] 2xl:text-[48px] 2xl:leading-[60px] 2xl:tracking-[-0.6%]">
                    Why choose us
                </h1>
                <p className="text-[#3B415A] text-[12px] sm:text-[14px] w-[313px] lg:w-[100%] mx-auto leading-[21px] text-center  font-normal mb-[20px] sm:mb-[24px] xl:text-[16px] xl:mb-[60px]">
                    It’s not just about looks. This is why 100k+ users choose a
                    Themes.
                </p>
                <div className="flex flex-wrap 3xl:w-[1560px] mx-auto gap-[24px] lg:gap-0 justify-center">
                    {WhyChooseData.map((item, index) => (
                        <div
                            className={classNames(
                                "lg:w-1/3 2xl:px-[50px] md:w-[322px] xs:w-[335px] w-[100%] sm:w-[288px] xl:py-[37px] xl:px-[32px]  3xl:py-[80px] lg:px-[32px] lg:py-[48px] 2xl:py-[56px] lg:border-r lg:last:border-r-0 text-center md:px-[20px] md:py-[30px] bg-[#F9F9FF]  px-[20px] py-[30px]",
                                index === 2 && "lg:border-r-0",
                                index === 0 && "lg:border-b",
                                index === 1 && "lg:border-b",
                                index === 2 && "lg:border-b"
                            )}
                            key={index}
                        >
                            <img
                                src={item.img}
                                alt=""
                                className="lg:w-[40px] w-[42px] h-[40px] mx-auto"
                            />
                            <h1 className="2xl:text-[24px] xl:text-[16px] lg:text-[20px] text-[18px] sm:text-[20px] text-[#252C48] font-medium">
                                {item.title}
                            </h1>
                            <p className="text-[#3B415A] xl:text-[16px] text-[14px] font-normal">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;
