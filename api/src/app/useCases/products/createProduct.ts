
import { Request, Response } from "express";
import { Product } from "../../models/Product.ts";

export async function createProduct(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    const category = await Product.create({ icon, name });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
