const Collection = require("../models/CollectionModel")
const Category = require("../models/CategoryModel")
const Product = require("../models/ProductModel")

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error while fetching categories" });
    }
}

const getAllCollectionsbyCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    try {
        const collections = await Collection.find({ category: categoryId }).populate("category");
        res.status(200).json(collections);
    }
    catch (err) {
        console.error("Error fetching collections in the given category", err);
        res.status(500).json({ error: err.message });
    }
}

const getProductsbyCollectionId = async (req, res) => {
    const collectionId = req.params.collectionId;
    try {
        const products = await Product.find({ collectionRef: collectionId }).populate("collectionRef");
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createCollection = async (req, res) => {
    try {
        const { categoryName, collectionName, titleImage, description, products } = req.body;

        const category = await Category.findOne({ name: categoryName });

        const NewCollection = await Collection.create({
            category: category._id,
            name: collectionName,
            titleImage,
            description
        });

        const createdProducts = await Promise.all(
            products.map((prod) =>
                Product.create({
                    collectionRef: NewCollection._id,
                    name: prod.name,
                    image: prod.image
                })
            )
        );

        res.status(201).json({
            message: "Collection and products created successfully",
            collection: NewCollection,
            products: createdProducts
        });
    }
    catch (error) {
        console.error("Error creating collection and products:", error);
        res.status(500).json({ error: error.message });
    }
}

const deleteCollection = async (req, res) => {
    const collectionId = req.params.collectionId;
    try {
        await Product.deleteMany({ collectionRef: collectionId });
        await Collection.findByIdAndDelete(collectionId);
        res.status(200).json({ message: "Collection and its products deleted successfully." });
    } catch (error) {
        console.error("Error deleting collection:", error);
        res.status(500).json({ message: "Server error while deleting collection." });
    }
};

module.exports = {
    getAllCategories,
    getAllCollectionsbyCategory,
    getProductsbyCollectionId,
    createCollection,
    deleteCollection,
}