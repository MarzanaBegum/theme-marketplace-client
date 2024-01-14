import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../api";
import { USER_STATE } from "../../state";
import CustomModal from "../Shared/CustomModal/CustomModal";
import InputRating from "../Shared/InputRating";
import RatingStar from "../Shared/RatingStar";
import LoadingAnimation from "../LoadingAnimation";

function ReviewItemModal({
    modalOpen,
    handleModal,
    rating,
    setRating,
    data,
    refetch,
}: {
    modalOpen: boolean;
    handleModal: () => any;
    rating?: any;
    setRating?: any;
    data?: any;
    refetch: any;
}) {
    const [user] = useAtom(USER_STATE);

    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (loading) return;
        setLoading(true);
        setError("");
        try {
            if (!comment) throw new Error("Please write atleast something");
            const updateData = {
                user: user?._id,
                text: comment,
                rating: rating,
            };

            await api.post(`/ratings/${data._id}`, updateData);
            toast.success("Review submit successfully");
            refetch();
            setLoading(false);
            handleModal();
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            setError(errMessage);
            setLoading(false);
        }
    };

    return (
        <CustomModal isOpen={modalOpen} onRequestClose={handleModal}>
            <div className="p-4 bg-white w-[calc(100vw-20px)] max-w-[335px] rounded-md">
                <div className="text-2xl leading-[36px] text-neutral font-medium">
                    Review this Item
                </div>
                <div className="pt-4"></div>
                <div className="text-lg leading-[27px] text-neutral-muted">
                    Product Name - {data?.title}
                </div>
                <div className="pt-4"></div>
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium leading-[18px] text-neutral">
                        Your Rating
                    </div>

                    {/* <RatingStar
                        rating={rate}
                        className="gap-2 [&>img]:w-[24px] [&>img]:h-[24px]"
                    /> */}
                    <InputRating
                        onChange={(v) => setRating(v)}
                        value={rating}
                        className="gap-2 [&>img]:w-[24px] [&>img]:h-[24px]"
                    />
                </div>
                <div className="pt-6"></div>
                <div className="text-lg leading-[27px] font-medium text-neutral">
                    Comments
                </div>
                <div className="pt-4"></div>
                <div>
                    <textarea
                        onChange={(e: any) => setComment(e.target.value)}
                        value={comment}
                        maxLength={200}
                        placeholder="Type your comment..."
                        className="w-full resize-none border h-[77px] text-sm text-neutral placeholder:text-[#9AA5B5] border-[#9AA5B5] focus:outline-none rounded-md p-[15px]"
                    ></textarea>
                </div>
                <div className="text-right text-xs">{comment.length} / 200</div>
                <div className="pt-2"></div>
                <div className="text-xs leading-[1.5] text-neutral-muted">
                    Your review will be publicly visible and the author may
                    reply to your comments.
                </div>
                <div className="pt-3"></div>

                {error && (
                    <p className="text-sm first-letter:capitalize text-error">
                        {error}
                    </p>
                )}
                <div className="pt-3"></div>
                <div className="flex gap-5 h-[48px]">
                    <button
                        onClick={() => {
                            setComment(""), handleModal();
                        }}
                        className="w-full h-full rounded-md border border-brand text-xs font-medium leading-[1.5] text-center text-brand transition-all duration-200 hover:text-white hover:bg-brand"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-full h-full rounded-md border border-brand text-xs font-medium leading-[1.5] text-center text-white bg-brand hover:bg-brand-dark transition-all duration-200 "
                    >
                        {loading ? <LoadingAnimation color="#fff" /> : "Submit"}
                    </button>
                </div>
            </div>
        </CustomModal>
    );
}

export default ReviewItemModal;
