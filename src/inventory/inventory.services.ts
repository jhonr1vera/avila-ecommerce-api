import { Product, UpdateProduct, CreateProduct } from "./models/products.model";
import { NotFoundError } from "../shared/utils/custom-errors";
import { inventoryRepository } from "./inventory.repository";
import { InventoryConstants } from "./constants/inventory";

class InventoryService {

  async getInventory(limit: number, skip: number): Promise<Omit<Product[], "createdAt">> {
    const products = await inventoryRepository.getInventory(limit, skip);

    if (products.length === 0) {
      throw new NotFoundError(InventoryConstants.Error.notFoundError);
    }

    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const product = await inventoryRepository.getProductById(id);

    if (!product) {
      throw new NotFoundError(`${InventoryConstants.Error.notFoundErrorById}: ${id}`);
    }

    return product;
  };

  async addProduct(product: CreateProduct): Promise<Product> {
    const newProduct = await inventoryRepository.addProduct(product);

    return newProduct;
  }

  async updateProduct(id: number, product: UpdateProduct): Promise<Product> {
    await this.getProductById(id);

    const updatedProduct = await inventoryRepository.updateProduct(id, product);

    return updatedProduct;
  }

  async deleteProduct(id: number, discontinuedByUser: number): Promise<boolean> {
    await this.getProductById(id);

    const deleteProduct = await inventoryRepository.deleteProduct(id, discontinuedByUser);

    return deleteProduct;
  }

  async incrementProductStock(id: number, incrementQuantity: number) {

    const updatedProduct = inventoryRepository.incrementProductStock(id, incrementQuantity)

    return updatedProduct;
  }

  async decrementProductStock(id: number, decrementQuantity: number) {

    const updatedProduct = inventoryRepository.decrementProductStock(id, decrementQuantity)

    return updatedProduct;
  }

}

export const inventoryService = new InventoryService();


