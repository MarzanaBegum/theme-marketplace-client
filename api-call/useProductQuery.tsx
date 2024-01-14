import { UseQueryOptions } from "react-query";
import { api } from "../api";
import {
    CodeIcon,
    FreeImgIcon,
    Icons,
    IllustrateIcon,
    ThemesIcon,
} from "../components/SvgCustomIcons";
import { decryptData } from "../utils/hashdata";
import { getCookie } from "cookies-next";

const useProductQuery: (v?: any) => UseQueryOptions<any, any, any, any> = (
    filterData
) => ({
    queryFn: async () => {
        const { data } = await api.get("/products");
        let filterData = data ? data.filter((v: any) => v.isVisible) : [];
        const userId = decryptData(`${getCookie("auth")}`);
        filterData = filterData
            ? filterData.filter((v: any) =>
                  v?.buyout ? (v?.buyout === userId?.id ? true : false) : true
              )
            : [];

        return filterData;
    },
    select(data) {
        return getData(data);
    },
});

export default useProductQuery;

const getData = (data: any) => {
    const totalTheme = data.filter((item: any) => item.type === "theme");
    const totalTemplate = data.filter((item: any) => item.type === "template");
    const totalIcon = data.filter((item: any) => item.type === "icon");
    const totalIllustration = data.filter(
        (item: any) => item.type === "illustration"
    );
    const totalImage = data.filter((item: any) => item.type === "image");

    const dropdownData = [
        {
            id: 1,
            title: "Themes",
            Icon: ThemesIcon,
            url: "product?type=theme",
            totalNumber: totalTheme && totalTheme?.length,
        },
        {
            id: 2,
            title: "Codded Tempates",
            Icon: CodeIcon,
            url: "product?type=template",
            totalNumber: totalTemplate && totalTemplate?.length,
        },
        {
            id: 3,
            title: "Icons",
            Icon: Icons,
            url: "product?type=icon",
            totalNumber: totalIcon && totalIcon?.length,
        },
        {
            id: 4,
            title: "Illustrations",
            Icon: IllustrateIcon,
            url: "product?type=illustration",
            totalNumber: totalIllustration && totalIllustration?.length,
        },
        {
            id: 5,
            title: "Images",
            Icon: FreeImgIcon,
            url: "product?type=image",
            totalNumber: totalImage && totalImage?.length,
        },
    ];
    return dropdownData;
};
