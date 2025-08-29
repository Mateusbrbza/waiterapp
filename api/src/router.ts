import { Router } from "express";
import { listCategories } from "./app/useCases/categories/listCategories.ts";
import { createCategory } from "./app/useCases/categories/createCategory.ts";
import { listProducts } from "./app/useCases/products/listProducts.ts";
import { createProduct } from "./app/useCases/products/createProduct.ts";

export const router = Router();

// List Categories
router.get("/categories", listCategories);

// Create Category
router.post("/categories", createCategory);

// List Products
router.get("/products", listProducts);

// Create Product
router.post("/products", createProduct);

// Get Products by Category
router.get("/categories/:categoryId/products", (req, res) => {
  res.json({ message: "Get products by category - TODO: implement handler" });
});

// List Orders
router.get("/orders", (req, res) => {
  res.json({ message: "List orders - TODO: implement handler" });
});

// Create Order
router.post("/orders", (req, res) => {
  res.json({ message: "Create order - TODO: implement handler" });
});

// Change order Status
router.patch("/orders/:orderId/status", (req, res) => {
  res.json({ message: "Change order status - TODO: implement handler" });
});

// Delete/Cancel order
router.delete("/orders/:orderId", (req, res) => {
  res.json({ message: "Delete order - TODO: implement handler" });
});
