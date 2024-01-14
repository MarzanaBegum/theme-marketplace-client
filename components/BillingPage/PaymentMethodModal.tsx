import React, { useEffect } from "react";
import CustomModal from "../Shared/CustomModal/CustomModal";
import PaymentMethodForm from "./PaymentMethodForm";
import { useAtom } from "jotai";
import { ClientSecretState, USER_STATE } from "../../state";
import { api } from "../../api";

export type PSType = { type: "add" | "update" };

function PaymentMethodModal({
    modalOpen,
    handleModal,
    type = "add",
    onCompleted,
}: {
    modalOpen: boolean;
    handleModal: () => any;
    onCompleted?: (v: any) => any;
} & PSType) {
    const [clientSecret, setClientSecret] = useAtom(ClientSecretState);
    const [user] = useAtom(USER_STATE);

    useEffect(() => {
        !clientSecret && initClientSecret();
    }, [clientSecret]);

    const initClientSecret = async () => {
        try {
            if (!user?.userStore?.customerId) throw new Error();
            const { data } = await api.post("/payments/intent", {
                customer: user?.userStore?.customerId,
            });
            const newClientSecret = data.client_secret;
            setClientSecret(newClientSecret);
        } catch (err) {
            handleModal();
        }
    };

    return (
        <CustomModal
            isOpen={modalOpen}
            onRequestClose={handleModal}
            className="w-[calc(100vw-40px)] bg-[#fff] max-w-[540px] rounded overflow-y-auto"
        >
            <div className="p-5 ">
                {clientSecret ? (
                    <PaymentMethodForm
                        type={type}
                        clientSecret={clientSecret}
                        onCompleted={(v) => {
                            handleModal();
                            onCompleted && onCompleted(v);
                        }}
                    />
                ) : (
                    <div></div>
                )}
                <div className="absolute top-3 right-3">
                    <img
                        onClick={handleModal}
                        className="cursor-pointer"
                        src="/icons/cross.svg"
                        alt=""
                    />
                </div>
            </div>
        </CustomModal>
    );
}

export default PaymentMethodModal;
