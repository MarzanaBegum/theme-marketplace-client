import { UseQueryOptions } from "react-query";
import { api } from "../api";

const freePricingQuery: (
    v?: any
) => UseQueryOptions<any, any, any, any> = () => ({
    queryFn: async () => {
        const { data } = await api.get(`/pricings`);
        return data;
    },
    select(data) {
        return data.filter((v: any) => v.isTrial === true);
    },
});

export default freePricingQuery;
