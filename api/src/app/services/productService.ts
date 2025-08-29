import { Product } from "../models/Product.ts";
import { CreateProductRequest } from "../types/product.ts";

export class ProductService {
  static async createProduct(data: CreateProductRequest, imagePath: string) {
    const product = await Product.create({
      name: data.name.trim(),
      description: data.description.trim(),
      imagePath: imagePath,
      price: Number(data.price),
      ingredients: data.ingredients.map(ingredient => ({
        name: ingredient.name.trim(),
        icon: ingredient.icon.trim()
      })),
      category: data.category
    });

    await product.populate('category');

    return product;
  }

  static async getProductById(id: string) {
    return await Product.findById(id).populate('category');
  }

  static async getProductsByCategory(categoryId: string) {
    return await Product.find({ category: categoryId }).populate('category');
  }

  static async getAllProducts() {
    return await Product.find().populate('category');
  }

  static async updateProduct(id: string, updateData: Partial<CreateProductRequest>) {
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category');

    return product;
  }

  static async deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}
