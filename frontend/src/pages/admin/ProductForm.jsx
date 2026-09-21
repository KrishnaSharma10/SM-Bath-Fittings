import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, PageHeader } from "../../components/admin/AdminUI";
import ProductEditor from "../../components/admin/ProductEditor";

/** /admin/products/new */
const ProductForm = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Breadcrumb items={[{ label: "Admin", to: "/admin" }, { label: "Add a product" }]} />

            <PageHeader
                eyebrow="New catalogue entry"
                title="Add a product."
                text="Add the product code and image customers will use to identify the item."
            />

            <div className="mt-8">
                <ProductEditor onCancel={() => navigate("/admin")} />
            </div>
        </div>
    );
};

export default ProductForm;