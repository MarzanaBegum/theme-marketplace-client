import React, { useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import EditProfile from "./../../components/EditProfile/index";
import ChangePassword from "./../../components/ChangePassword/index";
import AccountNavbar from "../../components/Shared/AccountNavbar";
import WishCartHead from "../../components/WishCartPage/WishCartHead";
import Meta from "../../components/Shared/Meta";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import imageCompression from "browser-image-compression";
import { api } from "../../api";
import { useUserQuery } from "../../components/Shared/ProtectedRoutes";
import { toast } from "react-toastify";
import LoadingAnimation from "../../components/LoadingAnimation";

const commonBtnStyle =
    "flex items-center justify-center h-[48px] text-[12px] leading-[18px] text-surface font-medium rounded-[6px] cursor-pointer";
export default function Settings() {
    const [user] = useAtom(USER_STATE);
    const [image, setImage] = useState<File | undefined>();

    const { refetch } = useUserQuery();

    const [loading, setLoading] = useState(false);

    const changeProfilePic = async (file: File) => {
        if (loading) return;
        setLoading(true);
        try {
            const compressImg = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 200,
                useWebWorker: true,
            });

            const formData = new FormData();
            formData.append("file", compressImg, file.name);

            const { data } = await api.post("/bucket-store/upload", formData);
            await api.put("/users/" + user?._id, { profile: data.location });

            await api.post(`/notifications`, {
                userId: user?._id,
                title: "Profile photo updated",
                description: "You have just updated your profile photo!",
            });
            setLoading(false);
            refetch();
            toast.success("Profile updated successfully");
        } catch (err: any) {
            setLoading(false);
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
        }
    };

    return (
        <>
            <Meta title="Profile Settings - MyAccount" />
            <Layout>
                <AccountNavbar />
                <div>
                    <WishCartHead
                        title="Settings"
                        desc="Manage your profile, password"
                        bg="bg-neutral-muted"
                    />
                </div>

                <div className="bg-surface-muted">
                    <div className="container py-[40px] sm:py-[60px] lg:py-[40px] xl:py-[80px]">
                        <div className="relative">
                            <div className="absolute  right-0 rounded-full -top-[100px] z-[1] w-[80px] h-[80px] bg-[#EFF3FB] sm:h-[100px] xl:h-[180px] xl:w-[180px] xl:-top-[220px] sm:w-[100px] sm:-top-[130px] lg:h-[140px] group lg:w-[140px] lg:-top-[160px]">
                                <div className="relative w-full h-full">
                                    <img
                                        src={
                                            (image &&
                                                URL.createObjectURL(image)) ||
                                            user?.profile ||
                                            "https://st.depositphotos.com/1007712/2069/v/450/depositphotos_20694219-stock-illustration-default-icon.jpg"
                                        }
                                        className="w-full h-full rounded-full object-cover"
                                        alt=""
                                    />
                                    {loading ? (
                                        <div className="h-full rounded-full  transit flex items-center justify-center cursor-pointer absolute left-0 bottom-0 bg-[rgba(0,0,0,.5)] w-full z-[4]">
                                            <LoadingAnimation
                                                width={32}
                                                height={32}
                                                color="#fff"
                                            />
                                        </div>
                                    ) : (
                                        <label className="h-full rounded-full lg:group-hover:opacity-100 opacity-0 transit flex items-center justify-center cursor-pointer absolute left-0 bottom-0 bg-[rgba(0,0,0,.5)] w-full z-[2]">
                                            {/*?xml version="1.0" ?*/}
                                            <svg
                                                height="36px"
                                                id="Layer_1"
                                                enableBackground="new 0 0 512 512"
                                                version="1.1"
                                                viewBox="0 0 512 512"
                                                width="36px"
                                                fill="#fff"
                                                xmlSpace="preserve"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                            >
                                                <g>
                                                    <path d="M430.4,147h-67.5l-40.4-40.8c0,0-0.2-0.2-0.3-0.2l-0.2-0.2v0c-6-6-14.1-9.8-23.3-9.8h-84c-9.8,0-18.5,4.2-24.6,10.9l0,0.1   l-39.5,40H81.6C63,147,48,161.6,48,180.2v202.1c0,18.6,15,33.7,33.6,33.7h348.8c18.5,0,33.6-15.1,33.6-33.7V180.2   C464,161.6,448.9,147,430.4,147z M256,365.5c-50.9,0-92.4-41.6-92.4-92.6c0-51.1,41.5-92.6,92.4-92.6c51,0,92.4,41.5,92.4,92.6   C348.4,323.9,307,365.5,256,365.5z M424.1,200.5c-7.7,0-14-6.3-14-14.1s6.3-14.1,14-14.1c7.7,0,14,6.3,14,14.1   S431.8,200.5,424.1,200.5z" />
                                                    <path d="M256,202.9c-38.6,0-69.8,31.3-69.8,70c0,38.6,31.2,70,69.8,70c38.5,0,69.8-31.3,69.8-70C325.8,234.2,294.5,202.9,256,202.9   z" />
                                                </g>
                                            </svg>
                                            <input
                                                accept="image/*"
                                                onClick={(e) =>
                                                    (e.currentTarget.value = "")
                                                }
                                                onChange={async (e) => {
                                                    const file =
                                                        e.currentTarget
                                                            .files![0];
                                                    if (!file) return;
                                                    setImage(file);
                                                    await changeProfilePic(
                                                        file
                                                    );
                                                }}
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-center gap-[16px] sm:gap-[24px]">
                            <div>
                                <EditProfile />
                            </div>
                            <div>
                                <ChangePassword />
                            </div>
                        </div>
                        <div className="bg-surface mt-[16px] hidden sm:mt-[24px] py-[16px] px-[10px] lg:p-[20px] rounded-[6px]">
                            <h2 className="text-[20px] leading-[30px] font-medium mb-[24px] lg:text-[24px] lg:leading-[36px] lg:font-semibold text-center text-neutral">
                                Connect with social media
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[20px] 2xl:gap-[24px] 3xl:gap-[20px] place-content-center">
                                <button
                                    className={`${commonBtnStyle} bg-[#DB4437]`}
                                >
                                    <img
                                        src="/img/google.svg"
                                        alt="google"
                                        className="w-[18px] h-[18px] mr-[7px]"
                                    />{" "}
                                    Connect with Google
                                </button>
                                <button
                                    className={`${commonBtnStyle} bg-[#4267B2]`}
                                >
                                    <img
                                        src="/img/facebook.svg"
                                        alt="google"
                                        className="w-[18px] h-[18px] mr-[7px]"
                                    />{" "}
                                    Connect with Facebook
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
