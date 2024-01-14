import React from "react";

function PaymentProgress({ progress }: { progress: number }) {
    return (
        <div className="flex pt-[6px] pb-12 justify-center">
            <div className="flex items-center ">
                <div className="relative">
                    <div
                        style={{
                            backgroundColor:
                                progress === 2 ? "#7266FC" : "#fff",
                        }}
                        className="w-10 h-10 rounded-full border-[2px] border-brand text-brand text-sm bg-white flex justify-center items-center font-semibold"
                    >
                        {progress === 2 ? (
                            <img
                                className=" bg-brand"
                                src="/icons/check.svg"
                                alt=""
                            />
                        ) : (
                            "1"
                        )}
                    </div>

                    <div className="text-sm text-center top-[calc(100%+7px)] text-brand absolute left-1/2 -translate-x-1/2 w-[120px]">
                        Create Account
                    </div>
                </div>
                <div
                    className={`w-[150px] h-[2px] ${
                        progress === 2 ? "bg-brand" : "bg-[#9AA5B5]"
                    } `}
                ></div>
                <div className="relative">
                    <div
                        className={`w-10 h-10 rounded-full border-[2px] ${
                            progress === 2
                                ? "border-brand text-brand"
                                : "border-[#9AA5B5] text-[#9AA5B5]"
                        }   text-sm bg-white flex justify-center items-center font-semibold`}
                    >
                        2
                    </div>
                    <div
                        className={`text-sm text-center top-[calc(100%+7px)] ${
                            progress === 2 ? "text-brand" : "text-[#9AA5B5]"
                        }  absolute left-1/2 -translate-x-1/2 w-[120px]`}
                    >
                        Checkout
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentProgress;
