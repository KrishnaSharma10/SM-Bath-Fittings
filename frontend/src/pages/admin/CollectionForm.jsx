import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getCategories,
    getCollection,
    createCollection,
    updateCollection,
    uploadImage,
    errorMessage,
} from "../../api/AdminApi";
import {
    Breadcrumb,
    PageHeader,
    Notice,
    Field,
    ChevronDown,
    inputClass,
    primaryButtonClass,
    secondaryButtonClass,
} from "../../components/admin/AdminUI";

const MAX_MB = 5;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const FIELD_IDS = { categoryRef: "category", name: "name", image: "image" };

/**
 * One form for both routes:
 *   /admin/collections/new                 -> add
 *   /admin/collections/:collectionId/edit  -> edit (same form, pre-filled)
 */
const CollectionForm = () => {
    const { collectionId } = useParams();
    const isEdit = Boolean(collectionId);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const [categoryRef, setCategoryRef] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null); // a newly chosen image
    const [existingImage, setExistingImage] = useState(""); // the saved image (edit mode)
    const [preview, setPreview] = useState("");

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(""); // "" | "uploading" | "saving"
    const [notice, setNotice] = useState(null); // { type: "success" | "error", text }
    const fileInputRef = useRef(null);

    /* Load the categories (and the collection, when editing) */
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setLoadError("");
            try {
                const [cats, collection] = await Promise.all([
                    getCategories(),
                    isEdit ? getCollection(collectionId) : Promise.resolve(null),
                ]);
                if (cancelled) return;

                setCategories(cats);
                if (collection) {
                    setCategoryRef(collection.categoryRef?._id || collection.categoryRef || "");
                    setName(collection.name || "");
                    setDescription(collection.description || "");
                    setExistingImage(collection.image || "");
                }
            } catch (err) {
                if (!cancelled) setLoadError(errorMessage(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [collectionId, isEdit]);

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
    const busy = saving !== "";

    const clearError = (key) => setErrors((prev) => ({ ...prev, [key]: undefined }));

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
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            setNotice({ type: "error", text: errorMessage(err) });
            window.scrollTo({ top: 0, behavior: "smooth" });
        } finally {
            setSaving("");
        }
    };

    const handleCancel = () => navigate(isEdit ? "/admin/collections" : "/admin");

    const saveLabel =
        saving === "uploading"
            ? "Uploading image..."
            : saving === "saving"
              ? "Saving..."
              : isEdit
                ? "Save changes"
                : "Save collection";

    const crumbs = [
        { label: "Admin", to: "/admin" },
        ...(isEdit ? [{ label: "Edit a collection", to: "/admin/collections" }, { label: name || "Collection" }] : [{ label: "Add a collection" }]),
    ];

    return (
        <div>
            <Breadcrumb items={crumbs} />

            <PageHeader
                eyebrow={isEdit ? "Catalogue entry" : "New catalogue entry"}
                title={isEdit ? "Edit a collection." : "Add a collection."}
                text={
                    isEdit
                        ? "Update the details below, then save your changes."
                        : "Create a clear home for a new family of products."
                }
            />

            {notice && (
                <div className="mt-8">
                    <Notice type={notice.type}>{notice.text}</Notice>
                </div>
            )}

            {/* Loading */}
            {loading && <div className="mt-8 h-[520px] animate-pulse border border-slate-200 bg-white" aria-busy="true" />}

            {/* Could not load */}
            {!loading && loadError && (
                <div className="mt-8 space-y-4">
                    <Notice type="error">{loadError}</Notice>
                    <button type="button" onClick={() => navigate("/admin")} className={secondaryButtonClass}>
                        Back to admin home
                    </button>
                </div>
            )}

            {/* Form */}
            {!loading && !loadError && (
                <form onSubmit={handleSubmit} noValidate className="mt-8 border border-slate-200 bg-white p-6 sm:p-9">
                    <h2 className="text-[26px] font-normal leading-tight tracking-[-0.03em] text-brand-ink sm:text-[30px]">
                        Collection details
                    </h2>
                    <p className="mt-2 text-[14px] text-slate-500">Required fields are marked with a red asterisk.</p>

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
                        <Field id="image" label="Collection image" required error={errors.image} className="sm:col-span-2">
                            <div
                                className={`flex flex-col gap-4 border border-dashed bg-slate-50/70 p-3.5 sm:flex-row sm:items-center ${
                                    errors.image ? "border-brand-red" : "border-slate-300"
                                }`}
                            >
                                <div className="flex h-[97px] w-[120px] shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white">
                                    {shownImage ? (
                                        <img src={shownImage} alt="Preview of the collection image" className="h-full w-full object-contain" />
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
                                        aria-required={!existingImage}
                                        aria-invalid={Boolean(errors.image)}
                                        aria-describedby={errors.image ? "image-error" : undefined}
                                        className="block w-full text-[13px] text-slate-600 file:mr-3 file:cursor-pointer file:rounded-[3px] file:border file:border-slate-300 file:bg-white file:px-3.5 file:py-2 file:text-[13px] file:font-semibold file:text-brand-blue file:transition-colors hover:file:border-brand-blue hover:file:bg-brand-sky"
                                    />
                                    <p className="mt-2 text-[13px] leading-[1.5] text-slate-500">
                                        The image usually has the collection name printed on it. JPG, PNG or WebP, up to {MAX_MB} MB.
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
                        <button type="button" onClick={handleCancel} disabled={busy} className={secondaryButtonClass}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CollectionForm;