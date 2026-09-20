const Category = require("../models/Category");
const Collection = require("../models/Collection");
const Product = require("../models/Product");

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

// A valid 24-character Mongo id, and only a string (blocks objects like {"$gt": ""})
const isValidId = (id) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

// Trimmed string, or "" if the value is missing or not a string
const text = (v) => (typeof v === "string" ? v.trim() : "");

// Only http(s) links, so things like "javascript:..." can never end up in an <img src>
const isHttpUrl = (v) => {
    try {
        const u = new URL(v);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Case-insensitive comparison for duplicate checks ("lb-104" equals "LB-104")
const ci = { locale: "en", strength: 2 };

const handleError = (res, err, fallback) => {
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: Object.values(err.errors).map((e) => e.message).join(", ") });
    }
    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id" });
    }
    console.error(fallback, err);
    return res.status(500).json({ message: fallback });
};

/* ------------------------------------------------------------------ */
/* Public reads                                            */
/* ------------------------------------------------------------------ */

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error while fetching categories" });
    }
};

const getAllCollectionsbyCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    if (!isValidId(categoryId)) return res.status(400).json({ message: "Invalid category id" });
    try {
        const collections = await Collection.find({ categoryRef: categoryId }).populate("categoryRef");
        res.status(200).json(collections);
    } catch (err) {
        console.error("Error fetching collections in the given category", err);
        res.status(500).json({ error: err.message });
    }
};

