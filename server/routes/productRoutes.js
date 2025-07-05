const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// ➕ Add product
router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 📦 Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🧾 Get one product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Get Product Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ✏️ Update product by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🧹 Delete product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;
