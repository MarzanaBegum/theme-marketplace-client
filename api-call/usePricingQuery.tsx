import { UseQueryOptions } from "react-query";
import { api } from "../api";

const usePricingQuery: (v?: any) => UseQueryOptions<any, any, any, any> = (
    filterData
) => ({
    queryFn: async () => {
        const { data } = await api.get(`/pricings`);
        return data;
    },
    select(data) {
        return data.filter((v: any) =>
            filterData ? "annually" in v.price : "monthly" in v.price
        );
    },
});

export default usePricingQuery;
