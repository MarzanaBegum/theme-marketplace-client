import React, { useState } from "react";
// import { QuestionsDataType } from "./data";
import { AnimatePresence, motion } from "framer-motion";
import { QuestionsDataType } from "../../utils/constant";

const FrequentlyQuestion = ({ data }: { data: QuestionsDataType }) => {
    const [isExpand, setExpand] = useState(false);
    const handleExpand = () => {
        setExpand(!isExpand);
    };
    return (
        <div className="">
            <div
                className={`cursor-pointer group py-[16px] lg:py-[24px]`}
                onClick={handleExpand}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between"
                >
                    <div
                        style={{ color: isExpand ? "#7266FC" : "#252C48" }}
                        className="text-[14px] group-hover:!text-brand sm:text-[16px] transit font-medium leading-[24px] text-[#252C48]"
                    >
                        {data.question}
                    </div>
                    <div className="sm:w-[20px] sm:h-[20px] w-[13.85px] h-[13.85px] rounded-full border border-[#7266FC] flex justify-center items-center cursor-pointer">
                        <img
                            src={`/icons/${
                                isExpand ? "minusiconbg.svg" : "plusIconbg.svg"
                            }`}
                            alt=""
                            className=" w-[8px] h-[8px]"
                        />
                    </div>
                </motion.div>
                <AnimatePresence initial={false}>
                    {isExpand && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "fit-content" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }} // TODO: Duration changeable
                            className="overflow-hidden"
                        >
                            <div className="pt-[8px]"></div>
                            <div className="text-[#667085] text-[12px] sm:text-[14px] font-normal xl:font-medium mr-[20px] md:mr-[50px] lg:mr-[26px] xl:leading-[24px] leading-[20px]">
                                {data.answer}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FrequentlyQuestion;
