import {
  CreateProduct,
  Product,
  UpdateProduct,
} from "./models/products.model";
import { InternalServerError } from "../shared/utils/custom-errors";
import { InventoryConstants } from "./constants/inventory";
import prisma from "../prisma";

class InventoryRepository{
  async getInventory(limit: number, skip: number): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        where: { discontinued: false },
        take: limit,
        skip: skip,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
        },
      });

      return products;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        InventoryConstants.Error.internalServerError
      );
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await prisma.product.findUnique({
        where: { id: id, discontinued: false },
      });
      return product;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        InventoryConstants.Error.internalServerErrorById
      );
    }
  }

  async addProduct(product: CreateProduct): Promise<Product> {
    try {
      const newProduct = await prisma.product.create({
        data: product,
      });
      return newProduct;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        InventoryConstants.Error.internalServerErrorAdd
      );
    }
  }

  async updateProduct(id: number, product: UpdateProduct): Promise<Product> {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: id, discontinued: false },
        data: product,
      });

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        InventoryConstants.Error.internalServerError
      );
    }
  }

  async deleteProduct(
    id: number,
    discontinuedByUser: number
  ): Promise<boolean> {
    try {
      await prisma.product.update({
        where: { id: id },
        data: {
          discontinuedById: discontinuedByUser,
          discontinued: true,
          discontinuedAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        InventoryConstants.Error.internalServerErrorDelete
      );
    }
  }

  async decrementProductStock(id: number, decrementQuantity: number) {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: id, discontinued: false },
        data: { quantity: { decrement: decrementQuantity } },
      });

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        InventoryConstants.Error.internalServerErrorUpdate
      );
    }
  }

  async incrementProductStock(id: number, incrementQuantity: number) {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: id, discontinued: false },
        data: { quantity: { increment: incrementQuantity } },
      });

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        InventoryConstants.Error.internalServerErrorUpdate
      );
    }
  }
}

export const inventoryRepository = new InventoryRepository();
