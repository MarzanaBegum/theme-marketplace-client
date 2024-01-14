import { api } from "../api";

type Base = {
    customer: string;
    amount: number;
    payment_method: string;
};

const CompletePayment = async (data: Base) => {
    return await api.post("/payments/custom/confirm", data);
};

export default CompletePayment;
