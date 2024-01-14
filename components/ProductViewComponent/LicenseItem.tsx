import { Tooltip } from "react-tooltip";
import InfoIcon from "../SvgCustomIcons/InfoIcon";

type LicenseItemType = {
    name: string;
    desc: string;
    price: number | string;
    active: boolean;
    onClick: () => any;
};

function LicenseItem({ desc, name, price, active, onClick }: LicenseItemType) {
    return (
        <div>
            <label
                htmlFor={name}
                id="product-input-radio"
                style={{
                    background: active ? "rgba(114,102,252,0.06)" : "none",
                }}
                className="p-[8px_10px] group cursor-pointer flex hover:!bg-[rgba(114,102,252,0.06)] justify-between items-start"
            >
                <div className="flex items-start gap-2">
                    <input
                        className="w-[18px] accent-brand h-[18px] mt-[3px] sm:mt-[5px]"
                        id={name}
                        name="license"
                        type="radio"
                        checked={active}
                        onClick={onClick}
                        onChange={() => {}}
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm leading-[18px]  font-medium text-neutral tracking-[.15%] sm:text-base sm:leading-[1.5]">
                                {name}
                            </div>
                            <a id={"license_info" + name.split("")[0]}>
                                <InfoIcon />
                            </a>
                            <Tooltip
                                content={LicenseText(name)}
                                anchorId={"license_info" + name.split("")[0]}
                                place="bottom"
                                className="max-w-[400px] text-xs"
                            />
                        </div>
                        <div className="pt-[5px]"></div>
                        <div className="text-xs leading-[18px]">{desc}</div>
                    </div>
                </div>
                <div className="text-sm  leading-[18px] font-medium text-neutral-muted sm:text-base sm:leading-[1.5]">
                    {price != 0 ? `$${price}` : "FREE"}
                </div>
            </label>
        </div>
    );
}

function LicenseText(params: string) {
    if (params == "Personal license")
        return "This license can be used only for one personal website. With this license, you can't resell or redistribute the template or the end product based on it";
    if (params == "Commercial license")
        return "With this license, you and your clients can create up to five different websites. The license allows you to transfer or resell the end products (websites based on this template)";
    if (params == "Buyout license")
        return "This license can be used only for one personal website. With this license, you can't resell or redistribute the template or the end product based on it";
}

export default LicenseItem;
