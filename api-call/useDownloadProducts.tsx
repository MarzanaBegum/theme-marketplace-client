import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { USER_STATE } from "../state";
import { api } from "../api";

const DOWNLOAD_PRODUCTS_KEY = "download-products-key";

const useDownloadProducts = () => {
    const [user] = useAtom(USER_STATE);

    return useQuery<any[]>([DOWNLOAD_PRODUCTS_KEY], {
        queryFn: async () => {
            const { data } = await api.get(
                `/user-store/${user?._id}/downloads`
            );

            return data;
        },
        enabled: !!user?._id,
        retry: 1,
    });
};

export default useDownloadProducts;
