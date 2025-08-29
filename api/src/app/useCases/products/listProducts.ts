import { Request, Response } from "express";
import { Product } from "../../models/Product.ts";

export async function listProducts(req: Request, res: Response) {
  try {
    const categories = await Product.find();

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
