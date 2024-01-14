import { useQuery } from "react-query";
import { api } from "../api";

const SINGLE_PRICING_KEY = "single-pricing-key";

const useSinglePriceQuery = (id?: string) =>
    useQuery([SINGLE_PRICING_KEY], {
        queryFn: async () => {
            const { data } = await api.get(`/pricings/${id}`);
            return data;
        },
        enabled: !!id,
    });

export default useSinglePriceQuery;
