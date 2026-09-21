import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, PageHeader } from "../../components/admin/AdminUI";
import CollectionEditor from "../../components/admin/CollectionEditor";

/** /admin/collections/new */
const CollectionForm = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Breadcrumb items={[{ label: "Admin", to: "/admin" }, { label: "Add a collection" }]} />

            <PageHeader
                eyebrow="New catalogue entry"
                title="Add a collection."
                text="Create a clear home for a new family of products."
            />

            <div className="mt-8">
                <CollectionEditor onCancel={() => navigate("/admin")} />
            </div>
        </div>
    );
};

export default CollectionForm;