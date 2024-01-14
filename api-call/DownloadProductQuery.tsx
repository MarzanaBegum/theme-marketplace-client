import { UseQueryOptions } from "react-query";
import { api } from "../api";
import { decryptData } from "../utils/hashdata";
import { getCookie } from "cookies-next";

const DownloadProductQuery: () => UseQueryOptions<any, any, any, any> = () => ({
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
});

export default DownloadProductQuery;
