import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useOutsideClick } from "outsideclick-react";
import {
    AvatarIcon,
    WishIcon,
    CartIcon,
    SearchIcon,
    MenuIcon,
    DownloadBlack,
    Settings,
    DollarSign,
    Bell,
    Logout,
} from "../../SvgCustomIcons";
import classnames from "classnames";
import MobileDrawer from "../../MobileDrawer";
import classNames from "classnames";
import Link from "next/link";
import Avatar from "react-avatar";
import { ProductFilterState, USER_STATE } from "../../../state";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import useProductQuery from "../../../api-call/useProductQuery";
import usePlanAvailable from "../../../hooks/usePlanAvailable";
import useHeaderCategories from "../../../api-call/useHeaderCategories";
import DropdownList from "./DropdownList";

const urlData = [
    {
        id: 1,
        Icon: SearchIcon,

        baseUrl: "#",
    },
    {
        id: 2,
        Icon: WishIcon,

        baseUrl: "#",
    },
    // {
    //     id: 3,
    //     Icon: CartIcon,
    //     baseUrl: "",
    // },
];

// Profile Dropdown Data
const profileDropdownData = [
    {
        id: 1,
        title: "Downloads",
        Icon: DownloadBlack,
        url: "downloads",
        totalNumber: 2646,
    },
    {
        id: 2,
        title: "Billings",
        Icon: DollarSign,
        url: "billing",
        totalNumber: 356,
    },
    {
        id: 3,
        title: "Notifications",
        Icon: Bell,
        url: "notifications",
        totalNumber: 456,
    },
    {
        id: 4,
        title: "Settings",
        Icon: Settings,
        url: "settings",
        totalNumber: 346,
    },
    {
        id: 5,
        title: "Log Out",
        Icon: Logout,
        url: "logout",
        totalNumber: 6267,
    },
];

