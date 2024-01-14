/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import CustomModal from "../Shared/CustomModal/CustomModal";

function PasswordResetModal({
    modalOpen,
    handleModal,
}: {
    modalOpen: boolean;
    handleModal: () => void;
}) {
    return (
        <CustomModal
            isOpen={modalOpen}
            onRequestClose={handleModal}
            className="w-[calc(100vw-40px)] xs:w-[335px] sm:w-[450px] md:w-[520px] lg:w-[560px] xl:w-[650px] 2xl:w-[760px] 3xl:w-[800px] bg-[#fff] overflow-hidden rounded-[6px]"
        >
            <div className="p-5 py-[50px] text-center">
                <img
                    src="/img/success.svg"
                    alt="success"
                    className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] mx-auto"
                />
                <h1 className="mt-[24px] mb-[8px] text-[24px] leading-[36px] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[60px] text-[#252C48] font-medium">
                    Password Changed
                </h1>
                <h3 className="text-[14px] leading-[21px] lg:text-[16px] lg:leading-[24px] text-[#3B415A] font-normal">
                    Your password has been changed successfully.
                </h3>
                <Link href="/signin">
                    <button
                        className="w-[126px] h-[48px] lg:w-[169px] lg:h-[56px] mt-[20px] lg:mt-[40px] tex-[14px] lg:text-[16px] text-[#FFFFFF] font-semibold rounded-[6px] bg-[#7266FC]"
                        onClick={handleModal}
                    >
                        Sign in now
                    </button>
                </Link>
            </div>
        </CustomModal>
    );
}

export default PasswordResetModal;