const getProductsbyCollectionId = async (req, res) => {
    const collectionId = req.params.collectionId;
    if (!isValidId(collectionId)) return res.status(400).json({ message: "Invalid collection id" });
    try {
        const products = await Product.find({ collectionRef: collectionId }).populate("collectionRef");
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* ------------------------------------------------------------------ */
/* Reads used by the admin edit screens                               */
/* ------------------------------------------------------------------ */

// GET /collections?category=<id>&q=<text>
const getAllCollections = async (req, res) => {
    try {
        const filter = {};
        const { category, q } = req.query;

        if (category !== undefined) {
            if (!isValidId(category)) return res.status(400).json({ message: "Invalid category id" });
            filter.categoryRef = category;
        }
        if (typeof q === "string" && q.trim()) {
            filter.name = { $regex: escapeRegex(q.trim()), $options: "i" };
        }

        const collections = await Collection.find(filter).populate("categoryRef").sort({ name: 1 });
        res.status(200).json(collections);
    } catch (err) {
        handleError(res, err, "Server error while fetching collections");
    }
};

// GET /collection/:collectionId  (also returns how many products it holds, for the delete warning)
const getCollectionById = async (req, res) => {
    const { collectionId } = req.params;
    if (!isValidId(collectionId)) return res.status(400).json({ message: "Invalid collection id" });
    try {
        const collection = await Collection.findById(collectionId).populate("categoryRef");
        if (!collection) return res.status(404).json({ message: "Collection not found" });

        const productCount = await Product.countDocuments({ collectionRef: collectionId });
        res.status(200).json({ ...collection.toObject(), productCount });
    } catch (err) {
        handleError(res, err, "Server error while fetching the collection");
    }
};

// GET /products?collection=<id>&category=<id>&q=<text>
const getAllProducts = async (req, res) => {
    try {
        const filter = {};
        const { collection, category, q } = req.query;

        if (collection !== undefined) {
            if (!isValidId(collection)) return res.status(400).json({ message: "Invalid collection id" });
            filter.collectionRef = collection;
        } else if (category !== undefined) {
            if (!isValidId(category)) return res.status(400).json({ message: "Invalid category id" });
            const ids = await Collection.find({ categoryRef: category }).distinct("_id");
            filter.collectionRef = { $in: ids };
        }

        if (typeof q === "string" && q.trim()) {
            const rx = { $regex: escapeRegex(q.trim()), $options: "i" };
            filter.$or = [{ name: rx }, { catNo: rx }];
        }

        const products = await Product.find(filter)
            .populate({ path: "collectionRef", populate: { path: "categoryRef" } })
            .sort({ name: 1 })
            .limit(500);
        res.status(200).json(products);
    } catch (err) {
        handleError(res, err, "Server error while fetching products");
    }
};

// GET /products/:productId
const getProductById = async (req, res) => {
    const { productId } = req.params;
    if (!isValidId(productId)) return res.status(400).json({ message: "Invalid product id" });
    try {
        const product = await Product.findById(productId).populate({
            path: "collectionRef",
            populate: { path: "categoryRef" },
        });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        handleError(res, err, "Server error while fetching the product");
    }
};

/* ------------------------------------------------------------------ */
/* Collections: create, edit, delete  (admin only)                     */
/* ------------------------------------------------------------------ */

// POST /collections   body: { categoryRef, name, image, description? }
const createCollection = async (req, res) => {
    try {
        const { categoryRef } = req.body;
        const name = text(req.body.name);
        const image = text(req.body.image);
        const description = text(req.body.description);

        if (!isValidId(categoryRef)) return res.status(400).json({ message: "Please choose a category" });
        if (!name) return res.status(400).json({ message: "Collection name is required" });
        if (!image || !isHttpUrl(image)) {
            return res.status(400).json({ message: "A valid collection image is required" });
        }

        const category = await Category.findById(categoryRef);
        if (!category) return res.status(404).json({ message: "Category not found" });

        const duplicate = await Collection.findOne({ categoryRef, name }).collation(ci);
        if (duplicate) {
            return res.status(409).json({ message: `"${name}" already exists in ${category.name}` });
        }

        const collection = await Collection.create({ categoryRef, name, image, description });
        res.status(201).json({ message: "Collection created", collection });
    } catch (err) {
        handleError(res, err, "Server error while creating the collection");
    }
};

// PUT /collections/:collectionId   body: any of { categoryRef, name, image, description }
const updateCollection = async (req, res) => {
    const { collectionId } = req.params;
    if (!isValidId(collectionId)) return res.status(400).json({ message: "Invalid collection id" });

    try {
        const collection = await Collection.findById(collectionId);
        if (!collection) return res.status(404).json({ message: "Collection not found" });

        const body = req.body || {};

        if (body.categoryRef !== undefined) {
            if (!isValidId(body.categoryRef)) return res.status(400).json({ message: "Please choose a category" });
            const category = await Category.findById(body.categoryRef);
            if (!category) return res.status(404).json({ message: "Category not found" });
            collection.categoryRef = body.categoryRef;
        }

        if (body.name !== undefined) {
            const name = text(body.name);
            if (!name) return res.status(400).json({ message: "Collection name is required" });
            collection.name = name;
        }

        if (body.image !== undefined) {
            const image = text(body.image);
            if (!image || !isHttpUrl(image)) {
                return res.status(400).json({ message: "A valid collection image is required" });
            }
            collection.image = image;
        }

        if (body.description !== undefined) collection.description = text(body.description);

        const duplicate = await Collection.findOne({
            _id: { $ne: collection._id },
            categoryRef: collection.categoryRef,
            name: collection.name,
        }).collation(ci);
        if (duplicate) {
            return res.status(409).json({ message: `A collection called "${collection.name}" already exists in that category` });
        }

        await collection.save();
        await collection.populate("categoryRef");
        res.status(200).json({ message: "Collection updated", collection });
    } catch (err) {
        handleError(res, err, "Server error while updating the collection");
    }
};

// DELETE /collections/:collectionId   (also deletes every product inside it)
const deleteCollection = async (req, res) => {
    const { collectionId } = req.params;
    if (!isValidId(collectionId)) return res.status(400).json({ message: "Invalid collection id" });

    try {
        const collection = await Collection.findById(collectionId);
        if (!collection) return res.status(404).json({ message: "Collection not found" });

        // Products first, so a failure can never leave products pointing at a missing collection
        const { deletedCount } = await Product.deleteMany({ collectionRef: collectionId });
        await collection.deleteOne();

        res.status(200).json({
            message: `Collection deleted, along with ${deletedCount} ${deletedCount === 1 ? "product" : "products"}`,
            deletedProducts: deletedCount,
        });
    } catch (err) {
        handleError(res, err, "Server error while deleting the collection");
    }
};

/* ------------------------------------------------------------------ */
/* Products: create, edit, delete  (admin only)                        */
/* ------------------------------------------------------------------ */

// POST /products   body: { collectionRef, name, catNo, image, description? }
const createProduct = async (req, res) => {
    try {
        const { collectionRef } = req.body;
        const name = text(req.body.name);
        const catNo = text(req.body.catNo);
        const image = text(req.body.image);
        const description = text(req.body.description);

        if (!isValidId(collectionRef)) return res.status(400).json({ message: "Please choose a collection" });
        if (!name) return res.status(400).json({ message: "Product name is required" });
        if (!catNo) return res.status(400).json({ message: "Catalogue number is required" });
        if (!image || !isHttpUrl(image)) return res.status(400).json({ message: "A valid product image is required" });

        const collection = await Collection.findById(collectionRef);
        if (!collection) return res.status(404).json({ message: "Collection not found" });

        const taken = await Product.findOne({ catNo }).collation(ci);
        if (taken) {
            return res.status(409).json({ message: `Catalogue number ${catNo} is already used by "${taken.name}"` });
        }

        const product = await Product.create({ collectionRef, name, catNo, image, description });
        res.status(201).json({ message: "Product created", product });
    } catch (err) {
        handleError(res, err, "Server error while creating the product");
    }
};

// PUT /products/:productId   body: any of { collectionRef, name, catNo, image, description }
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    if (!isValidId(productId)) return res.status(400).json({ message: "Invalid product id" });

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const body = req.body || {};

        if (body.collectionRef !== undefined) {
            if (!isValidId(body.collectionRef)) return res.status(400).json({ message: "Please choose a collection" });
            const collection = await Collection.findById(body.collectionRef);
            if (!collection) return res.status(404).json({ message: "Collection not found" });
            product.collectionRef = body.collectionRef;
        }

        if (body.name !== undefined) {
            const name = text(body.name);
            if (!name) return res.status(400).json({ message: "Product name is required" });
            product.name = name;
        }

        if (body.catNo !== undefined) {
            const catNo = text(body.catNo);
            if (!catNo) return res.status(400).json({ message: "Catalogue number is required" });

            const taken = await Product.findOne({ _id: { $ne: product._id }, catNo }).collation(ci);
            if (taken) {
                return res.status(409).json({ message: `Catalogue number ${catNo} is already used by "${taken.name}"` });
            }
            product.catNo = catNo;
        }

        if (body.image !== undefined) {
            const image = text(body.image);
            if (!image || !isHttpUrl(image)) return res.status(400).json({ message: "A valid product image is required" });
            product.image = image;
        }

        if (body.description !== undefined) product.description = text(body.description);

        await product.save();
        await product.populate({ path: "collectionRef", populate: { path: "categoryRef" } });
        res.status(200).json({ message: "Product updated", product });
    } catch (err) {
        handleError(res, err, "Server error while updating the product");
    }
};

// DELETE /products/:productId
const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    if (!isValidId(productId)) return res.status(400).json({ message: "Invalid product id" });

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        handleError(res, err, "Server error while deleting the product");
    }
};

module.exports = {
    // public
    getAllCategories,
    getAllCollectionsbyCategory,
    getProductsbyCollectionId,

    // admin edit screens
    getAllCollections,
    getCollectionById,
    getAllProducts,
    getProductById,
    
    // admin writes
    createCollection,
    updateCollection,
    deleteCollection,
    createProduct,
    updateProduct,
    deleteProduct,
};