const Header: NextPage = () => {
    const [buttonHover, setButtonHover] = useState(false);
    const [getIndex, setIndex] = useState<any>({});
    const [iconColor, setIconColor] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cartColor, setCarColor] = useState(false);
    const [dropdownIconColor, setDropdownIconColor] = useState(false);
    const [profileIconColor, setProfileIconColor] = useState(false);
    const [dropIndex, setDropIndex] = useState<any>({});
    const [profileDropIndex, setProfileDropIndex] = useState<any>({});
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const router = useRouter();

    const outProfileRef = useOutsideClick(handleProfileOutsideClick);
    const outCategoryRef = useOutsideClick(handleCategoryOutsideClick);

    function handleProfileOutsideClick() {
        setProfileOpen(false);
    }

    function handleCategoryOutsideClick() {
        setDropDownOpen(false);
    }

    const mouseOver = (id: number) => {
        if (id) setIconColor(true);
    };
    const mouseLeave = (id: number) => {
        if (id) setIconColor(false);
    };

    const DropMouseOver = (id: number) => {
        if (id) setDropdownIconColor(true);
    };
    const DropMouseLeave = (id: number) => {
        if (id) setDropdownIconColor(false);
    };

    const ProfileMouseOver = (id: number) => {
        if (id) setProfileIconColor(true);
    };
    const ProfileMouseLeave = (id: number) => {
        if (id) setProfileIconColor(false);
    };

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const query = router.query;

    const [user] = useAtom(USER_STATE);
    // console.log("user", user);

    const { data: totalProduct, isLoading } = useHeaderCategories();

    //   console.log("dttttttttt", totalProduct);
    const [filterState, setFilterState] = useAtom(ProductFilterState);

    const isPlan = usePlanAvailable();

    const { isLimit, downloaded, totalLimit } = useDownloadLeft();

    return (
        <>
            {/* Search Box */}
            {"search" in query && (
                <div className="bg-white pb-[28px] pt-[50px] border-b border-[#000000]/15%">
                    <div className="container">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex items-center justify-center"
                        >
                            <input
                                type="input"
                                name="search"
                                placeholder="Type anything to search...."
                                className="w-full placeholder:text-[#9AA5B5] font-normal text-[24px] leading-[24px] py-[10px] focus:outline-none"
                                autoFocus
                                value={filterState.search}
                                onChange={(e) => {
                                    setFilterState((v) => ({
                                        ...v,
                                        search: e.target.value,
                                    }));
                                }}
                            />
                            <Link
                                href={{
                                    pathname: "/product",
                                    query: {
                                        ...removeFromObj(query, "search"),
                                    },
                                }}
                                passHref
                                onClick={() => {
                                    setFilterState((v) => ({
                                        ...v,
                                        search: "",
                                    }));
                                }}
                            >
                                <div className="text-[16px] font-semibold cursor-pointer p-[10px]">
                                    &#x2715;
                                </div>
                            </Link>
                        </form>
                    </div>
                </div>
            )}
            {/* Search Box End */}
            {/* max-md:drop-shadow-md shadow-[rgba(0,0,0,.05)]  */}
            {!("search" in query) && (
                <>
                    <header className="shadow-[rgba(0,0,0,0.05)] shadow-md ">
                        <div className="py-[15px] sm:py-[10px] lg:py-[15px]  xl:py-[16px] px-[20px]  sm:px-[40px]  md:px-[50px] lg:px-[47px] xl:px-[60px] 2xl:px-[120px] 3xl:px-[180px] bg-[#EFF3FB]  lg:bg-white">
                            <div className="flex items-center justify-between">
                                {/* left item  start */}
                                <div className="flex items-center gap-[30px] lg:hidden">
                                    <img
                                        onClick={() => router.push("/")}
                                        src="/logo/logo-icon.svg"
                                        alt="brand logo"
                                        className="w-[40px] h-[25px] cursor-pointer"
                                    />
                                </div>
                                <div className="lg:flex gap-[30px] items-center hidden">
                                    <div>
                                        <img
                                            onClick={() => router.push("/")}
                                            src="/logo/logo-full.svg"
                                            alt="Logo"
                                            className="xl:h-[38px] h-[28px]  cursor-pointer"
                                        />
                                    </div>
                                    <div
                                        className="relative"
                                        ref={outCategoryRef}
                                    >
                                        <div
                                            onClick={() =>
                                                setDropDownOpen(!dropDownOpen)
                                            }
                                            className={classNames(
                                                " w-[138px] xl:h-[48px] h-[40px] rounded-[6px] flex justify-center items-center gap-[13px] cursor-pointer",
                                                dropDownOpen === true
                                                    ? "bg-[#252C48] text-white"
                                                    : "bg-[#EFF3FB] text-[#3B415A]"
                                            )}
                                        >
                                            <img
                                                src={`/images/${
                                                    dropDownOpen === true
                                                        ? "whitecross.svg"
                                                        : "miniHumburg.svg"
                                                }`}
                                                alt="Humburger"
                                                className="w-[14px] h-[12px]"
                                            />
                                            <p className=" text-[14px] font-semibold tracking-[-0.6%]">
                                                Categories
                                            </p>
                                        </div>
                                        {dropDownOpen && (
                                            <div
                                                style={{
                                                    boxShadow:
                                                        "2px 6px 20px rgba(0, 0, 0, 0.1)",
                                                }}
                                                className="w-[302px] h-auto absolute top-[40px] xl:top-12 left-0 lg:block bg-white rounded-[6px] z-10"
                                            >
                                                <div className="py-[30px]">
                                                    <DropdownList
                                                        data={totalProduct}
                                                        dropdown={
                                                            setDropDownOpen
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* left item end */}

                                {/* right item start  */}
                                <div className="flex items-center  gap-[20px]">
                                    {!isPlan && (
                                        <button
                                            onClick={() =>
                                                router.push("/unlimited-access")
                                            }
                                            className=" xl:gap-[20px] gap-[8px] xl:w-[221px] w-[190px] xl:h-[48px] h-[40px] transition duration-700 bg-[#7266FC] hover:bg-[#5047b8] rounded-[6px] sm:flex items-center justify-center  cursor-pointer hidden"
                                        >
                                            <img
                                                src="/images/diamondIcon.svg"
                                                alt=""
                                                className="w-[19.29px] h-[17.14px]"
                                            />
                                            <p className="text-[white] font-medium text-[14px] xl:text-[16px]">
                                                Get unlimited access
                                            </p>
                                        </button>
                                    )}

                                    <div className="relative hidden lg:flex">
                                        {/* Profile Avatar */}
                                        {user ? (
                                            <div
                                                ref={outProfileRef}
                                                className=""
                                            >
                                                {user?.profile ? (
                                                    <div
                                                        onClick={() =>
                                                            setProfileOpen(
                                                                !profileOpen
                                                            )
                                                        }
                                                        className="w-[40px] xl:w-[48px] xl:h-[48px] h-[40px] rounded-[6px] flex justify-center items-center gap-[13px] cursor-pointer active:outline active:outline-brand active:outline-[3px] outline-offset-2"
                                                    >
                                                        <img
                                                            onError={(
                                                                e: any
                                                            ) => {
                                                                e.target.src =
                                                                    "/img/profile.png";
                                                            }}
                                                            src={`${user?.profile}`}
                                                            className="w-full h-full object-cover rounded-[6px]"
                                                            alt=""
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            setProfileOpen(
                                                                !profileOpen
                                                            )
                                                        }
                                                        className={classNames(
                                                            "cursor-pointer"
                                                        )}
                                                    >
                                                        <Avatar
                                                            round="6px"
                                                            name={
                                                                user?.firstName
                                                            }
                                                            maxInitials={1}
                                                            size="38px"
                                                            className={classNames(
                                                                "[&>*]:!text-base !font-semibold !w-[40px] xl:!w-[48px] xl:!h-[48px] !h-[40px]",
                                                                profileOpen ===
                                                                    true
                                                                    ? "!bg-brand !text-white"
                                                                    : "!bg-[#EFF3FB] !text-brand"
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                                {/* Profile Avatar End */}

                                                {profileOpen && (
                                                    <div
                                                        style={{
                                                            boxShadow:
                                                                "2px 6px 20px rgba(0, 0, 0, 0.1)",
                                                        }}
                                                        className="w-[240px] h-auto absolute top-[50px] xl:top-14 right-0 lg:block bg-white rounded-[6px] z-10"
                                                    >
                                                        <div className="p-[16px]">
                                                            <span className="text-neutral font-semibold text-[24px] leading-[36px]">
                                                                {`${user?.firstName} ${user?.lastName}`}
                                                            </span>
                                                        </div>
                                                        <hr className="bg-[#F2F4F7] h-[1px]" />
                                                        <div className="py-[16px]">
                                                            {profileDropdownData.map(
                                                                ({
                                                                    Icon,
                                                                    id,
                                                                    title,
                                                                    url,
                                                                }) => (
                                                                    <Link
                                                                        href={`/account/${url}`}
                                                                        passHref
                                                                        key={id}
                                                                    >
                                                                        <div className="mb-[20px] last:mb-0 border-l-[4px] border-[#fff] rounded-r-full hover:border-l-[#7266FC] pl-[6px] pr-[16px]">
                                                                            <div
                                                                                onMouseOver={() => {
                                                                                    ProfileMouseOver(
                                                                                        id
                                                                                    ),
                                                                                        setProfileDropIndex(
                                                                                            id
                                                                                        );
                                                                                }}
                                                                                onMouseLeave={() => {
                                                                                    ProfileMouseLeave(
                                                                                        id
                                                                                    ),
                                                                                        setProfileDropIndex(
                                                                                            id
                                                                                        );
                                                                                }}
                                                                                className="flex items-center justify-between last:mb-0 w-full cursor-pointer hover:bg-[#eeecf7bb] py-[10px] px-[10px] rounded-[6px] group"
                                                                            >
                                                                                <div className="flex w-full gap-[14px] items-center relative">
                                                                                    <Icon
                                                                                        width="20"
                                                                                        height="18"
                                                                                        stroke={`${
                                                                                            id ===
                                                                                                profileDropIndex &&
                                                                                            profileIconColor ===
                                                                                                true
                                                                                                ? "#7266FC"
                                                                                                : "#3B415A"
                                                                                        }`}
                                                                                    />
                                                                                    <div className="text-[16px] leading-[24px] text-[#252C48] w-[calc(100%-34px)] flex justify-between items-center font-medium group-hover:text-[#7266FC]">
                                                                                        <div>
                                                                                            {
                                                                                                title
                                                                                            }
                                                                                        </div>
                                                                                        {isLimit &&
                                                                                            title ===
                                                                                                "Downloads" && (
                                                                                                <p className="text-sm leading-[14px]">
                                                                                                    {
                                                                                                        downloaded
                                                                                                    }

                                                                                                    /
                                                                                                    {
                                                                                                        totalLimit
                                                                                                    }
                                                                                                </p>
                                                                                            )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    router.push("/signin")
                                                }
                                                className="group w-[106px] xl:h-[48px] h-[40px] border border-[#DDE2E4] text-[14px] font-normal text-[#7266FC] rounded-[6px] cursor-pointer hover:bg-[#7266FC] transition duration-500 hidden lg:block"
                                            >
                                                <div className=" px-[14px] xl:py-[12px] py-[6px] flex justify-center items-center  gap-[10px] ">
                                                    <div>
                                                        <AvatarIcon
                                                            stroke="#7266FC"
                                                            groupClassName="group-hover:stroke-[#fff]  transition duration-500"
                                                        />
                                                    </div>
                                                    <p className="text-[14px] transition duration-500 font-normal tracking-[-0.6%] group-hover:text-white">
                                                        Sign In
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex relative items-center gap-[20px]">
                                        {urlData.map(({ id, Icon }) => (
                                            <Link
                                                href={
                                                    id === 1
                                                        ? {
                                                              pathname:
                                                                  "/product",
                                                              query: {
                                                                  search: "",
                                                                  type:
                                                                      router
                                                                          ?.query
                                                                          ?.type ||
                                                                      "",
                                                              },
                                                          }
                                                        : "/account/wishlist"
                                                }
                                                passHref
                                                key={id}
                                            >
                                                <div
                                                    onMouseOver={() => {
                                                        mouseOver(id),
                                                            setIndex(id);
                                                    }}
                                                    onMouseLeave={() => {
                                                        mouseLeave(id),
                                                            setIndex(id);
                                                    }}
                                                    key={id}
                                                    className="cursor-pointer"
                                                >
                                                    <Icon
                                                        stroke={`${
                                                            id === getIndex &&
                                                            iconColor === true
                                                                ? "#7266FC"
                                                                : "#3B415A"
                                                        }`}
                                                    />
                                                </div>
                                            </Link>
                                        ))}
                                        {/* <div
                                onMouseOver={() => setCarColor(true)}
                                onMouseLeave={() => setCarColor(false)}
                                className="hidden lg:block"
                            >
                                <CartIcon
                                    stroke={
                                        cartColor === true
                                            ? "#7266FC"
                                            : "#3B415A"
                                    }
                                />
                            </div> */}
                                        <div className="absolute text-xs flex justify-center items-center lg:-top-[10px] lg:-right-[10px] -top-[10px] right-8 h-[18px] w-[18px] rounded-full bg-brand text-white">
                                            {user?.userStore?.wishList
                                                ?.length || 0}
                                        </div>
                                        <img
                                            onClick={toggleDrawer}
                                            src="/images/miniHumburg.svg"
                                            alt="menu icon"
                                            className="w-[20px] h-[15px] cursor-pointer lg:hidden"
                                        />
                                    </div>
                                </div>
                                {/* right item end */}
                            </div>
                        </div>
                        <div className="lg:hidden">
                            <MobileDrawer
                                isOpen={isOpen}
                                toggleDrawer={toggleDrawer}
                                totalProduct={totalProduct}
                            />
                        </div>
                    </header>
                    {/* <div className="pt-[55px] sm:pt-[45px] lg:pt-[70px] xl:pt-[80px]"></div>
                    top-0 z-[999999999999] left-0 fixed w-full */}
                </>
            )}
        </>
    );
};

type ReturnDownloadLeft = {
    isLimit: boolean;
    downloaded: number;
    totalLimit: number;
    limitOver: boolean;
    isDownloadedProduct?: boolean;
};

export function useDownloadLeft(productId?: string): ReturnDownloadLeft {
    const emptyReturn = {
        isLimit: false,
        downloaded: 0,
        totalLimit: 0,
        limitOver: false,
    };
    const [user] = useAtom(USER_STATE);
    if (
        !user ||
        !user?.userStore?.currentPlan ||
        !user?.userStore?.currentPlan?.isTrial
    )
        return emptyReturn;
    const downloaded = user.userStore.downloadProducts.length;
    const totalLimit = user.userStore.currentPlan.downloadLimit;
    const isDownloadedProduct =
        user.userStore.downloadProducts.includes(productId);
    return {
        isLimit: true,
        downloaded,
        totalLimit,
        limitOver: downloaded === totalLimit,
        isDownloadedProduct,
    };
}

function removeFromObj(obj: any, key: string): object {
    let { [key]: remove, ...rest } = obj;
    return {
        ...rest,
    };
}

export default Header;
