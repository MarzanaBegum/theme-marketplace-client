import { getCookie, removeCookies } from "cookies-next";
import { useAtom } from "jotai";
import { AppContext } from "next/app";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../../api";
import { USER_STATE } from "../../../state";
import { decryptData } from "../../../utils/hashdata";
import LoadingAnimation from "../../SvgCustomIcons/LoadingAnimation";

const AuthRouteRegex =
    /\/signup\/email-verfication\/(.*)?|\/signup|\/signin|\/forgot-password|\/password-reset\/(.*)?/g;

// |users\/(.*)?\/verify\/(.*)?

const UserRouteRegex = /\/account\//g;

const ProtectedRoutes = async ({ ctx: { req, res, pathname } }: AppContext) => {
    const serverClientRedirect = async (redirect?: string) => {
        if (res) {
            res.writeHead(302, {
                Location: redirect || "/signin",
                "Content-Type": "text/html; charset=utf-8",
            });
            res.end();
        } else {
            if (typeof window !== "undefined") {
                (window as Window).location = redirect || "/signin";
                await new Promise((resolve) => {});
            }
        }
    };

    try {
        const isValid = decryptData(
            `${getCookie("auth", {
                req,
                res,
            })}`
        );

        if (!isValid) throw new Error();

        const isMatch = pathname.match(AuthRouteRegex);
        if (isMatch) await serverClientRedirect("/");

        return {
            id: isValid.id,
        };
    } catch (err) {
        const isMatch = pathname.match(UserRouteRegex);
        if (isMatch) await serverClientRedirect("/signin");
        return {};
    }
};

export const ProtectedRoutesProvider = ({
    children,
    id,
}: {
    children: ReactNode;
    id?: string;
}) => {
    const [user, setUser] = useAtom(USER_STATE);
    const [loading, setLoading] = useState(true);
    const {} = useUserQuery(id);
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                if (!id) throw new Error();
                const { data } = await api.get(`/users/${id}`);
                setUser(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setUser(undefined);
            }
        })();
    }, [id]);

    return loading ? (
        <div className="flex items-center justify-center w-screen h-screen">
            <LoadingAnimation className="w-[60px] h-[60px]" color="#7266FC" />
        </div>
    ) : (
        <>{children}</>
    );
};

export const useUserQuery = (id?: string) => {
    const [user, setUser] = useAtom(USER_STATE);
    id = id ? id : user?._id;
    if (!id) setUser(undefined);
    return useQuery(["user-query-key", id], {
        queryFn: async () => {
            const { data } = await api.get(`/users/${id}`);
            return data;
        },
        onSuccess: (data) => {
            setUser(data);
        },
        enabled: !!id,
    });
};

export default ProtectedRoutes;
