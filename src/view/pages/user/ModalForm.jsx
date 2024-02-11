"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Modal, { ModalBody } from "~/component/ui/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SelectInput, TextInput } from "~/component";
import errorHandler from "~/libs/errorHandler";
import { userCreateRequest, userUpdateRequest } from "~/service/user-service";

// /**@param {User} dataUser */
const ModalForm = ({
    onClose = () => {},
    dataUser = null,
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
            name: dataUser?.name || "",
            email: dataUser?.email || "",
            gender: dataUser?.gender || "",
            status: dataUser?.status || "",
        },
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required("Name is required"),
                email: yup
                    .string()
                    .email("Invalid Email")
                    .required("Email is required"),
                gender: yup.string().required("Gender is required"),
                status: yup.string().required("Status is required"),
            })
        ),
        reValidateMode: "onChange",
    });

    useEffect(() => {
        setValue("email", dataUser?.email || "");
        setValue("name", dataUser?.name || "");
        setValue("gender", dataUser?.gender || "");
        setValue("status", dataUser?.status || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUser]);

    const statusOption = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    const genderOption = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];

    const getDefaultValueSelect = (option, value) => {
        option.find((opt) => opt.value === value);
    };

    const onSubmit = async () => {
        try {
            setIsSubmit(true);

            /**@type {UserFormData} payload */
            const payload = {
                email: getValues("email"),
                name: getValues("name"),
                gender: getValues("gender"),
                status: getValues("status"),
            };

            if (dataUser) {
                await userUpdateRequest(dataUser?.id, payload);
            } else {
                await userCreateRequest(payload);
            }

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
                    {...register("name")}
                    label="Name"
                    placeholder="Enter name"
                    error={errors.name?.message}
                />
                <TextInput
                    {...register("email")}
                    label="Email"
                    placeholder="Enter email"
                    error={errors.email?.message}
                />
                <SelectInput
                    {...register("gender")}
                    label="Gender"
                    error={errors.gender?.message}
                    placeholder="Select gender"
                    options={genderOption}
                    onChange={(e) => {
                        const { value } = e.target;
                        setValue("gender", value);
                    }}
                />
                <SelectInput
                    {...register("status")}
                    label="Status"
                    error={errors.status?.message}
                    placeholder="Select status"
                    // defaultValue={getDefaultValueSelect(
                    //     statusOption,
                    //     getValues("status")
                    // )}
                    options={statusOption}
                    onChange={(e) => {
                        const { value } = e.target;
                        setValue("status", value);
                    }}
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
