import { UseQueryOptions } from "react-query";
import { api } from "../api";
import { decryptData } from "../utils/hashdata";
import { getCookie } from "cookies-next";

const ProductQuery: (tabData?: any) => UseQueryOptions<any, any, any, any> = (
    tabData
) => ({
    queryFn: async () => {
        const { data } = await api.get(`/products`);
        let filterData = data ? data.filter((v: any) => v.isVisible) : [];
        const userId = decryptData(`${getCookie("auth")}`);
        filterData = filterData
            ? filterData.filter((v: any) =>
                  v?.buyout ? (v?.buyout === userId?.id ? true : false) : true
              )
            : [];

        return filterData;
    },
    select(data) {
        if (!tabData || tabData === "all") return data;

        const filterItem = data?.filter(
            (v: any) => v.type === tabData && v.isVisible === true
        );
        return filterItem;
        // console.log(filterItem, "filtem item ((((((())))))");
    },
});

export default ProductQuery;
