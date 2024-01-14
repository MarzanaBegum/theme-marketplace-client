/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: "#7266FC",
                neutral: "#252C48",
                "neutral-muted": "#3B415A",
                "neutral-shade": "#3B415A",
                "surface-muted": "#EFF3FB",
                surface: "#FFFFFF",
                error: "#FF000D",
                success: "#13CE66",
                "brand-dark": "#473EAE",
            },
        },
        screens: {
            xs: "375px",
            sm: "680px",
            md: "768px",
            lg: "1024px",
            xl: "1200px",
            "2xl": "1680px",
            "3xl": "1920px",
            "max-xs": { max: "374px" },
            "max-sm": { max: "679px" },
            "max-md": { max: "767px" },
            "max-lg": { max: "1023px" },
            "max-xl": { max: "1199px" },
            "max-2xl": { max: "1439px" },
            "max-3xl": { max: "1679px" },
            "max-4xl": { max: "1919px" },
        },
        container: {
            center: true,
            padding: {
                xs: "20px",
                sm: "40px",
                md: "50px",
                lg: "47px",
                xl: "60px",
                "2xl": "120px",
                "3xl": "180px",
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities(
                {
                    ".scrollbar-hide": {
                        "-ms-overflow-style": "none",
                        "scrollbar-width": "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    },

                    ".scrollbar-default": {
                        "-ms-overflow-style": "auto",
                        "scrollbar-width": "auto",
                        "&::-webkit-scrollbar": {
                            display: "block",
                        },
                    },
                },
                ["responsive"]
            );
        },
        function ({ addVariant }) {
            addVariant("nav-active", [".nav-active &", ".nav-active&"]);
        },

        function ({ addUtilities }) {
            addUtilities(
                {
                    ".transit": {
                        "transition-property": "all",
                        "transition-timing-function":
                            "cubic-bezier(0.4, 0, 0.2, 1)",
                        " transition-duration": "200ms",
                    },
                },
                ["responsive"]
            );
        },
        require("@tailwindcss/line-clamp"),
    ],
};
