import { Response } from "express";
import { RequestWithFile, CreateProductRequest } from "../../types/product.ts";
import { ProductValidator } from "../../validators/productValidator.ts";
import { ProductService } from "../../services/productService.ts";
import { ErrorHandler } from "../../utils/errorHandler.ts";
import { productImageUpload } from "../../config/multer.ts";
export { productImageUpload as uploadProductImage };

export async function createProduct(req: RequestWithFile, res: Response) {
  try {
    const productData: CreateProductRequest = req.body;

    const validation = await ProductValidator.validateCreateProduct(
      productData,
      !!req.file
    );

    if (!validation.isValid) {
      return ErrorHandler.handleValidationError(res, validation.errors);
    }

    const product = await ProductService.createProduct(
      productData,
      req.file!.path
    );

    res.status(201).json({
      message: 'Product created successfully',
      product: product
    });

  } catch (error) {
    console.error('Error creating product:', error);

    if (error instanceof Error) {
      if (error.message.includes('Only image files') ||
          error.message.includes('File too large') ||
          error.message.includes('File upload error')) {
        return ErrorHandler.handleMulterError(res, error);
      }

      if ((error as any).name === 'ValidationError' || (error as any).code === 11000) {
        return ErrorHandler.handleMongooseError(res, error);
      }
      return ErrorHandler.handleGenericError(res, error);
    }
    return ErrorHandler.handleGenericError(res, new Error('Unknown error occurred'));
  }
}
