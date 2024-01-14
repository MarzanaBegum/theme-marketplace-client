import { UseQueryOptions } from "react-query";
import { api } from "../api";

const getNotificationsQuery: (
    v?: any
) => UseQueryOptions<any, any, any, any> = (userId) => ({
    queryFn: async () => {
        const { data } = await api.get(`/notifications/${userId}`);
        return data;
    },
    retry(failureCount, error) {
        if (failureCount == 2) return error;
    },
    enabled: !!userId,
});

export default getNotificationsQuery;
