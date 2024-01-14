import { useQuery } from "react-query";
import { api } from "../api";

const useBillingQuery = (userId?: string) =>
    useQuery<BillingHistoryType[]>(["get-billing-information"], {
        queryFn: async () => {
            const { data } = await api.get(`/billing/user/${userId}`);
            return data;
        },
        enabled: !!userId,
    });

export interface UserId {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profile: string;
    googleAuth: boolean;
    status: string;
    userStore: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface Plan {
    _id: string;
    userId: string;
    planName: string;
    planPrice: number;
    interval: string;
    downloadLimit: number;
    planStart: Date;
    planEnd: Date;
    priceId: string;
    isTrial: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface LicenseType {
    pdf: string;
    price: string;
}

interface Licenses {
    personal: LicenseType;
    commercial: LicenseType;
    buyout: LicenseType;
}

interface Files {
    images: string[];
    sourceFile: string;
    thumbnail: string;
}

interface Feature {
    heading: string;
    list: string[];
}

interface Service {
    text: string;
    price: number;
}

interface ProductId {
    licenses: Licenses;
    files: Files;
    _id: string;
    title: string;
    categories: string[];
    type: string;
    isVisible: boolean;
    description: string;
    features: Feature[];
    services: Service[];
    liveLink: string;
    softwares: string[];
    tags: string[];
    views: number;
    downloads: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    comments: any[];
}

interface DownloadProduct {
    _id: string;
    userId: string;
    license: string;
    productId: ProductId;
    services: Service[];
    __v: number;
}

export interface BillingHistoryType {
    _id: string;
    userId: UserId;
    invoice_no: number;
    status: string;
    amount: number;
    plan?: Plan;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    downloadProduct?: DownloadProduct;
}

export default useBillingQuery;
