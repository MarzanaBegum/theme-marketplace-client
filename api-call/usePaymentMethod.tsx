import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { USER_STATE } from "../state";
import { api } from "../api";

const usePaymentMethod = () => {
    const [user] = useAtom(USER_STATE);
    return useQuery<PaymentMethodResponse>(
        ["payment-query-key", user?.userStore?.customerId],
        {
            queryFn: async () => {
                const { data } = await api.get(
                    `/payments/customer/${user?.userStore?.customerId}/payment-method`
                );
                return data;
            },
            enabled: !!user?.userStore?.customerId,
            retry: false,
        }
    );
};

export interface Address {
    city?: any;
    country: string;
    line1?: any;
    line2?: any;
    postal_code?: any;
    state?: any;
}

export interface BillingDetails {
    address: Address;
    email: string;
    name: string;
    phone?: any;
}

export interface Checks {
    address_line1_check?: any;
    address_postal_code_check?: any;
    cvc_check: string;
}

export interface Networks {
    available: string[];
    preferred?: any;
}

export interface ThreeDSecureUsage {
    supported: boolean;
}

export interface Card {
    brand: string;
    checks: Checks;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from?: any;
    last4: string;
    networks: Networks;
    three_d_secure_usage: ThreeDSecureUsage;
    wallet?: any;
}

export interface Metadata {}

export interface PaymentMethodResponse {
    id: string;
    object: string;
    billing_details: BillingDetails;
    card: Card;
    created: number;
    customer: string;
    livemode: boolean;
    metadata: Metadata;
    type: string;
}

export default usePaymentMethod;
