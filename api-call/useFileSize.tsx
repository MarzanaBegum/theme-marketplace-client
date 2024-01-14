import React from "react";
import { useQuery } from "react-query";
import { api } from "../api";

function useFileSize(id: string) {
    return useQuery(["product-file-size", id], {
        queryFn: async () => {
            const { data } = await api.post("/bucket-store/file/size", { id });
            return data ? data / 1024 / 1024 : 0;
        },
        enabled: !!id,
        retry: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
}

export default useFileSize;
