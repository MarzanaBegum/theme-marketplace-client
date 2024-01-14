import { useRouter } from "next/router";
import React, { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import { FilterStateType } from ".";

type FilterSectionType = {
    filterSidebar: boolean;
    filterLeft: boolean;
    setFilterSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterLeft: React.Dispatch<React.SetStateAction<boolean>>;
    filterOptions: { head: string; list: string[] }[];
    setFilterState: React.Dispatch<React.SetStateAction<FilterStateType>>;
    filterState: FilterStateType;
};

function FilterSection(props: FilterSectionType) {
    const isDownloadsPage = useDownloadsPage();

    const {
        filterLeft,
        filterSidebar,
        setFilterLeft,
        setFilterSidebar,
        filterOptions,
        filterState,
        setFilterState,
    } = props;

    return (
        <div
            className="w-full absolute  top-0 left-0"
            style={{ pointerEvents: "none" }}
        >
            <div className="container">
                <div
                    style={{ pointerEvents: "all" }}
                    className={`w-[295px] sm:w-[360px] md:w-[384px] border-r border-[rgba(0,0,0,.15)] max-lg:fixed transition-all duration-300  lg:duration-200   top-0 z-[12] ${
                        filterSidebar ? "right-0" : "-right-full"
                    } ${
                        filterLeft
                            ? "lg:w-[200px] 2xl:w-[264px]"
                            : "lg:w-[75px] 2xl:w-[85px] lg:!pr-2"
                    } max-lg:h-screen overflow-hidden bg-white lg:bg-transparent pl-5 pr-5 sm:pr-10 lg:pl-0  pt-10 lg:pt-[24px] lg:pr-[24px]`}
                >
                    <div
                        onClick={() => setFilterLeft(!filterLeft)}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center cursor-pointer gap-4">
                            <div
                                style={{
                                    backgroundColor: isDownloadsPage
                                        ? "#fff"
                                        : "#EFF3FB",
                                }}
                                className="w-[35px] hidden h-[35px] rounded-md  lg:flex items-center justify-center"
                            >
                                <img
                                    className="w-[19.2] h-[19.2]"
                                    src="/icons/filter.svg"
                                    alt=""
                                />
                            </div>
                            <div
                                className={`text-lg font-medium leading-[27px] sm:text-xl sm:leading-[30px] ${
                                    filterLeft ? "block" : "lg:hidden"
                                }`}
                            >
                                Filters
                            </div>
                        </div>
                        <div>
                            <img
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setFilterSidebar(!filterSidebar);
                                }}
                                className="lg:hidden"
                                src="/icons/cross.svg"
                                alt=""
                            />
                            <img
                                onClick={() => setFilterLeft(!filterLeft)}
                                className={`max-lg:hidden cursor-pointer transition-all duration-200 ${
                                    filterLeft && "rotate-180"
                                }`}
                                src="/icons/arrow-right.svg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="pt-6"></div>
                    <div
                        className={`h-[calc(100%-51px)] lg:gap-6 flex flex-col gap-[14px] overflow-y-auto pb-6 transition-all duration-200 lg:relative ${
                            filterLeft ? "lg:left-0" : "lg:-left-full"
                        }`}
                    >
                        {filterOptions.map((v, i) => (
                            <FilterDropdown
                                data={v}
                                key={i}
                                filterState={filterState}
                                setFilterState={setFilterState}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div
                onClick={() => setFilterSidebar(!filterSidebar)}
                style={{
                    opacity: filterSidebar ? 1 : 0,
                    pointerEvents: filterSidebar ? "all" : "none",
                }}
                className="fixed lg:hidden transition-all duration-300 top-0 left-0 w-full h-screen bg-[rgba(0,0,0,.25)] z-[11]"
            ></div>
        </div>
    );
}

export const filterLeftClass = (filterLeft: boolean) => {
    return filterLeft
        ? "lg:w-[calc(100%-230px)] lg:ml-[230px]  2xl:w-[calc(100%-294px)] 2xl:ml-[294px]"
        : "lg:w-[calc(100%-105px)] lg:ml-[105px]  2xl:w-[calc(100%-115px)] 2xl:ml-[115px]";
};

export function useDownloadsPage() {
    const router = useRouter();
    if (router.asPath == "/account/downloads") {
        return true;
    } else {
        return false;
    }
}

export default FilterSection;
