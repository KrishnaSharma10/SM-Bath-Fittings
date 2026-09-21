import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCategories, listCollections, listProducts, errorMessage } from "../../api/AdminApi";
import {
    Breadcrumb,
    PageHeader,
    Notice,
    ChevronDown,
    inputClass,
    secondaryButtonClass,
} from "../../components/admin/AdminUI";
import ProductEditor from "../../components/admin/ProductEditor";

/**
 * /admin/products            -> the list, nothing selected
 * /admin/products?edit=<id>  -> the list, with that product open in the form
 */
const ProductsManage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const editId = params.get("edit") || undefined;

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    const [collections, setCollections] = useState([]);
    const [collectionsLoading, setCollectionsLoading] = useState(false);
    const [collection, setCollection] = useState("");

    const [search, setSearch] = useState("");
    const [query, setQuery] = useState(""); // the search text after a short pause in typing

    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false); // has the list loaded at least once
    const [fetching, setFetching] = useState(true);
    const [listError, setListError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const [notice, setNotice] = useState(null);
    const editorRef = useRef(null);

    /* Category filter options */
    useEffect(() => {
        let cancelled = false;
        getCategories()
            .then((data) => !cancelled && setCategories(data))
            .catch(() => {}); // the filter just stays empty; the list itself reports real problems
        return () => {
            cancelled = true;
        };
    }, []);

    /* Collection filter options, scoped to the chosen category */
    useEffect(() => {
        if (!category) {
            setCollections([]);
            setCollection("");
            return;
        }
        let cancelled = false;
        setCollectionsLoading(true);
        listCollections({ category })
            .then((data) => {
                if (cancelled) return;
                setCollections(data);
                setCollection((prev) => (data.some((c) => c._id === prev) ? prev : ""));
            })
            .catch(() => {})
            .finally(() => !cancelled && setCollectionsLoading(false));
        return () => {
            cancelled = true;
        };
    }, [category]);

    /* Wait a moment after typing before searching */
    useEffect(() => {
        const timer = setTimeout(() => setQuery(search.trim()), 300);
        return () => clearTimeout(timer);
    }, [search]);

    /* The list */
    useEffect(() => {
        let cancelled = false;
        setFetching(true);
        setListError("");

        listProducts({ category, collection, q: query })
            .then((data) => {
                if (cancelled) return;
                setItems(data);
                setLoaded(true);
            })
            .catch((err) => !cancelled && setListError(errorMessage(err)))
            .finally(() => !cancelled && setFetching(false));

        return () => {
            cancelled = true;
        };
    }, [category, collection, query, refreshKey]);

    /* On phones the form sits below the list, so bring it into view when a product is chosen */
    useEffect(() => {
        if (editId && window.innerWidth < 1024) {
            editorRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
        }
    }, [editId]);

    const refresh = () => setRefreshKey((n) => n + 1);
    const filtered = Boolean(query || category || collection);

    const clearFilters = () => {
        setSearch("");
        setQuery("");
        setCategory("");
        setCollection("");
    };

    const handleDeleted = ({ name }) => {
        setNotice({ type: "success", text: `"${name}" was deleted.` });
        refresh();
        navigate("/admin/products");
    };

    return (
        <div>
            <Breadcrumb items={[{ label: "Admin", to: "/admin" }, { label: "Edit a product" }]} />

            <PageHeader
                eyebrow="Manage products"
                title="Edit a product."
                text="Search by name or code, then update the catalogue item."
            />

            {notice && (
                <div className="mt-8">
                    <Notice type={notice.type}>{notice.text}</Notice>
                </div>
            )}

            <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
                {/* ---------- List ---------- */}
                <section aria-label="Products" className="border border-slate-200 bg-white p-6 sm:p-7">
                    <h2 className="text-[24px] font-normal leading-tight tracking-[-0.03em] text-brand-ink">
                        Products
                    </h2>

                    <div className="mt-5 space-y-3">
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products or codes"
                            aria-label="Search products or codes"
                            className={inputClass(false)}
                        />
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                aria-label="Filter by category"
                                className={`${inputClass(false)} cursor-pointer appearance-none pr-11`}
                            >
                                <option value="">All categories</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown />
                        </div>
                        <div className="relative">
                            <select
                                value={collection}
                                onChange={(e) => setCollection(e.target.value)}
                                disabled={!category || collectionsLoading}
                                aria-label="Filter by collection"
                                className={`${inputClass(false)} cursor-pointer appearance-none pr-11 disabled:cursor-not-allowed disabled:opacity-60`}
                            >
                                <option value="">{!category ? "All collections" : "All collections in category"}</option>
                                {collections.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown />
                        </div>
                    </div>

                    <div className="mt-5 border-t border-slate-200">
                        {listError && (
                            <div className="mt-4 space-y-3">
                                <Notice type="error">{listError}</Notice>
                                <button type="button" onClick={refresh} className={secondaryButtonClass}>
                                    Try again
                                </button>
                            </div>
                        )}

                        {/* First load */}
                        {!loaded && !listError && (
                            <div className="space-y-4 pt-4" aria-busy="true">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="h-[65px] animate-pulse bg-slate-100" />
                                ))}
                            </div>
                        )}

                        {/* Empty */}
                        {loaded && !listError && items.length === 0 && (
                            <div className="py-8 text-center text-[14px] text-slate-500">
                                {filtered ? (
                                    <>
                                        <p>No products match your search.</p>
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="mt-3 text-[13px] font-bold text-brand-blue transition-colors duration-200 hover:text-brand-red"
                                        >
                                            Clear search
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p>No products yet. Add your first product.</p>
                                        <Link
                                            to="/admin/products/new"
                                            className="mt-3 inline-block text-[13px] font-bold text-brand-blue transition-colors duration-200 hover:text-brand-red"
                                        >
                                            Add a product
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Rows */}
                        {loaded && items.length > 0 && (
                            <ul className={`lg:max-h-[640px] lg:overflow-y-auto ${fetching ? "opacity-60" : ""}`}>
                                {items.map((p) => {
                                    const selected = p._id === editId;
                                    return (
                                        <li key={p._id} className="border-b border-slate-200">
                                            <Link
                                                to={`/admin/products?edit=${p._id}`}
                                                onClick={() => setNotice(null)}
                                                aria-current={selected ? "true" : undefined}
                                                className={`group flex items-center gap-4 border-l-[3px] px-2 py-4 transition-colors duration-200 ${
                                                    selected
                                                        ? "border-l-brand-blue bg-brand-sky/60"
                                                        : "border-l-transparent hover:bg-slate-50"
                                                }`}
                                            >
                                                <span className="flex h-[65px] w-[65px] shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white">
                                                    <img src={p.image} alt="" className="h-full w-full object-contain" />
                                                </span>

                                                <span className="min-w-0 flex-1">
                                                    <span className="block truncate text-[15px] text-brand-ink">{p.name}</span>
                                                    <span className="mt-1.5 block truncate font-mono text-[11px] text-slate-500">
                                                        {p.catNo} &middot; {p.collectionRef?.name || "No collection"}
                                                    </span>
                                                </span>

                                                <span className="text-[13px] font-bold text-brand-blue transition-colors duration-200 group-hover:text-brand-red">
                                                    Edit
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </section>

                {/* ---------- Form ---------- */}
                <div ref={editorRef} className="scroll-mt-6">
                    {editId ? (
                        <ProductEditor
                            productId={editId}
                            onCancel={() => navigate("/admin/products")}
                            onSaved={refresh}
                            onDeleted={handleDeleted}
                        />
                    ) : (
                        <div className="border border-dashed border-slate-300 bg-white/60 p-8 text-center sm:p-12">
                            <p className="text-[20px] text-brand-ink">Choose a product to edit</p>
                            <p className="mt-2 text-[14px] text-slate-500">
                                Pick one from the list to change its details, image or collection, or to delete it.
                            </p>
                            <Link
                                to="/admin/products/new"
                                className="mt-5 inline-block text-[13px] font-bold text-brand-blue transition-colors duration-200 hover:text-brand-red"
                            >
                                Or add a new product
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsManage;