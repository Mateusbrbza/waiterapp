import { CreateProductRequest, ValidationResult } from "../types/product.ts";
import { Category } from "../models/Category.ts";

export class ProductValidator {
  static async validateCreateProduct(
    data: CreateProductRequest,
    hasImage: boolean
  ): Promise<ValidationResult> {
    const errors: string[] = [];

    // Check if image was uploaded
    if (!hasImage) {
      errors.push('Image is required');
    }

    // Validate required fields
    if (!data.name || data.name.trim() === '') {
      errors.push('Product name cannot be empty');
    }

    if (!data.description || data.description.trim() === '') {
      errors.push('Product description cannot be empty');
    }

    if (!data.price || isNaN(Number(data.price)) || Number(data.price) <= 0) {
      errors.push('Price must be a positive number');
    }

    if (!data.category || data.category.trim() === '') {
      errors.push('Product category cannot be empty');
    } else {
      try {
        const existingCategory = await Category.findById(data.category);
        if (!existingCategory) {
          errors.push('The specified category does not exist');
        }
      } catch {
        errors.push('Invalid category ID format');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateIngredients(ingredients: any[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!Array.isArray(ingredients)) {
      errors.push('Ingredients must be an array');
      return { isValid: false, errors };
    }

    if (ingredients.length === 0) {
      errors.push('At least one ingredient must be provided');
      return { isValid: false, errors };
    }

    ingredients.forEach((ingredient, index) => {
      if (!ingredient || typeof ingredient !== 'object') {
        errors.push(`Ingredient at index ${index} must be an object`);
        return;
      }

      if (!ingredient.name || typeof ingredient.name !== 'string' || ingredient.name.trim() === '') {
        errors.push(`Ingredient at index ${index} must have a valid name`);
      }

      if (!ingredient.icon || typeof ingredient.icon !== 'string' || ingredient.icon.trim() === '') {
        errors.push(`Ingredient at index ${index} must have a valid icon`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validatePrice(price: any): { isValid: boolean; error?: string } {
    if (price === undefined || price === null || price === '') {
      return { isValid: false, error: 'Price is required' };
    }

    const numPrice = Number(price);
    if (isNaN(numPrice)) {
      return { isValid: false, error: 'Price must be a valid number' };
    }

    if (numPrice <= 0) {
      return { isValid: false, error: 'Price must be greater than 0' };
    }

    return { isValid: true };
  }
}
