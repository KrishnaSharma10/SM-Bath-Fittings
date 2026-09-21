import React, { useEffect, useRef, useState } from "react";
import {
    getCategories,
    listCollections,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    errorMessage,
} from "../../api/AdminApi";
import {
    Notice,
    Field,
    ConfirmDialog,
    ChevronDown,
    inputClass,
    primaryButtonClass,
    secondaryButtonClass,
    dangerButtonClass,
} from "./AdminUI";

const MAX_MB = 5;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const FIELD_IDS = {
    categoryRef: "category",
    collectionRef: "collection",
    name: "name",
    catNo: "catNo",
    image: "image",
};

const fileNameFromUrl = (url) => {
    try {
        return decodeURIComponent(new URL(url).pathname.split("/").pop() || "");
    } catch {
        return "";
    }
};

/**
 * The product form card, used in two places:
 *   - no productId  -> "Add a product"
 *   - productId     -> "Edit a product" (pre-filled, with a Delete button)
 *
 * onCancel()       Cancel button, or "go back" when the product cannot be loaded
 * onSaved()        called after a successful add or save (the list can refresh)
 * onDeleted(info)  called after a delete, with { name }
 */
const ProductEditor = ({ productId, onCancel, onSaved, onDeleted }) => {
    const isEdit = Boolean(productId);

    const [categories, setCategories] = useState([]);
    const [categoriesError, setCategoriesError] = useState("");

    const [collections, setCollections] = useState([]);
    const [collectionsLoading, setCollectionsLoading] = useState(false);
    const [collectionsError, setCollectionsError] = useState("");

    const [loading, setLoading] = useState(isEdit);
    const [loadError, setLoadError] = useState("");

    const [savedName, setSavedName] = useState(""); // the name as stored (shown as the card title)
    const [categoryRef, setCategoryRef] = useState("");
    const [collectionRef, setCollectionRef] = useState("");
    const [name, setName] = useState("");
    const [catNo, setCatNo] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null); // a newly chosen image
    const [existingImage, setExistingImage] = useState(""); // the saved image
    const [preview, setPreview] = useState("");

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(""); // "" | "uploading" | "saving"
    const [notice, setNotice] = useState(null); // { type, text }

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const fileInputRef = useRef(null);
    const cardRef = useRef(null);

    /* Categories: one shared request */
    useEffect(() => {
        let cancelled = false;
        getCategories()
            .then((data) => !cancelled && setCategories(data))
            .catch((err) => !cancelled && setCategoriesError(errorMessage(err)));
        return () => {
            cancelled = true;
        };
    }, []);

    /* Load the product whenever another one is chosen */
    useEffect(() => {
        setErrors({});
        setNotice(null);
        setFile(null);
        setConfirmOpen(false);
        setDeleteError("");
        if (fileInputRef.current) fileInputRef.current.value = "";

        if (!productId) {
            setLoading(false);
            setLoadError("");
            setCategoryRef("");
            setCollectionRef("");
            setName("");
            setCatNo("");
            setDescription("");
            setExistingImage("");
            setSavedName("");
            return;
        }

        let cancelled = false;
        setLoading(true);
        setLoadError("");

        getProduct(productId)
            .then((p) => {
                if (cancelled) return;
                setCategoryRef(p.categoryRef?._id || p.categoryRef || "");
                setCollectionRef(p.collectionRef?._id || p.collectionRef || "");
                setName(p.name || "");
                setCatNo(p.catNo || "");
                setDescription(p.description || "");
                setExistingImage(p.image || "");
                setSavedName(p.name || "");
            })
            .catch((err) => {
                if (cancelled) return;
                setLoadError(err.response?.status === 404 ? "That product no longer exists." : errorMessage(err));
            })
            .finally(() => !cancelled && setLoading(false));

        return () => {
            cancelled = true;
        };
    }, [productId]);

    /* Collections depend on the chosen category. Refetch whenever it changes, and drop the
       selected collection if it no longer belongs to the list that comes back. */
    useEffect(() => {
        setCollectionsError("");

        if (!categoryRef) {
            setCollections([]);
            setCollectionRef("");
            return;
        }

        let cancelled = false;
        setCollectionsLoading(true);

        listCollections({ category: categoryRef })
            .then((data) => {
                if (cancelled) return;
                setCollections(data);
                setCollectionRef((prev) => (data.some((c) => c._id === prev) ? prev : ""));
            })
            .catch((err) => !cancelled && setCollectionsError(errorMessage(err)))
            .finally(() => !cancelled && setCollectionsLoading(false));

        return () => {
            cancelled = true;
        };
    }, [categoryRef]);

    /* Local preview of a newly chosen image */
    useEffect(() => {
        if (!file) {
            setPreview("");
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const shownImage = preview || existingImage;
    const busy = saving !== "" || deleting;
    const collectionsDisabled = !categoryRef || collectionsLoading;

    const clearError = (key) => setErrors((prev) => ({ ...prev, [key]: undefined }));
    const showCard = () => cardRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });

    const handleFile = (e) => {
        const chosen = e.target.files?.[0];
        clearError("image");

        if (!chosen) {
            setFile(null);
            return;
        }
        if (!IMAGE_TYPES.includes(chosen.type)) {
            e.target.value = "";
            setFile(null);
            setErrors((prev) => ({ ...prev, image: "Please choose a JPG, PNG or WebP image." }));
            return;
        }
        if (chosen.size > MAX_MB * 1024 * 1024) {
            e.target.value = "";
            setFile(null);
            setErrors((prev) => ({ ...prev, image: `That image is too large. The limit is ${MAX_MB} MB.` }));
            return;
        }
        setFile(chosen);
    };

    const validate = () => {
        const found = {};
        if (!categoryRef) found.categoryRef = "Please choose a category.";
        if (!collectionRef) found.collectionRef = "Please choose a collection.";
        if (!name.trim()) found.name = "Enter a product name.";
        if (!catNo.trim()) found.catNo = "Enter a catalogue number.";
        if (!file && !existingImage) found.image = "Please choose an image.";
        return found;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (busy) return;

        setNotice(null);
        const found = validate();
        setErrors(found);

        const firstInvalid = Object.keys(found)[0];
        if (firstInvalid) {
            document.getElementById(FIELD_IDS[firstInvalid])?.focus();
            return;
        }

        try {
            let image = existingImage;
            if (file) {
                setSaving("uploading");
                image = await uploadImage(file);
            }

            setSaving("saving");
            const payload = {
                categoryRef,
                collectionRef,
                name: name.trim(),
                catNo: catNo.trim(),
                description: description.trim(),
                image,
            };

            if (isEdit) {
                await updateProduct(productId, payload);
                setExistingImage(image);
                setSavedName(payload.name);
                setFile(null);
                setNotice({ type: "success", text: "Your changes were saved." });
            } else {
                await createProduct(payload);
                setNotice({ type: "success", text: `"${payload.name}" was added to the catalogue.` });
                // Ready for the next one. The category and collection stay selected.
                setName("");
                setCatNo("");
                setDescription("");
                setFile(null);
                setExistingImage("");
            }
            if (fileInputRef.current) fileInputRef.current.value = "";
            onSaved?.();
        } catch (err) {
            setNotice({ type: "error", text: errorMessage(err) });
        } finally {
            setSaving("");
            showCard();
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        setDeleteError("");
        try {
            await deleteProduct(productId);
            setConfirmOpen(false);
            onDeleted?.({ name: savedName });
        } catch (err) {
            setDeleteError(errorMessage(err));
        } finally {
            setDeleting(false);
        }
    };

    const saveLabel =
        saving === "uploading"
            ? "Uploading image..."
            : saving === "saving"
              ? "Saving..."
              : isEdit
                ? "Save changes"
                : "Save product";

    /* ---------- Loading and error states ---------- */
    if (loading) {
        return <div className="h-[520px] animate-pulse border border-slate-200 bg-white" aria-busy="true" />;
    }

    if (loadError) {
        return (
            <div className="space-y-4 border border-slate-200 bg-white p-6 sm:p-9">
                <Notice type="error">{loadError}</Notice>
                <button type="button" onClick={onCancel} className={secondaryButtonClass}>
                    Go back
                </button>
            </div>
        );
    }

    /* ---------- The form ---------- */
    return (
        <div ref={cardRef} className="scroll-mt-6">
            <form onSubmit={handleSubmit} noValidate className="border border-slate-200 bg-white p-6 sm:p-9">
                <h2 className="text-[26px] font-normal leading-tight tracking-[-0.03em] text-brand-ink sm:text-[30px]">
                    {isEdit ? savedName || "Product" : "Product details"}
                </h2>
                <p className="mt-2 text-[14px] text-slate-500">
                    {isEdit
                        ? "Edit the item details shown in the catalogue."
                        : "There is no price or description on this form."}
                </p>

                {(notice || categoriesError) && (
                    <div className="mt-6">
                        <Notice type={notice ? notice.type : "error"}>{notice ? notice.text : categoriesError}</Notice>
                    </div>
                )}

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Category */}
                    <Field id="category" label="Category" required error={errors.categoryRef}>
                        <div className="relative">
                            <select
                                id="category"
                                value={categoryRef}
                                onChange={(e) => {
                                    setCategoryRef(e.target.value);
                                    clearError("categoryRef");
                                    clearError("collectionRef");
                                }}
                                aria-required="true"
                                aria-invalid={Boolean(errors.categoryRef)}
                                aria-describedby={errors.categoryRef ? "category-error" : undefined}
                                className={`${inputClass(Boolean(errors.categoryRef))} cursor-pointer appearance-none pr-11`}
                            >
                                <option value="">Select category</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown />
                        </div>
                    </Field>

                    {/* Collection */}
                    <Field id="collection" label="Collection" required error={errors.collectionRef}>
                        <div className="relative">
                            <select
                                id="collection"
                                value={collectionRef}
                                onChange={(e) => {
                                    setCollectionRef(e.target.value);
                                    clearError("collectionRef");
                                }}
                                disabled={collectionsDisabled}
                                aria-required="true"
                                aria-invalid={Boolean(errors.collectionRef)}
                                aria-describedby={errors.collectionRef ? "collection-error" : undefined}
                                className={`${inputClass(Boolean(errors.collectionRef))} cursor-pointer appearance-none pr-11 disabled:cursor-not-allowed disabled:opacity-60`}
                            >
                                <option value="">
                                    {!categoryRef
                                        ? "Select category first"
                                        : collectionsLoading
                                          ? "Loading collections..."
                                          : "Select collection"}
                                </option>
                                {collections.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown />
                        </div>
                        {!collectionsError && categoryRef && !collectionsLoading && collections.length === 0 && (
                            <p className="mt-2 text-[13px] leading-[1.5] text-slate-500">
                                No collections in this category yet.
                            </p>
                        )}
                        {collectionsError && (
                            <p className="mt-2 text-[13px] font-medium text-brand-red">{collectionsError}</p>
                        )}
                    </Field>

                    {/* Name */}
                    <Field id="name" label="Product name" required error={errors.name}>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                clearError("name");
                            }}
                            placeholder="e.g. Long Body"
                            autoComplete="off"
                            aria-required="true"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={inputClass(Boolean(errors.name))}
                        />
                    </Field>

                    {/* Catalogue number */}
                    <Field id="catNo" label="Catalogue number" required error={errors.catNo}>
                        <input
                            id="catNo"
                            type="text"
                            value={catNo}
                            onChange={(e) => {
                                setCatNo(e.target.value);
                                clearError("catNo");
                            }}
                            placeholder="e.g. LB-104"
                            autoComplete="off"
                            aria-required="true"
                            aria-invalid={Boolean(errors.catNo)}
                            aria-describedby={errors.catNo ? "catNo-error" : undefined}
                            className={`${inputClass(Boolean(errors.catNo))} font-mono`}
                        />
                    </Field>

                    {/* Description */}
                    <Field id="description" label="Short description" className="sm:col-span-2">
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional: a line or two about this item."
                            className={`${inputClass(false)} resize-y`}
                        />
                    </Field>

                    {/* Image */}
                    <Field
                        id="image"
                        label="Product image"
                        required={!isEdit}
                        error={errors.image}
                        className="sm:col-span-2"
                    >
                        <div
                            className={`flex flex-col gap-4 border border-dashed bg-slate-50/70 p-3.5 sm:flex-row sm:items-center ${
                                errors.image ? "border-brand-red" : "border-slate-300"
                            }`}
                        >
                            <div className="flex h-[97px] w-[120px] shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white">
                                {shownImage ? (
                                    <img
                                        src={shownImage}
                                        alt="Preview of the product image"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-slate-400">
                                        No image
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <input
                                    id="image"
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleFile}
                                    aria-required={!isEdit && !existingImage}
                                    aria-invalid={Boolean(errors.image)}
                                    aria-describedby={errors.image ? "image-error" : undefined}
                                    className="block w-full text-[13px] text-slate-600 file:mr-3 file:cursor-pointer file:rounded-[3px] file:border file:border-slate-300 file:bg-white file:px-3.5 file:py-2 file:text-[13px] file:font-semibold file:text-brand-blue file:transition-colors hover:file:border-brand-blue hover:file:bg-brand-sky"
                                />
                                <p className="mt-2 break-all text-[13px] leading-[1.5] text-slate-500">
                                    {file
                                        ? `New image: ${file.name}. It replaces the current one when you save.`
                                        : isEdit && existingImage
                                          ? `Current image: ${fileNameFromUrl(existingImage) || "saved image"}`
                                          : `The product name is usually printed on the image. JPG, PNG or WebP, up to ${MAX_MB} MB.`}
                                </p>
                            </div>
                        </div>
                    </Field>
                </div>

                {/* Buttons */}
                <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
                    <button type="submit" disabled={busy} className={primaryButtonClass}>
                        {saveLabel}
                    </button>
                    <button type="button" onClick={onCancel} disabled={busy} className={secondaryButtonClass}>
                        Cancel
                    </button>
                    {isEdit && (
                        <button
                            type="button"
                            onClick={() => {
                                setDeleteError("");
                                setConfirmOpen(true);
                            }}
                            disabled={busy}
                            className={dangerButtonClass}
                        >
                            Delete product
                        </button>
                    )}
                </div>
            </form>

            <ConfirmDialog
                open={confirmOpen}
                title={`Delete "${savedName}"?`}
                busy={deleting}
                error={deleteError}
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            >
                This product will be permanently removed from the catalogue. This cannot be undone.
            </ConfirmDialog>
        </div>
    );
};

export default ProductEditor;