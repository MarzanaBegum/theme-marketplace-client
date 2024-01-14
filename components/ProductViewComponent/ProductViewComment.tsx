import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Pagination from "../Shared/Pagination";
import moment from "moment";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import { api } from "./../../api/index";
import { toast } from "react-toastify";
import LoadingAnimation from "../LoadingAnimation";

type CommentFields = {
    comment: string;
};

function ProductViewComment({ data, refetch }: any) {
    const router = useRouter();
    const [user] = useAtom(USER_STATE);
    const path = router.asPath;
    const productId = path.split("/")[2];
    const {
        register,
        reset,
        handleSubmit,
        formState: { isDirty, isValid },
    } = useForm<CommentFields>();

    const [loading, setLoading] = useState(false);

    const writeComment: SubmitHandler<CommentFields> = async (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const postData = {
                userId: user?._id,
                text: data?.comment,
            };
            await api.post(`/products/${productId}/comment`, postData);
            refetch();
            reset();
            setLoading(false);
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
        }
    };

    const reverseComments = data?.comments?.sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? -1 : 1
    );

    if (!user) return <></>;

    return (
        <>
            <div
                id="comments"
                className="p-[20px_10px] sm:p-[20px] bg-white rounded-md"
            >
                {user && (
                    <div>
                        <form onSubmit={handleSubmit(writeComment)}>
                            <div>
                                <textarea
                                    {...register("comment", { required: true })}
                                    className="text-sm leading-[1.5] p-4 border rounded-md h-[120px] focus:outline-none border-[#C8CBD0] w-full text-[#A0A4AB]"
                                    placeholder="Leave a comment, be nice"
                                ></textarea>
                            </div>
                            <div className="pt-4"></div>
                            <div>
                                <button
                                    disabled={!isDirty || !isValid}
                                    className={`h-[48px] disabled:opacity-70 cursor-pointer text-sm font-semibold text-white bg-brand  w-full rounded-md ${
                                        !(!isDirty || !isValid) &&
                                        "hover:bg-brand-dark"
                                    }  transition-all duration-200 `}
                                >
                                    {loading ? (
                                        <LoadingAnimation color="#fff" />
                                    ) : (
                                        "Post a comment"
                                    )}
                                </button>
                            </div>
                            <div className="pt-5"></div>
                        </form>
                    </div>
                )}

                <div>
                    <div className="text-lg leading-[1.5] text-neutral font-medium sm:text-2xl ">
                        {data?.comments?.length} Comments for this product
                    </div>
                </div>
                <div className="pt-5"></div>
                <div>
                    <Pagination className="pt-5" dataArr={reverseComments}>
                        {(data) => {
                            return (
                                <div>
                                    {data.map((v, i) => (
                                        <div
                                            key={i}
                                            className="border-b py-4  border-[#252C4826]"
                                        >
                                            <CommentItem comment={v} />
                                            {/* <div className="pt-4"></div> */}
                                            {/* <CommentItem isReply /> */}
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    </Pagination>
                </div>
            </div>
        </>
    );
}

const CommentItem = ({
    isReply,
    comment,
}: {
    isReply?: boolean;
    comment?: any;
}) => {
    return (
        <div
            style={{ paddingLeft: isReply ? "60px" : 0 }}
            className="leading-[1.5] flex gap-[10px]"
        >
            <img
                className="w-[50px] h-[50px] object-cover rounded-full"
                src={
                    comment?.userId?.profile
                        ? comment?.userId?.profile
                        : "/img/profile.png"
                }
                alt=""
            />
            <div className="w-[calc(100%-60px)]">
                <div className="text-lg w font-medium sm:text-xl text-neutral">
                    {`${comment?.userId?.firstName} ${comment?.userId?.lastName}`}
                    <span className="ml-3 text-xs font-normal text-neutral-muted">
                        {moment(comment?.createdAt).fromNow()}
                    </span>
                </div>
                <div className="text-sm text-neutral">{comment?.text}</div>
            </div>
        </div>
    );
};

export default ProductViewComment;
