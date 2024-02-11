import React from "react";
import { Button } from "~/component";
import mergeClass from "~/libs/mergeClass";

const _column = ({ handleDelete, handleUpdate }) => {
    const columns = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "gender", header: "Gender" },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div
                    className={mergeClass(
                        "badge",
                        row.original.status == "active"
                            ? "badge-primary"
                            : "badge-neutral"
                    )}
                >
                    {row.original.status}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            size: 190,
            cell: ({ row }) => (
                <section className="flex gap-3">
                    <Button
                        title="Edit"
                        className="btn-accent btn-xs"
                        onClick={handleUpdate(row.original)}
                        // href={"/applicant/detail/" + row.original.id}
                    />
                    <Button
                        title="Delete"
                        onClick={handleDelete(row.original.id)}
                        className="btn-error btn-xs"
                    />
                </section>
            ),
        },
    ];

    return columns;
};

export default _column;
