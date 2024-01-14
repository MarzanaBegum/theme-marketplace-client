import React from "react";
import NavLink from "../NavLink";

const data = [
    {
        title: "Downloads",
        link: "/account/downloads",
    },
    {
        title: "Billing",
        link: "/account/billing",
    },
    {
        title: "Notifications",
        link: "/account/notifications",
    },
    {
        title: "Settings",
        link: "/account/settings",
    },
];

function AccountNavbar() {
    return (
        <div className="hidden lg:flex lg:h-[56px] bg-neutral justify-center">
            {data.map((v, i) => (
                <NavLink
                    href={v.link}
                    key={i}
                    className="w-[135px] xl:w-[160px] group  2xl:w-[190px] h-full flex justify-center rounded-tr-xl relative rounded-tl-xl items-center nav-active:bg-neutral-muted"
                >
                    <div className="text-surface w-[85%] group-hover:text-brand transit leading-[52px] nav-active:border-b nav-active:text-brand border-[#FFFFFF26] text-base font-bold  text-center">
                        {v.title}
                    </div>
                    <div className="hidden nav-active:block">
                        <div className="absolute w-4 h-4 bg-neutral-muted -right-4 bottom-0">
                            <div className="w-full h-full bg-neutral rounded-bl-xl"></div>
                        </div>
                        <div className="absolute w-4 h-4 bg-neutral-muted -left-4 bottom-0">
                            <div className="w-full h-full bg-neutral rounded-br-xl"></div>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

export default AccountNavbar;
