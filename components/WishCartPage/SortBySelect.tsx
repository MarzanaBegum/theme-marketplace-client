import React from "react";
import Select, { StylesConfig } from "react-select";

function SortBySelect({ options, onChange, placeholder, defaultValue }: any) {
    const styles: StylesConfig = {
        multiValue: (styles: any) => {
            return {
                ...styles,
                backgroundColor: "#E51937",
                color: "#fff",
            };
        },
        multiValueLabel: (styles) => ({
            ...styles,
            color: "#fff",
        }),

        input: (styles) => ({
            ...styles,

            padding: 0,
            margin: 0,
            fontSize: 14,
            ":focus": {
                outline: "none",
            },
        }),
        placeholder: (styles) => ({ ...styles, fontSize: 14 }),
        control: (styles) => ({
            ...styles,
            boxShadow: "none",
            background: "none",
            border: "1px solid #ccc",
            minHeight: 48,
            ":focus": {
                borderColor: "#ccc",
            },
            ":hover": {
                borderColor: "#ccc",
            },
        }),
        clearIndicator: (styles) => ({
            ...styles,
            display: "none",
        }),

        option: (styles, state) => {
            return {
                ...styles,
                ":hover": state.isSelected
                    ? {}
                    : {
                          background: "#7266FC",
                          color: "white",
                          fontWeight: 600,
                      },
                backgroundColor: state.isSelected ? "#E3E0FE" : "transparent",
                fontSize: 14,
                borderRadius: 4,
                fontWeight: state.isSelected ? 700 : 400,
                color: state.isSelected ? "#7266FC" : "#3B415A",
            };
        },
        valueContainer: (styles) => ({
            ...styles,
            paddingTop: 5,
            paddingBottom: 5,

            paddingLeft: 16,
        }),
        menu: (styles) => ({
            ...styles,
            paddingTop: 8,
            paddingBottom: 8,

            paddingLeft: 10,
            paddingRight: 10,
        }),
        indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
        container: (styles) => ({
            ...styles,

            ":focus": { outline: "none" },
        }),
    };
    return (
        <Select
            className="basis-1/2 sm:max-w-[220px]"
            placeholder={placeholder ? placeholder : "Sort by"}
            options={options}
            onChange={onChange}
            defaultValue={defaultValue}
            styles={styles}
        />
    );
}

export default SortBySelect;
