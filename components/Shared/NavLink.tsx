import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

type NavLinkType = {
    children?: ReactNode;
    match?: "exact" | "startsWith" | "includes" | "endsWith";
    href: string;
    className?: string;
};

function NavLink({
    children,
    match = "startsWith",
    ...props
}: LinkProps & NavLinkType) {
    const { asPath } = useRouter();
    let { href, className } = { ...props };
    const isActive =
        (match === "exact" && !!(asPath === href)) ||
        (match === "startsWith" && !!asPath.startsWith(href)) ||
        (match === "includes" && !!asPath.includes(href)) ||
        (match === "endsWith" && !!asPath.endsWith(href));

    return (
        <Link
            {...props}
            className={isActive ? `nav-active ${className}` : className}
        >
            {children}
        </Link>
    );
}

export default NavLink;
