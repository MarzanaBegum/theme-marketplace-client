import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import usePlanAvailable from "../../hooks/usePlanAvailable";

function TopHeader({ setTab, tab, title }: any) {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div className="w-full flex items-center justify-between h-[60px] bg-[#EFF3FB]">
            <div className="w-1/2 lg:w-1/3 pl-5">
                <Link href={`/product/${id}`}>
                    <div className="text-brand text-sm line-clamp-1">
                        {"<"} {title}
                    </div>
                </Link>
            </div>
            <SizeButtonComponent tab={tab} setTab={setTab} />
            <RightButtonSection />
        </div>
    );
}

function RightButtonSection() {
    const router = useRouter();
    const { id } = router.query;

    const isPlan = usePlanAvailable();

    return (
        <div className="w-1/2 lg:w-1/3 gap-5 flex lg:justify-center justify-end pr-5 ">
            <Link href={`/product/${id}`}>
                <button className="  gap-[8px]   h-[40px] transition duration-700 bg-[#7266FC] hover:bg-[#5047b8] rounded-[6px cursor-pointer rounded px-4">
                    <p className="text-[white] font-medium text-[14px] xl:text-[16px]">
                        Download
                    </p>
                </button>
            </Link>
            {!isPlan && (
                <Link href="/unlimited-access">
                    <button className=" gap-[8px] px-4 h-[40px] transition duration-700 bg-[#7266FC] hover:bg-[#5047b8] rounded flex items-center justify-center cursor-pointer">
                        <img
                            src="/images/diamondIcon.svg"
                            alt=""
                            className="w-[19.29px] h-[17.14px]"
                        />
                        <p className="text-[white] hidden lg:block font-medium text-[14px] xl:text-[16px]">
                            Get unlimited access
                        </p>
                    </button>
                </Link>
            )}
        </div>
    );
}

function SizeButtonComponent({ setTab, tab }: any) {
    return (
        <div className=" hidden lg:flex w-1/3 justify-center  gap-4">
            <button onClick={() => setTab("392px")}>
                <svg
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="device-btn-icon"
                >
                    <path
                        className={tab === "392px" ? " fill-brand" : ""}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.667 6.667H14a.667.667 0 010-1.334h2.667a.667.667 0 010 1.334zm0 18.666H14A.667.667 0 0114 24h2.667a.667.667 0 010 1.333zM10 4c-.367 0-.667.3-.667.667V26c0 .367.3.667.667.667h10.667c.366 0 .666-.3.666-.667V4.667c0-.367-.3-.667-.666-.667H10zm10.667 24H10c-1.103 0-2-.897-2-2V4.667c0-1.103.897-2 2-2h10.667c1.102 0 2 .897 2 2V26c0 1.103-.898 2-2 2z"
                    />
                </svg>{" "}
            </button>
            <button onClick={() => setTab("785px")}>
                <svg
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="device-btn-icon"
                >
                    <path
                        className={tab === "785px" ? " fill-brand" : ""}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.667 6.667H14a.667.667 0 010-1.334h2.667a.667.667 0 010 1.334zm0 18.666H14A.667.667 0 0114 24h2.667a.667.667 0 010 1.333zM7.333 4c-.366 0-.666.3-.666.667V26c0 .367.3.667.667.667h16c.366 0 .666-.3.666-.667V4.667C24 4.3 23.7 4 23.334 4h-16zm16 24h-16c-1.102 0-2-.897-2-2V4.667c0-1.103.898-2 2-2h16c1.103 0 2 .897 2 2V26c0 1.103-.897 2-2 2z"
                    />
                </svg>{" "}
            </button>
            <button onClick={() => setTab("100%")}>
                <svg
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="device-btn-icon"
                >
                    <path
                        className={tab === "100%" ? " fill-brand" : ""}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.389 20.176H28V4.78a.701.701 0 00-.694-.704H5.083a.701.701 0 00-.694.704v15.395zm0 1.407v.704c0 .387.312.703.694.703h22.223a.701.701 0 00.694-.703v-.704H4.389zm8.53 5.01h6.552l-1.042-2.195h-4.47l-1.04 2.195zM20.36 28h-8.333a.695.695 0 01-.549-.27.715.715 0 01-.125-.604l1.172-2.728H5.083C3.935 24.398 3 23.45 3 22.287V4.78c0-1.164.935-2.111 2.083-2.111h22.223c1.148 0 2.083.947 2.083 2.11v17.507c0 1.164-.935 2.11-2.083 2.11h-7.444l1.173 2.73a.715.715 0 01-.125.603.695.695 0 01-.549.27z"
                    />
                </svg>{" "}
            </button>
        </div>
    );
}

export default TopHeader;
