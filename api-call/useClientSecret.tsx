import { useAtom } from "jotai";
import { ClientSecretState, USER_STATE } from "../state";
import { useEffect } from "react";
import { api } from "../api";

const useClientSecret = () => {
    const [clientSecret, setClientSecret] = useAtom(ClientSecretState);
    const [user] = useAtom(USER_STATE);

    useEffect(() => {
        !clientSecret && initClientSecret();
    }, []);

    const initClientSecret = async () => {
        try {
            if (!user?.userStore?.customerId) throw new Error();
            const { data } = await api.post("/payments/intent", {
                customer: user?.userStore?.customerId,
            });
            const newClientSecret = data.client_secret;
            setClientSecret(newClientSecret);
        } catch (err) {
            console.log(err);
        }
    };
};

export default useClientSecret;
