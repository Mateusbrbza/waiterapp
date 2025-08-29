import { Request } from "express";

// Interface for the request body
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  ingredients: Array<{
    name: string;
    icon: string;
  }>;
  category: string;
}

// Extend Request interface to include file property
export interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

// Product validation result
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Ingredient interface
export interface Ingredient {
  name: string;
  icon: string;
}
