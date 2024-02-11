"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
    Button,
    Card,
    ChatBubble,
    LoadingDots,
    PageTitle,
} from "~/component/ui";
import errorHandler from "~/libs/errorHandler";
import { confirmDeletePopup } from "~/libs/popup";
import { Plus, SendHorizontalIcon } from "lucide-react";
import { postGetDetailRequest } from "~/service/post-service";
import { useRouter } from "next/navigation";
import {
    commentGetDetailRequest,
    commentPostRequest,
} from "~/service/comment-service";
import Image from "next/image";
import mergeClass from "~/libs/mergeClass";
import { userGetDetailRequest } from "~/service/user-service";
import { TextInput, TextareaInput } from "~/component";
import { useForm } from "react-hook-form";

const DetailPostPage = ({ userId = "", postId = "", commentId = "" }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(null);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [dataPost, setDataPost] = useState(null);

    const [detailPost, setDetailPost] = useState(null);
    const [commentPost, setCommentPost] = useState(null);
    const [detailUser, setDetailUser] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const router = useRouter();

    const { register, setValue, getValues, reset, handleSubmit } = useForm({
        defaultValues: {
            message: "",
        },
    });

    const getDetailPost = async () => {
        try {
            setIsLoading(true);
            const resPost = await postGetDetailRequest(postId, userId, {});
            setDetailPost(resPost.data[0]);

            const resComment = await commentGetDetailRequest(
                postId,
                commentId,
                {}
            );
            setCommentPost(resComment.data);
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getDetailUser = async () => {
        try {
            const res = await userGetDetailRequest();
            setDetailUser(res);
        } catch (error) {
            errorHandler(error);
        }
    };

    const onSubmit = async () => {
        try {
            setIsSubmit(true);
            const value = getValues("message") || "";

            if (value.trim() == "") return;

            /**@type {CommentPostFormData} payload */
            const payload = {
                body: value,
                email: detailUser?.email,
                name: detailUser?.name,
            };

            await commentPostRequest(postId, payload);
            getDetailPost();
            reset();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsSubmit(false);
        }
    };

    useEffect(() => {
        getDetailUser();
        getDetailPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, postId, commentId]);

    return (
        <section className="grid h-full grid-cols-1 gap-6 lg:h-[80vh] lg:grid-cols-2 lg:flex-row">
            <Card>
                <Card.Header>
                    {/* <Card.Title title="Detail Post" /> */}
                    <Card.Title title={detailPost?.title} />
                    <LoadingDots label="Please wait..." isLoading={isLoading} />
                </Card.Header>
                <p>{detailPost?.body}</p>
            </Card>
            <Card>
                <div className="h-[80%] flex flex-col-reverse overflow-auto">
                    {commentPost?.map((comment, index) => (
                        <section key={comment.id} className="pt-4">
                            <ChatBubble
                                right={comment?.email == detailUser?.email}
                                header={comment?.name}
                                text={comment?.body}
                            />
                        </section>
                    ))}
                </div>
                <hr className="mt-1 mb-4 dark:border-gray-600" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row items-center gap-4">
                        <TextareaInput
                            {...register("message")}
                            className="flex-1"
                            inputClass="textarea-sm textarea-ghost resize-none border-0"
                            rows={1}
                            placeholder="Send a message"
                        />
                        <Button
                            className="btn-glass"
                            type="submit"
                            Icon={SendHorizontalIcon}
                        />
                    </div>
                </form>
            </Card>
        </section>
    );
};

export default DetailPostPage;
