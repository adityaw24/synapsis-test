import { Str } from "@supercharge/strings";
import React from "react";
import { Button } from "~/component";
import mergeClass from "~/libs/mergeClass";

const _column = ({ handleGoDetail }) => {
    const columns = [
        { accessorKey: "title", header: "Title" },
        {
            accessorKey: "body",
            header: "Body",
            cell: ({ row }) => (
                <section>
                    {Str(row.original.body).trim().limit(50, "...").get()}
                </section>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            size: 190,
            cell: ({ row }) => (
                <section className="flex gap-3">
                    <Button
                        title="Detail"
                        className="btn-accent btn-xs"
                        onClick={handleGoDetail(row.original)}
                        // href={"/post/" + row.original.user_id + row.original.id}
                    />
                </section>
            ),
        },
    ];

    return columns;
};

export default _column;
