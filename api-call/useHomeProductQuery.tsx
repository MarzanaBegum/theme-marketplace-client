import { useQuery } from "react-query";
import { api } from "../api";
import { ProductType } from "./useProductListQuery";

type HomeProductQuery = { types: string[]; products: ProductType[] };
type HomeProductApi = { _id: string; products: ProductType[] };

const useHomeProductQuery = (filter?: string) => {
    return useQuery<HomeProductQuery>(["fetch-home-product"], {
        queryFn: async () => {
            const { data } = await api.get<HomeProductApi[]>(
                "/products/fetch/home"
            );
            const types = data.map((v) => v._id);
            const products = data.flatMap((v) => v.products);

            return { types, products };
        },
        select: (data) => {
            if (!filter || filter === "all") return data;
            let newData = { ...data };
            newData.products = data?.products.filter(
                (item) => item.type === filter
            );
            return newData;
        },
        refetchOnWindowFocus: false,
    });
};

export default useHomeProductQuery;
