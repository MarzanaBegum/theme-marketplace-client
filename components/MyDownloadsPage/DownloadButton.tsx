import React from "react";

function DownloadButton() {
    return (
        <div>
            <button className="p-[10px] lg:p-[12px] hover:bg-brand-dark transition-all duration-200 bg-brand rounded-md ">
                <img src="/icons/download.svg" alt="" />
            </button>
        </div>
    );
}

export default DownloadButton;
