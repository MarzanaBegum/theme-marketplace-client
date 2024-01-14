import { useAtom } from "jotai";
import { USER_STATE } from "../state";
import { getRemainingDate } from "../components/BillingPageComponent/BillingFirstCard";

const usePlanAvailable = () => {
    const [user] = useAtom(USER_STATE);
    if (!user) return false;
    if (!user?.userStore?.currentPlan) return false;
    const currentPlan = user.userStore.currentPlan;
    const leftDay = currentPlan
        ? Math.max(getRemainingDate(new Date(), currentPlan?.planEnd), 0)
        : 0;
    if (leftDay === 0) return false;
    return true;
};

export const usePlanExpired = () => {
    const [user] = useAtom(USER_STATE);
    if (!user) return false;
    if (!user?.userStore?.currentPlan) return false;
    const currentPlan = user.userStore.currentPlan;
    const leftDay = currentPlan
        ? Math.max(getRemainingDate(new Date(), currentPlan?.planEnd), 0)
        : 0;
    if (leftDay === 0) return true;
    return false;
};

export default usePlanAvailable;
