import React from "react";
import { useQuery } from "react-query";
import { api } from "../api";

function useHomeRatings() {
    return useQuery<HomeRating[]>(["get-home-rating"], {
        queryFn: async () => {
            const { data } = await api.get("/ratings/home");
            return data;
        },
    });
}

export interface User {
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
    password: string;
}

export interface HomeRating {
    _id: string;
    user: User;
    text: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export default useHomeRatings;
