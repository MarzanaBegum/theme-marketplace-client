import { useQuery } from "react-query";
import { api } from "../api";
import { useAtom } from "jotai";
import { USER_STATE } from "../state";
import { useRouter } from "next/router";

const KEY = "single-downloaded-product";

const useSingleDownloadedProduct = (userId?: string, productId?: string) => {
    const [user] = useAtom(USER_STATE);
    const router = useRouter();
    const path = router.asPath;
    productId = productId ? productId : path.split("/")[2];
    userId = userId ? userId : user?._id;
    return useQuery<SingleDownloadProduct>([KEY, userId, productId], {
        queryFn: async () => {
            const { data } = await api.get("/products/download/data", {
                params: { userId, productId },
            });
            return data;
        },
        enabled: !!(!!userId && !!productId),
    });
};

export interface Support {
    text: string;
    price: number;
    start: string;
    end: string;
}

export interface Service {
    text: string;
    price: number;
}

export interface SingleDownloadProduct {
    support: Support;
    _id: string;
    userId: string;
    license: string;
    productId: string;
    isDownloaded: boolean;
    services: Service[];
    __v: number;
}

export default useSingleDownloadedProduct;
