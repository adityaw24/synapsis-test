"use client";
import React, { useState } from "react";
import FullDataTable from "~/component/table/FullDataTable";
import { Button, Card, LoadingDots, PageTitle } from "~/component/ui";
import _column from "./_column";
import { userDeleteRequest, userGetRequest } from "~/service/user-service";
import errorHandler from "~/libs/errorHandler";
import { confirmDeletePopup } from "~/libs/popup";
import { Plus } from "lucide-react";
import { useModal } from "~/hooks/useModal";
import ModalForm from "./ModalForm";

const UserPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(null);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [dataUser, setDataUser] = useState(null);

    const { modal, closeModal, openModal } = useModal({
        children: (
            <ModalForm
                dataUser={dataUser}
                onClose={() => closeModal()}
                triggerRefresh={() => setToggleRefresh(!toggleRefresh)}
            />
        ),
    });

    const getTableData = async ({
        pageSize,
        searchValue,
        pageSkip,
        pageIndex,
    }) => {
        try {
            setIsLoading(true);
            const res = await userGetRequest({
                page: pageIndex + 1,
                per_page: pageSize,
                search: searchValue || "",
            });
            // console.log(res);

            setTableData(res.data);
            setTotalData(res.headers["x-pagination-total"]);
            setTotalPage(res.headers["x-pagination-pages"]);
        } catch (err) {
            errorHandler(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (rowId) => () => {
        confirmDeletePopup({
            onConfirm: () => userDeleteRequest(rowId),
            onSuccess: () => setToggleRefresh(!toggleRefresh),
        });
    };

    const handleUpdate = (row) => () => {
        setDataUser(row);
        openModal();
    };

    const tableColumns = _column({ handleDelete, handleUpdate });

    return (
        <>
            {/* <PageTitle title="User List" /> */}
            {modal}
            <Card>
                <Card.Header>
                    <Card.Title title="User Table" />
                    <LoadingDots label="Please wait..." isLoading={isLoading} />
                    <Button
                        title="Create New"
                        Icon={Plus}
                        onClick={() => openModal()}
                        className="btn-primary"
                    />
                </Card.Header>
                <FullDataTable
                    data={tableData}
                    columns={tableColumns}
                    getTableData={getTableData}
                    totalData={totalData}
                    isLoading={isLoading}
                    totalPage={totalPage}
                    placeholderSearch="Search name"
                    refreshTrigger={toggleRefresh}
                />
            </Card>
        </>
    );
};

export default UserPage;
