import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { GoogleLoginData } from "../components/AuthPage/ContinueWithGoogle";
import { SignupInput } from "../components/SignupForm";
import { sortOptions } from "../data/fixed";

export interface CurrentPlanType {
    _id: string;
    userId: string;
    planName: string;
    planPrice: number;
    interval: string;
    isTrial?: boolean;
    downloadLimit: number;
    planStart: Date;
    planEnd: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

type UserStoreType = {
    currentPlan: CurrentPlanType | undefined;
    userId?: string;
    customerId: string;
    wishList: any[];
    _id: string;
    downloadProducts: any[];
    freebieUse: boolean;
};

export type UserStateType = {
    firstName: string;
    lastName: string;
    email: string;
    profile?: string;
    userStore: UserStoreType;
    googleAuth?: boolean;
    _id: string;
};

export const USER_STATE = atom<UserStateType | undefined>(undefined);

export const TimeState = atomWithStorage<number | undefined>(
    "timer",
    undefined
);

export type PaymentUserType = SignupInput | GoogleLoginData;

export const PaymentUser = atom<PaymentUserType | undefined>(undefined);

export type ProductFilterStateType = {
    type: string;
    sort: string;
    categories: string[];
    softwares: string[];
    search: string;
};

export const ProductFilterState = atom<ProductFilterStateType>({
    type: "all products",
    sort: sortOptions[0].value,
    categories: [],
    softwares: [],
    search: "",
});

export const ClientSecretState = atomWithStorage<string | undefined>(
    "client-secret",
    undefined
);
