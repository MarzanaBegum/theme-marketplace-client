import "../styles/globals.css";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tooltip/dist/react-tooltip.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoutes, {
    ProtectedRoutesProvider,
} from "../components/Shared/ProtectedRoutes";
import { useAtom } from "jotai";
import { USER_STATE } from "../state";
import { useEffect } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

console.log = () => {};
console.error = () => {};
console.warn = () => {};

const GOOGLE_CLIENT =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "1044657242184-snserdrnpdbu84f5tcoae1iasvq1ilkc.apps.googleusercontent.com";

const queryClient = new QueryClient();

export default function App({
    Component,
    pageProps,
    id,
}: AppProps & { id?: string }) {
    const [user, setUser] = useAtom<any>(USER_STATE);
    const router = useRouter();

    useEffect(() => {
        if (user?.status === "banned") {
            deleteCookie("auth");
            router.push("/signup");
        }
    }, [router, user]);

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT}>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                style={{ zIndex: 99999999999999999999999 }}
                draggable
                pauseOnHover
            />
            <QueryClientProvider client={queryClient}>
                <ProtectedRoutesProvider id={id}>
                    <Component {...pageProps} />
                </ProtectedRoutesProvider>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    );
}

// Route protect
App.getInitialProps = ProtectedRoutes;
