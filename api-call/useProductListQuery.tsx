import { UseQueryOptions } from "react-query";
import { api } from "../api";
import { ProductFilterStateType } from "../state";
import { decryptData } from "../utils/hashdata";
import { getCookie } from "cookies-next";

const useProductListQuery: (
    v?: ProductFilterStateType
) => UseQueryOptions<any, any, any, any> = (filterData) => ({
    queryFn: async () => {
        const { data } = await api.get("/products");
        let filterData = data ? data.filter((v: any) => v.isVisible) : [];
        const userId = decryptData(`${getCookie("auth")}`);
        filterData = filterData
            ? filterData.filter((v: any) =>
                  v?.buyout ? (v?.buyout === userId?.id ? true : false) : true
              )
            : [];

        return filterData;
    },
    select(data) {
        if (!filterData) return data;
        return data;
    },
});

export interface Personal {
    pdf: string;
    price: string;
}

export interface Commercial {
    pdf: string;
    price: string;
}

export interface Buyout {
    pdf: string;
    price: string;
}

export interface Licenses {
    personal: Personal;
    commercial: Commercial;
    buyout: Buyout;
}

export interface Files {
    images: string[];
    sourceFile: string;
    thumbnail: string;
}

export interface Feature {
    heading: string;
    list: string[];
}

export interface Service {
    text: string;
    price: number;
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
}

export interface Rating {
    _id: string;
    user: User;
    text: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface ProductType {
    licenses: Licenses;
    files: Files;
    _id: string;
    title: string;
    categories: string[];
    isVisible: boolean;
    description: string;
    features: Feature[];
    services: Service[];
    liveLink: string;
    softwares: string[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    ratings: Rating[];
    downloads: number;
    views: number;
    type: string;
    comments: string[];
}

export default useProductListQuery;

export const PRODUCT_LIST_KEY = "product-list-query";
