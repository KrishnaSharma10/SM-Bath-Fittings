import React, { useEffect, useRef, useState } from "react";
import {
    getCategories,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection,
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
const FIELD_IDS = { categoryRef: "category", name: "name", image: "image" };

const fileNameFromUrl = (url) => {
    try {
        return decodeURIComponent(new URL(url).pathname.split("/").pop() || "");
    } catch {
        return "";
    }
};

const deleteMessage = (count) => {
    if (count === 0) return "This collection has no products. It will be permanently deleted. This cannot be undone.";
    if (count === 1) return "This will also delete the 1 product inside it. This cannot be undone.";
    return `This will also delete all ${count} products inside it. This cannot be undone.`;
};

/**
 * The collection form card, used in two places:
 *   - no collectionId  -> "Add a collection"
 *   - collectionId     -> "Edit a collection" (pre-filled, with a Delete button)
 *
 * onCancel()       Cancel button, or "go back" when the collection cannot be loaded
 * onSaved()        called after a successful add or save (the list can refresh)
 * onDeleted(info)  called after a delete, with { name, deletedProducts }
 */
const CollectionEditor = ({ collectionId, onCancel, onSaved, onDeleted }) => {
    const isEdit = Boolean(collectionId);

    const [categories, setCategories] = useState([]);
    const [categoriesError, setCategoriesError] = useState("");
    const [loading, setLoading] = useState(isEdit);
    const [loadError, setLoadError] = useState("");

    const [savedName, setSavedName] = useState(""); // the name as stored (shown as the card title)
    const [productCount, setProductCount] = useState(0);
    const [categoryRef, setCategoryRef] = useState("");
    const [name, setName] = useState("");
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

    /* Load the collection whenever another one is chosen */
    useEffect(() => {
        setErrors({});
        setNotice(null);
        setFile(null);
        setConfirmOpen(false);
        setDeleteError("");
        if (fileInputRef.current) fileInputRef.current.value = "";

        if (!collectionId) {
            setLoading(false);
            setLoadError("");
            return;
        }

        let cancelled = false;
        setLoading(true);
        setLoadError("");

        getCollection(collectionId)
            .then((c) => {
                if (cancelled) return;
                setCategoryRef(c.categoryRef?._id || c.categoryRef || "");
                setName(c.name || "");
                setDescription(c.description || "");
                setExistingImage(c.image || "");
                setSavedName(c.name || "");
                setProductCount(c.productCount || 0);
            })
            .catch((err) => {
                if (cancelled) return;
                setLoadError(err.response?.status === 404 ? "That collection no longer exists." : errorMessage(err));
            })
            .finally(() => !cancelled && setLoading(false));

        return () => {
            cancelled = true;
        };
    }, [collectionId]);

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
        if (!name.trim()) found.name = "Enter a collection name.";
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
            const payload = { categoryRef, name: name.trim(), description: description.trim(), image };

            if (isEdit) {
                await updateCollection(collectionId, payload);
                setExistingImage(image);
                setSavedName(payload.name);
                setFile(null);
                setNotice({ type: "success", text: "Your changes were saved." });
            } else {
                await createCollection(payload);
                setNotice({ type: "success", text: `"${payload.name}" was added to the catalogue.` });
                // Ready for the next one. The category stays selected.
                setName("");
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
            const result = await deleteCollection(collectionId);
            setConfirmOpen(false);
            onDeleted?.({ name: savedName, deletedProducts: result?.deletedProducts ?? productCount });
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
                : "Save collection";

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
                    {isEdit ? savedName || "Collection" : "Collection details"}
                </h2>
                <p className="mt-2 text-[14px] text-slate-500">
                    {isEdit
                        ? "Edit the collection details shown to customers."
                        : "Required fields are marked with a red asterisk."}
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

                    {/* Name */}
                    <Field id="name" label="Collection name" required error={errors.name}>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                clearError("name");
                            }}
                            placeholder="e.g. Oreo / Orion"
                            autoComplete="off"
                            aria-required="true"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={inputClass(Boolean(errors.name))}
                        />
                    </Field>

                    {/* Description */}
                    <Field id="description" label="Short description" className="sm:col-span-2">
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="One clear sentence about this family."
                            className={`${inputClass(false)} resize-y`}
                        />
                    </Field>

                    {/* Image */}
                    <Field
                        id="image"
                        label="Collection image"
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
                                        alt="Preview of the collection image"
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
                                          : `The image usually has the collection name printed on it. JPG, PNG or WebP, up to ${MAX_MB} MB.`}
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
                            Delete collection
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
                {deleteMessage(productCount)}
            </ConfirmDialog>
        </div>
    );
};

export default CollectionEditor;