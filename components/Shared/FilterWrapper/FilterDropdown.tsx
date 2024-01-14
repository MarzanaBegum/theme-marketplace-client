import React, { useState } from "react";
import SliderArrow from "../../SvgCustomIcons/SliderArrow";
import { FilterStateType } from ".";
import _ from "lodash";
import BoxIcon from "../../CustomIcons/BoxIcon";

type DataPropsType = { head: string; list: string[] };

function FilterDropdown({
    data,
    filterState,
    setFilterState,
}: {
    data: DataPropsType;
    setFilterState: React.Dispatch<React.SetStateAction<FilterStateType>>;
    filterState: FilterStateType;
}) {
    const [collapse, setCollapse] = useState(true);

    const getData = withFilterData(data.head, filterState);

    console.log(data);

    return (
        <div className="">
            <div
                onClick={() => setCollapse(!collapse)}
                className={`${
                    collapse ? "" : "max-lg:bg-[#BAB7E21A]"
                } font-semibold transition-all duration-300 rounded-md max-lg:p-[11px_10px] lg:pb-4 text-xs sm:text-sm sm:leading-[21px] leading-[18px] lg:text-base flex items-center justify-between lg:leading-[24px] lg:font-bold uppercase  text-[#9AA5B5]`}
            >
                <div>{data.head}</div>
                <SliderArrow
                    groupClassName="fill-neutral-muted"
                    className="rotate-90 lg:hidden"
                />
            </div>
            <div
                className={`flex transition-[max-height] duration-300 max-lg:pl-[10px] ${
                    collapse
                        ? "max-h-[1000px]"
                        : "max-lg:max-h-0 max-lg:overflow-hidden"
                }  flex-col gap-4 overflow-y-auto`}
            >
                {data.list.map((val, j) => (
                    <div
                        key={j}
                        onClick={() => {
                            // ajke amar mon valo nei
                            // the worst logic i've ever write
                            if (getData.includes(val)) {
                                if (data.head === "categories") {
                                    setFilterState((v) => ({
                                        ...v,
                                        categories: _.without(
                                            [...filterState.categories],
                                            val
                                        ),
                                    }));
                                }
                                if (data.head === "softwares") {
                                    setFilterState((v) => ({
                                        ...v,
                                        softwares: _.without(
                                            [...filterState.softwares],
                                            val
                                        ),
                                    }));
                                }
                            } else {
                                if (data.head === "sort by") {
                                    setFilterState((v) => ({
                                        ...v,
                                        sort: val,
                                    }));
                                }
                                if (data.head === "softwares") {
                                    setFilterState((v) => ({
                                        ...v,
                                        softwares: [
                                            ...filterState.softwares,
                                            val,
                                        ],
                                    }));
                                }
                                if (data.head === "categories") {
                                    setFilterState((v) => ({
                                        ...v,
                                        categories: [
                                            ...filterState.categories,
                                            val,
                                        ],
                                    }));
                                }
                            }
                        }}
                        className="flex cursor-pointer group items-center gap-[11px] lg:gap-[19px]"
                    >
                        <div className="flex items-center justify-center">
                            {data.head === "sort by" ? (
                                <input
                                    type="radio"
                                    checked={getData.includes(val)}
                                    className="w-[18px] h-[18px] accent-brand"
                                />
                            ) : (
                                <BoxIcon
                                    className={
                                        getData.includes(val) ? "active" : ""
                                    }
                                    groupClassName="group-hover:stroke-brand transit"
                                />
                            )}
                        </div>
                        <div
                            style={{
                                color: getData.includes(val)
                                    ? "#7266FC"
                                    : "#252C48",
                            }}
                            className="text-xs group-hover:!text-brand sm:text-sm sm:leading-[21px] transit leading-[18px] text-[#252C48] lg:text-base lg:leading-[24px] cursor-pointer font-semibold"
                        >
                            {val}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilterDropdown;

function withFilterData(
    head: string,
    filterState: FilterStateType
): string | string[] {
    if (head === "categories") return filterState.categories;
    if (head === "softwares") return filterState.softwares;
    if (head === "sort by") return filterState.sort;
    return [];
}
