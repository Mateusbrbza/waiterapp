import { Router } from "express";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategory } from "./app/useCases/categories/createCategory";

export const router = Router();

// List Categories
router.get("/categories", listCategories);

// Create Category
router.post("/categories", createCategory);

// List Products
router.get("/products", (req, res) => {
  res.send('ok');
});

// Create Product
router.post("/products", (req, res) => {
  res.send('ok');
});

// Get Products by Category
router.get("/categories/:categoryId/products", (req, res) => {
  res.send('ok');
});

// List Orders
router.get("/orders", (req, res) => {
  res.send('ok');
});

// Create Order
router.post("/orders", (req, res) => {
  res.send('ok');
});

// Change order Status
router.patch("/orders/:orderId/status", (req, res) => {
  res.send('ok');
});

// Delete/Cancel order
router.delete("/orders/:orderId", (req, res) => {
  res.send('ok');
});
