import React from "react";
import Select from "react-select";

export default function SelectDepartment({ sendError, value, onChange }: any) {
    const options = [
        {
            value: "Buying and items support",
            label: "Buying and items support",
        },
        { value: "Licensing", label: "Licensing" },
        { value: "Account issues", label: "Account issues" },
        {
            value: "Copyright and Trademarks",
            label: "Copyright and Trademarks",
        },
        { value: "Tax and compliance", label: "Tax and compliance" },
        { value: "Others", label: "Others" },
    ];

    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            borderColor: state.isFocused
                ? "#7266FC"
                : sendError
                ? "red"
                : "#C8CBD0",
            boxShadow: "none",
            height: "50px",
            cursor: "pointer",
            borderRadius: "6px",
            ":hover": {
                borderColor: `${sendError ? "red" : "#C8CBD0"}`,
            },
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected ? "#7266FC" : "#3B415A",
            fontSize: "14px",
            fontWeight: state.isSelected ? 500 : 400,
            width: "100%",
            paddingLeft: "16px",
            cursor: "pointer",
            "&:hover": {
                color: state.isSelected ? "#3B415A" : "#7266FC",
            },
        }),
        indicatorsContainer: (provided: any) => ({
            border: "none",
        }),
    };
    return (
        <Select
            value={options.find((c) => c.value === value)}
            onChange={onChange}
            placeholder="Select category"
            options={options}
            className="text-[#A0A4AB] text-[12px] md:text-[14px] w-full mt-2"
            styles={customStyles}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: "#F1F0FF",
                    primary: "#F1F0FF",
                },
            })}
        />
    );
}
