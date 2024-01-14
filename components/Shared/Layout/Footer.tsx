import type { NextPage } from "next";
import classNames from "classnames";
import FooterSocial from "./../../FooterSocial/index";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import SubscribeNewsLetter from "../../SubscribeNewsLetter";

const spacingContainer =
    "px-[20px] sm:px-[40px]  md:px-[50px] lg:px-[47px] xl:px-[60px] 2xl:px-[120px] 3xl:px-[180px]";

const Footer: NextPage = () => {
    const URL = `${process.env.NEXT_PUBLIC_MAILCHIMP_URL}`;

    return (
        <div className="w-[100%] bg-[#252C48] h-auto text-[white]">
            <div
                className={classNames(
                    `${spacingContainer}`,
                    "py-[20px] sm:py-[34px] md:py-[30px] lg:py-[43px] xl:py-[49px] 2xl:py-[46px] 3xl:py-[40px]"
                )}
            >
                <div className="w-[100%] mx-auto text-center">
                    <div className="pt-6 sm:pt-3"></div>
                    <img
                        src="/logo/logo-icon.svg"
                        alt="brand logo"
                        className="w-[61px] h-[38.53px]  lg:hidden mx-auto "
                    />
                    <h1 className="3xl:text-[24px] 2xl:mt-[40px] xl:mt-[34px] mt-0 font-medium text-[20px] lg:text-[24px] xl:mb-[24px] mb-[18px]">
                        Subscribe to our newsletter
                    </h1>

                    <MailchimpSubscribe
                        url={URL}
                        render={({ status, message, subscribe }) => {
                            return (
                                <SubscribeNewsLetter
                                    status={status}
                                    message={message}
                                    onValidated={(formData: any) =>
                                        subscribe(formData)
                                    }
                                />
                            );
                        }}
                    />
                </div>
                {/* footer social icons  */}
                <FooterSocial />
            </div>
        </div>
    );
};

export default Footer;
