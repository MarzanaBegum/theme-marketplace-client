import React from "react";

function RatingStar({
    className,
    rating,
    height,
    width,
}: {
    className?: string;
    rating: number;
    height?: number | string;
    width?: number | string;
}) {
    return (
        <div className={"flex items-center gap-[5px] " + className}>
            {rating >= 0 &&
                [...Array(Math.floor(rating))].map((v, i) => (
                    <img
                        height={height}
                        width={width}
                        key={i}
                        src="/icons/star.svg"
                        alt="star"
                    />
                ))}

            {rating >= 0 &&
                [...Array(5 - Math.floor(rating))].map((v, i) => (
                    <img
                        height={height}
                        width={width}
                        key={i}
                        src="/icons/white-star.svg"
                        alt="star"
                    />
                ))}
        </div>
    );
}

RatingStar.defaultProps = {
    rating: 4.5,
};

export default RatingStar;
