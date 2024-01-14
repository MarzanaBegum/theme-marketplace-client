import { useQuery } from "react-query";
import { api } from "../api";
import ThemesIcon from "../components/SvgCustomIcons/ThemesIcon";
import CodeIcon from "../components/SvgCustomIcons/CodeIcon";
import {
    FreeImgIcon,
    Icons,
    IllustrateIcon,
} from "../components/SvgCustomIcons";

type HeaderCategories = {
    _id: string;
    length: number;
};

const useHeaderCategories = () => {
    return useQuery<any[]>(["fetch-header-categories"], {
        queryFn: async () => {
            const { data } = await api.get("/products/fetch/header");
            return data;
        },
        select: (data) => {
            return getDropdownData(data);
        },
        refetchOnWindowFocus: false,
    });
};

function getDropdownData(data: HeaderCategories[]) {
    const dropdownData = [];

    const theme = data.find((v) => v._id === "theme");
    if (theme)
        dropdownData.push({
            id: 1,
            title: "Themes",
            Icon: ThemesIcon,
            url: "product?type=theme",
            totalNumber: theme.length,
        });

    const template = data.find((v) => v._id === "template");
    if (template)
        dropdownData.push({
            id: 2,
            title: "Coded Templates",
            Icon: CodeIcon,
            url: "product?type=template",
            totalNumber: template.length,
        });
    const icon = data.find((v) => v._id === "icon");
    if (icon)
        dropdownData.push({
            id: 3,
            title: "Icons",
            Icon: Icons,
            url: "product?type=icon",
            totalNumber: icon.length,
        });
    const illustration = data.find((v) => v._id === "illustration");
    if (illustration)
        dropdownData.push({
            id: 4,
            title: "Illustrations",
            Icon: IllustrateIcon,
            url: "product?type=illustration",
            totalNumber: illustration.length,
        });
    const image = data.find((v) => v._id === "image");
    if (image)
        dropdownData.push({
            id: 5,
            title: "Images",
            Icon: FreeImgIcon,
            url: "product?type=image",
            totalNumber: image.length,
        });

    return dropdownData;
}

export default useHeaderCategories;
