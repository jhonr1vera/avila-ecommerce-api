import { NextFunction, Request, Response } from "express";
import { inventoryService } from "./inventory.services";
import { CreateProductSchema } from "./dtos/create-product.dto";
import { UpdateProductSchema } from "./dtos/update-product.dto";
import { InventoryConstants } from "./constants/inventory";
import { BadRequestError } from "../shared/utils/custom-errors";

class InventoryController {
  async getInventory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1; // Mejorar esta validacion, la estoy forzando por ahora
      const limit = parseInt(req.query.limit as string) || 10; // Mejorar esta validacion, la estoy forzando por ahora
      const skip = (page - 1) * limit;

      const inventory = await inventoryService.getInventory(limit, skip);

      res.status(200).json(inventory);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = parseInt(req.params.id);

      if (!productId) {
        throw new BadRequestError(InventoryConstants.Error.BadRequestError);
      }

      const product = await inventoryService.getProductById(productId);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async addProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = CreateProductSchema.parse(req.body);
      const newProduct = await inventoryService.addProduct(product);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = parseInt(req.params.id);

      if (!productId) {
        throw new BadRequestError(InventoryConstants.Error.BadRequestError);
      }

      const productData = UpdateProductSchema.parse(req.body);
      const updatedProduct = await inventoryService.updateProduct(
        productId,
        productData
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = parseInt(req.params.id);

      if (!productId) {
        throw new BadRequestError(InventoryConstants.Error.BadRequestError);
      }

      const discotinuedByUser = (req as any).user.id;

      await inventoryService.deleteProduct(productId, discotinuedByUser);

      res
        .status(200)
        .json({ message: InventoryConstants.Success.deletedProduct });
    } catch (error) {
      next(error);
    }
  }
}

export const inventoryController = new InventoryController();
