"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Modal, { ModalBody } from "~/component/ui/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextInput, TextareaInput } from "~/component";
import errorHandler from "~/libs/errorHandler";
import { postCreateRequest } from "~/service/post-service";

// /**@param {Post} dataPost */
const ModalForm = ({
    onClose = () => {},
    dataPost = null,
    triggerRefresh = () => {},
}) => {
    const [isSubmit, setIsSubmit] = useState(false);

    const {
        register,
        formState: { errors, isSubmitting },
        reset,
        handleSubmit,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            title: dataPost?.title || "",
            body: dataPost?.body || "",
        },
        resolver: yupResolver(
            yup.object().shape({
                title: yup.string().required("Title is required"),
                body: yup.string().required("Body is required"),
            })
        ),
        reValidateMode: "onChange",
    });

    // useEffect(() => {
    //     setValue("title", dataPost?.title || "");
    //     setValue("body", dataPost?.body || "");
    // }, [dataPost]);

    const getDefaultValueSelect = (option, value) => {
        option.find((opt) => opt.value === value);
    };

    const onSubmit = async () => {
        try {
            setIsSubmit(true);

            /**@type {PostFormData} payload */
            const payload = {
                title: getValues("title"),
                body: getValues("body"),
            };

            // if (dataPost) {
            //     await updateRequest(dataPost?.id, payload);
            // } else {
            // }
            await postCreateRequest(payload);

            triggerRefresh();

            reset();
            onClose();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    {...register("title")}
                    label="Title"
                    placeholder="Enter title"
                    error={errors.title?.message}
                />
                <TextareaInput
                    {...register("body")}
                    label="Body"
                    placeholder="Enter body"
                    error={errors.body?.message}
                />
                <div className="flex flex-row items-center justify-end gap-6">
                    <Button
                        title="Cancel"
                        type="button"
                        className="mt-4 btn-neutral"
                        onClick={onClose}
                    />
                    <Button
                        title="Submit"
                        className="mt-4 btn-primary"
                        loading={isSubmit}
                    />
                </div>
            </form>
        </ModalBody>
    );
};

export default ModalForm;
