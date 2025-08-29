import { Response } from "express";

export class ErrorHandler {
  static handleValidationError(res: Response, errors: string[]): void {
    res.status(400).json({
      error: 'Validation error',
      message: 'Please check the provided data',
      details: errors
    });
  }

  static handleMulterError(res: Response, error: Error): void {
    if (error.message.includes('Only image files')) {
      res.status(400).json({
        error: 'Invalid file type',
        message: error.message
      });
    } else if (error.message.includes('File too large')) {
      res.status(400).json({
        error: 'File too large',
        message: 'Image file size must be less than 5MB'
      });
    } else {
      res.status(400).json({
        error: 'File upload error',
        message: error.message
      });
    }
  }

  static handleMongooseError(res: Response, error: any): void {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        error: 'Validation error',
        message: 'Please check the provided data',
        details: validationErrors
      });
    } else if (error.code === 11000) {
      res.status(400).json({
        error: 'Duplicate entry',
        message: 'A product with this name already exists'
      });
    } else {
      res.status(500).json({
        error: 'Database error',
        message: 'Failed to save product'
      });
    }
  }

  static handleGenericError(res: Response, error: Error): void {
    console.error('Unexpected error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    });
  }

  static handleMissingImage(res: Response): void {
    res.status(400).json({
      error: 'Image is required',
      message: 'Please upload an image for the product'
    });
  }

  static handleInvalidCategory(res: Response): void {
    res.status(400).json({
      error: 'Invalid category',
      message: 'The specified category does not exist'
    });
  }
}
