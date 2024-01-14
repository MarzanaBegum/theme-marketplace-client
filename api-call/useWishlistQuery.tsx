import { UseQueryOptions, useQuery, useQueryClient } from "react-query";
import { api } from "../api";
import { useAtom } from "jotai";
import { USER_STATE } from "../state";
import { ProductType } from "./useProductListQuery";

const useWishlistQuery = (filterData?: string) => {
    const [user] = useAtom(USER_STATE);
    const queryClient = useQueryClient();
    return useQuery<ProductType[]>(["wishlist-query-key"], {
        queryFn: async () => {
            const { data } = await api.get(
                `/user-store/${user?.userStore?._id}/wishlist`
            );
            return data;
        },
        enabled: !!user?.userStore?._id,
        select: (data) => {
            if (!filterData) return data;
            return SortFilter(data, filterData);
        },
        retry: false,
        onError: (err) => {
            queryClient.setQueriesData(["wishlist-query-key"], undefined);
        },
    });
};

export default useWishlistQuery;

const SortFilter = (data: any, filter: string) => {
    switch (filter) {
        case "newest":
            return data.sort((firstElement: any, secondElement: any) => {
                const firstElmnt = new Date(firstElement.createdAt).getTime();
                const secondElmnt = new Date(secondElement.createdAt).getTime();
                return firstElmnt < secondElmnt ? 1 : -1;
            });
        case "oldest":
            return data.sort((firstElement: any, secondElement: any) => {
                const firstElmnt = new Date(firstElement.createdAt).getTime();
                const secondElmnt = new Date(secondElement.createdAt).getTime();
                return firstElmnt > secondElmnt ? 1 : -1;
            });

        default:
            return data;
    }
};
