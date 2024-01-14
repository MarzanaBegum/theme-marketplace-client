import { useAtom } from "jotai";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { toast } from "react-toastify";
import { api } from "../api";
import { UserStateType, USER_STATE, ClientSecretState } from "../state/index";
import { ProductType } from "../api-call/useProductListQuery";
import { useRouter } from "next/router";

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

export interface PaymentMethodDataType {
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

type PaymentStateType = {
    user: UserStateType | undefined;
    tab: number;
    customer: string;
    clientSecret: string;
    subscription: any;
    product: any;
    paymentMethod: PaymentMethodDataType | undefined;
};

type PaymentDispatchType = {
    type: "tab" | "clientSecret" | "customer" | "paymentMethod" | "user";
    value: any;
};

type PaymentContextType = [
    state: PaymentStateType,
    dispatch: React.Dispatch<PaymentDispatchType>
];

export const PaymentReducerAction = (
    state: PaymentStateType,
    action: PaymentDispatchType
) => {
    const { type, value } = action;
    return { ...state, [type]: value };
};

const NewPaymentContext = createContext<PaymentContextType | null>(null);

export const GetPaymentContext = () =>
    useContext(NewPaymentContext) as PaymentContextType;

function PaymentContext({
    children,
    product,
    subscription,
}: {
    children?: ReactNode;
    product?: ProductType;
    subscription?: any;
}) {
    const [user] = useAtom(USER_STATE);
    const DEFAULT_VALUE = {
        subscription,
        product,
        user,
        tab: 1,
        customer: user?.userStore?.customerId || "",
        clientSecret: "",
        paymentMethod: undefined,
    };
    const router = useRouter();
    const reducer = useReducer(PaymentReducerAction, DEFAULT_VALUE);

    useEffect(() => {
        if (DEFAULT_VALUE?.customer) {
            (() => {
                api.get(
                    `/payments/customer/${DEFAULT_VALUE.customer}/payment-method`
                )
                    .then((v) => {
                        const { data } = v;
                        console.log(data);
                        reducer[1]({
                            type: "paymentMethod",
                            value: data,
                        });
                    })
                    .catch(async () => {
                        try {
                            const { data } = await api.post(
                                "/payments/intent",
                                {
                                    customer: DEFAULT_VALUE.customer,
                                }
                            );
                            const clientSecret = data.client_secret;
                            reducer[1]({
                                type: "clientSecret",
                                value: clientSecret,
                            });
                        } catch (error) {
                            toast.error(
                                "Something went wrong with the payment method, Please try again later"
                            );
                            console.log(error);
                        }
                    });
            })();
        }
    }, []);

    return (
        <NewPaymentContext.Provider value={reducer}>
            {children}
        </NewPaymentContext.Provider>
    );
}

export default PaymentContext;
