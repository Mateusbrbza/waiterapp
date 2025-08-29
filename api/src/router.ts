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
router.get("/categories/:categoryId/products");

// List Orders
router.get("/orders");

// Create Order
router.post("/orders");

// Change order Status
router.patch("/orders/:orderId/status");

// Delete/Cancel order
router.delete("/orders/:orderId");
