import { useAtom } from "jotai";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import usePricingQuery from "../../api-call/usePricingQuery";
import { USER_STATE } from "../../state";
import PricingCardItem from "../PricingCardItem";
import ToggleButton from "../ToggleButton";
import { AnimatePresence, motion } from "framer-motion";

const PricingCard: NextPage = () => {
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => setToggle(!toggle);
    const [user]: any = useAtom(USER_STATE);
    const freebie =
        user && user.userStore?.freebieUse ? user.userStore.freebieUse : false;

    const { data } = useQuery(["Get pricing data"], usePricingQuery(toggle));
    const freebieFilter = data?.filter((item: any) =>
        freebie ? !item.isTrial : item
    );
    return (
        <>
            {data && data?.length > 0 && (
                <div
                    id="pricing"
                    className="lg:py-[40px] xl:py-[80px] sm:py-[60px] py-[40px]"
                >
                    <h1 className="text-[#252C48] font-medium text-[24px] sm:text-[32px] leading-[36px] sm:leading-[42px] tracking-[-0.6%] mb-[24px] sm:mb-[20px] md:mb-[17px] text-center px-20px lg:mb-[10px] xl:text-[40px] xl:leading-[60px] 2xl:text-[48px]">
                        Pick your favourite planning
                    </h1>
                    <p className="font-normal text-[16px] text-[#3B415A] text-center px-[20px]">
                        Choose a plan that’s right for you
                    </p>
                    {/* toggle button  */}
                    <div className="flex justify-center gap-[24px] items-center mt-[19px] sm:mt-[16px] lg:mt-[30px] text-[#3B415A] font-normal text-[14px]">
                        <p>Pay Monthly</p>
                        <div className="">
                            <ToggleButton
                                toggle={toggle}
                                handleToggle={handleToggle}
                            />
                        </div>
                        <p>Pay Yearly</p>
                    </div>

                    {/* prising card  */}
                    <div className="flex justify-center 3xl:gap-[60px] 2xl:gap-[40px] lg:gap-[24px] xl:gap-[24px] gap-[24px] mt-[19px] overflow-hidden  xl:mt-[60px] 3xl:mt-[65px] lg:mt-[30px] flex-wrap px-[20px]">
                        <AnimatePresence initial={true}>
                            {freebieFilter?.map((item: any, index: any) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: "30%", width: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        width: "fit-content",
                                    }}
                                    exit={{ opacity: 0, x: "30%", width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-auto relative"
                                >
                                    <div className="group hover:bg-[#7266FC] w-[100%] h-full xs:w-[355px]  md:w-[375px] lg:w-[453px] relative overflow-hidden 2xl:w-[452.67px]  xl:w-[344px] 3xl:w-[480px] border rounded-[4px] px-[16px] py-[40px] lg:px-[24px] lg:py-[40px] text-[#252C48] hover:text-white transition-all duration-200">
                                        <PricingCardItem
                                            item={item}
                                            toggle={toggle}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </>
    );
};

export default PricingCard;
