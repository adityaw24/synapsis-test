"use client";
import React, { useState } from "react";
import FullDataTable from "~/component/table/FullDataTable";
import { Button, Card, LoadingDots, PageTitle } from "~/component/ui";
import _column from "./_column";
import errorHandler from "~/libs/errorHandler";
import { confirmDeletePopup } from "~/libs/popup";
import { Plus } from "lucide-react";
import { useModal } from "~/hooks/useModal";
import ModalForm from "./ModalForm";
import { postGetRequest } from "~/service/post-service";
import { useRouter } from "next/navigation";

const PostPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(null);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [dataPost, setDataPost] = useState(null);

    const router = useRouter();

    const { modal, closeModal, openModal } = useModal({
        children: (
            <ModalForm
                dataPost={dataPost}
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
            const res = await postGetRequest({
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

    const handleGoDetail = (row) => () => {
        router.push(`/post/${row?.user_id}/${row?.id}`);
    };

    const tableColumns = _column({ handleGoDetail });

    return (
        <>
            {/* <PageTitle title="User List" /> */}
            {modal}
            <Card>
                <Card.Header>
                    <Card.Title title="Post Table" />
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
                    placeholderSearch="Search title"
                    refreshTrigger={toggleRefresh}
                />
            </Card>
        </>
    );
};

export default PostPage;
