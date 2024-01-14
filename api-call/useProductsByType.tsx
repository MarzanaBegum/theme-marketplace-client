import { useQuery } from "react-query";
import { api } from "../api";
import { ProductType } from "./useProductListQuery";
import { decryptData } from "../utils/hashdata";
import { getCookie } from "cookies-next";

function useProductsByType(type: string, productId: string) {
    return useQuery<ProductType[]>(["product-by-type", type, productId], {
        queryFn: async () => {
            const { data } = await api.get(
                `/products/by-type/${type}?productId=${productId}`
            );
            let filterData = data ? data.filter((v: any) => v.isVisible) : [];
            const userId = decryptData(`${getCookie("auth")}`);
            filterData = filterData
                ? filterData.filter((v: any) =>
                      v?.buyout
                          ? v?.buyout === userId?.id
                              ? true
                              : false
                          : true
                  )
                : [];

            return filterData;
        },
        enabled: !!type,
    });
}

export default useProductsByType;
