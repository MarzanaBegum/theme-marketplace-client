import classNames from "classnames";
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useQuery } from "react-query";
import { api } from "../../../api";
import FilterSection, {
    filterLeftClass,
    useDownloadsPage,
} from "./FilterSection";
import { ProductType } from "../../../api-call/useProductListQuery";
import { productTabData, sortOptions } from "../../../data/fixed";
import _ from "lodash";
import { useAtom } from "jotai";
import { ProductFilterState } from "../../../state";
import { useRouter } from "next/router";

type FilterWrapperType = {
    children: (data: ProductType[]) => ReactNode;
    data: ProductType[];
    typeStateUp?: (type: string) => any;
};

export type FilterStateType = {
    type: string;
    sort: string;
    categories: string[];
    softwares: string[];
    tag: string[];
};

function FilterWrapper({ children, data, typeStateUp }: FilterWrapperType) {
    const [filterSidebar, setFilterSidebar] = useState(false);
    const [filterLeft, setFilterLeft] = useState(true);

    const router = useRouter();
    const query = router.query;

    const [filterState, setFilterState] = useState<FilterStateType>({
        type: "all",
        sort: "Newest",
        categories: [],
        softwares: [],
        tag: [],
    });

    useEffect(() => {
        typeStateUp && typeStateUp(filterState.type);
    }, [filterState]);

    useEffect(() => {
        const { type, tag, category }: any = query;
        if (type) setFilterState((v) => ({ ...v, type }));
        if (tag) {
            setFilterState((v) => ({
                ...v,
                tag: [...filterState.tag].concat(tag),
            }));
        }
        if (category) {
            setFilterState((v) => ({
                ...v,
                categories: [...filterState.categories].concat(category),
            }));
        }
    }, [query]);

    const isDownloadsPage = useDownloadsPage();

    const filterData = useFilterData(data, filterState);

    const { tabData, filterOptions } = getFilterOptions(data);

    const lengthFilter = useMemo(() => {
        let lArr: any = 0;
        filterOptions.forEach((v) => {
            lArr += v.list.length;
        });
        return lArr;
    }, [filterOptions]);

    return (
        <div>
            <div
                className="relative "
                style={{
                    minHeight: `${lengthFilter * 50 + 50}px`,
                }}
            >
                <div className="overflow-x-auto scrollbar-hide sm:container ">
                    <ul
                        className={`max-lg:mx-[20px] flex gap-6 transition-all duration-200 w-max  ${filterLeftClass(
                            filterLeft
                        )}`}
                    >
                        {productTabData.map((v, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    setFilterState((_v) => ({
                                        ..._v,
                                        type: v.value,
                                    }));
                                    console.log(router.pathname);
                                    if (router.pathname === "/product") {
                                        if ("search" in router?.query) {
                                            router.push({
                                                pathname: router.pathname,
                                                query: {
                                                    type: v.value,
                                                    search: "",
                                                },
                                            });
                                        } else {
                                            router.push({
                                                pathname: router.pathname,
                                                query: {
                                                    type: v.value,
                                                },
                                            });
                                        }
                                    }
                                }}
                                className={classNames(
                                    `${
                                        v.value == filterState.type
                                            ? "text-[#7266FC]"
                                            : "text-[#252C48]"
                                    } ${
                                        v.value != "all" &&
                                        (tabData.includes(v.value)
                                            ? "block"
                                            : "hidden")
                                    } inline-block py-4 transit hover:text-brand lg:py-6 lg:text-base lg:leading-[19.2px] text-sm leading-[18px] tracking-[.15%] font-medium cursor-pointer`
                                )}
                            >
                                {v.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full sm:container">
                    <div
                        className={`border-b w-full transition-all duration-200 border-[rgba(0,0,0,.15)]   ${
                            filterLeft
                                ? "lg:w-[calc(100%-200px)] lg:ml-[200px]  2xl:w-[calc(100%-264px)] 2xl:ml-[264px]"
                                : "lg:w-[calc(100%-75px)] lg:ml-[75px]  2xl:w-[calc(100%-85px)] 2xl:ml-[85px]"
                        }`}
                    ></div>
                </div>
                <div className="container">
                    <div
                        className={`${filterLeftClass(
                            filterLeft
                        )} transition-all duration-200 py-5 flex items-center justify-between`}
                    >
                        <div className="text-sm font-normal leading-[21px] tracking-[.5%]">
                            Showing {filterData?.length} results
                        </div>
                        <div
                            onClick={() => setFilterSidebar(!filterSidebar)}
                            style={{
                                backgroundColor: isDownloadsPage
                                    ? "#fff"
                                    : "#EFF3FB",
                            }}
                            className="w-[35px] lg:hidden h-[35px] rounded-md flex items-center justify-center"
                        >
                            <img
                                className="w-[19.2] h-[19.2]"
                                src="/icons/filter.svg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div
                        className={` transition-all duration-200 ${filterLeftClass(
                            filterLeft
                        )}`}
                    >
                        {filterData?.length
                            ? children(filterData)
                            : "No data found"}
                    </div>
                </div>
                <FilterSection
                    filterLeft={filterLeft}
                    filterSidebar={filterSidebar}
                    setFilterLeft={setFilterLeft}
                    setFilterSidebar={setFilterSidebar}
                    filterOptions={filterOptions}
                    setFilterState={setFilterState}
                    filterState={filterState}
                />
            </div>
        </div>
    );
}

function useFilterData(
    data: ProductType[],
    filterState: FilterStateType
): ProductType[] {
    const [filter] = useAtom(ProductFilterState);

    return useMemo(() => {
        let newData = data;

        if (filterState.type) {
            if (filterState.type != "all") {
                newData = newData.filter((v) => v.type == filterState.type);
            }
        }

        if (filterState.categories.length) {
            newData = newData.filter(
                (v) =>
                    v.categories &&
                    v.categories.some((val) =>
                        filterState.categories.includes(val)
                    )
            );
        }
        if (filterState.softwares.length) {
            newData = newData.filter(
                (v) =>
                    v.softwares &&
                    v.softwares.some((val) =>
                        filterState.softwares.includes(val)
                    )
            );
        }

        if (filterState.sort) {
            if (filterState.sort === "Newest") {
                const sortArr = _.cloneDeep(newData);
                sortArr.sort(
                    (d1, d2) =>
                        new Date(d2.createdAt).getTime() -
                        new Date(d1.createdAt).getTime()
                );
                newData = sortArr;
            }
            if (filterState.sort === "Oldest") {
                const sortArr = _.cloneDeep(newData);
                sortArr.sort(
                    (d1, d2) =>
                        new Date(d1.createdAt).getTime() -
                        new Date(d2.createdAt).getTime()
                );
                newData = sortArr;
            }
        }

        if (filter.search) {
            newData = newData.filter((v) =>
                v.title.toLowerCase().includes(filter.search.toLowerCase())
            );
        }

        if (filterState.tag?.length) {
            newData = newData.filter(
                (v) =>
                    v.tags &&
                    v.tags.some((val) => filterState.tag?.includes(val))
            );
        }

        return newData;
    }, [filterState, filter, data]);
}

function getFilterOptions(data: ProductType[]) {
    const tabData = data.map((v) => v.type);

    let categoriesFilter: string[] = [];
    let softwaresFilter: string[] = [];

    (data || []).forEach((v) => {
        categoriesFilter = v.categories
            ? _.uniq(categoriesFilter.concat(v.categories))
            : categoriesFilter;
        softwaresFilter = v.softwares
            ? _.uniq(softwaresFilter.concat(v.softwares))
            : softwaresFilter;
    });

    const filterOptions = [];
    categoriesFilter.length &&
        filterOptions.push({
            head: "categories",
            list: categoriesFilter,
        });
    softwaresFilter.length &&
        filterOptions.push({
            head: "softwares",
            list: softwaresFilter,
        });

    filterOptions.push({
        head: "sort by",
        list: ["Newest", "Oldest"],
    });

    return { tabData, filterOptions };
}

export default FilterWrapper;
