import { UseQueryOptions } from "react-query";
import { api } from "../api";

const useSingleProductQuery: (
    id?: any
) => UseQueryOptions<any, any, any, any> = (id) => ({
    queryFn: async () => {
        const { data } = await api.get(`/products/single/${id}`);
        return data;
    },
    enabled: !!id,
});

export default useSingleProductQuery;
