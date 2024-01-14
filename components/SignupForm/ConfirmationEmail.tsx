import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../api";
import { TimeState } from "../../state";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";

const ConfirmationEmail = () => {
    const router = useRouter();
    const { email, auto } = router.query;

    const [loading, setLoading] = useState(false);

    const [timer, setTimer] = useAtom(TimeState);

    const initialTimer = (num?: number) => {
        setTimer(num || 60);
        let timerVar = num || 60;
        const interval = setInterval(() => {
            if (timerVar === 0) {
                setTimer(undefined);
                clearInterval(interval);
                return;
            }
            timerVar--;
            setTimer(timerVar);
            // setTimer(timer - 1);
        }, 1000);
    };

    useEffect(() => {
        if (timer && timer > 0) {
            initialTimer(timer);
        }
    }, []);

    const handleResendEmail = async () => {
        if (timer) return;
        try {
            setLoading(true);
            if (email) {
                await api.post("/auth/resend-email", { email });
            }
            toast.success("Email sent successfully!");
            setLoading(false);
            initialTimer();
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
            if (errMessage === "This account already verified") {
                await router.push("/signin");
            }
            setLoading(false);
            console.log(err);
        }
    };

    useEffect(() => {
        if (!timer && auto) {
            if (email && !loading) {
                setLoading(true);
                api.post("/auth/resend-email", { email })
                    .then((v) => {
                        setLoading(false);
                        toast.success("Email sent successfully!");
                        initialTimer();
                    })
                    .catch((err) => {
                        setLoading(false);
                        console.log(err);
                    });
            }
        }
    }, [auto]);

    return (
        <button
            onClick={handleResendEmail}
            type="button"
            className="w-[100%] h-[48px] xl:h-[56px] mt-[20px] sm:mt-[24px] lg:mt-[30px] text-[16px] font-bold cursor-pointer rounded-[6px] bg-[#7266FC] hover:bg-brand-dark transition-all duration-200 text-[#FFFFFF]"
        >
            {loading ? (
                <span className="flex items-center gap-2 justify-center">
                    <LoadingAnimation color="white" />
                    <div>Loading...</div>
                </span>
            ) : (
                <>
                    {timer ? (
                        <span>Wait {timer} sec</span>
                    ) : (
                        <span>Resend verification email</span>
                    )}
                </>
            )}
        </button>
    );
};

export default ConfirmationEmail;
