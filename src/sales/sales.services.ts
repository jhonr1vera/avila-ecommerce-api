import { salesRepository } from "./sales.repository";
import {
  InsufficientStockError,
  NotFoundError,
} from "../shared/utils/custom-errors";
import { SalesConstants } from "./constants/sales";
import { inventoryService } from "../inventory/inventory.services";
import { InventoryConstants } from "../inventory/constants/inventory";
import {
  CreateSaleItems,
  CreateSaleWithoutItemsPrice,
  Sale,
  SaleSummary,
  UpdateStatus,
} from "./models/sales.model";

class SalesService {
  private async saleItemApproved(product: Omit<CreateSaleItems, "salePrice">) {
    const productExists = await inventoryService.getProductById(
      product.productId
    ); 

    if (productExists.quantity < product.quantity) {
      console.error(productExists);
      throw new InsufficientStockError(
        `${InventoryConstants.Error.InsufficientStockError}: ${productExists.name}`
      );
    }
  }

  async getSales(limit: number, skip: number): Promise<SaleSummary[]> {
    const sales = await salesRepository.getSales(limit, skip);

    if (sales.length === 0) {
      throw new NotFoundError(SalesConstants.Error.NotFoundError);
    }

    return sales;
  }

  async getSalesByUserId(customerId: number, limit: number, skip: number): Promise<SaleSummary[]> {
    const sales = await salesRepository.getSalesByUserId(customerId, limit, skip);

    if (sales.length === 0) {
      throw new NotFoundError(SalesConstants.Error.NotFoundError);
    }

    return sales;
  }

  async getSaleById(saleId: number,): Promise<Sale> {
    const sale = await salesRepository.getSaleById(saleId);

    if (!sale) {
      throw new NotFoundError(SalesConstants.Error.NotFoundErrorById);
    }

    return sale;
  }

  async addSale(saleData: CreateSaleWithoutItemsPrice): Promise<Sale> {

    await Promise.all(
      saleData.items.map((product) => this.saleItemApproved(product))
    );

     const itemsPrice = await Promise.all(
    saleData.items.map(async (item) => {
      const product = await inventoryService.getProductById(item.productId);

      return {
        ...item,
        salePrice: product.price,
      };
    })
  );

  const totalAmount = itemsPrice.reduce((sum, item) => sum + item.quantity * item.salePrice, 0);

    const newSale = await salesRepository.addSale({...saleData, items: itemsPrice}, totalAmount);

    await Promise.all(
      saleData.items.map(async (item) => {
        await inventoryService.decrementProductStock(
          item.productId,
          item.quantity
        );
      })
    );

    return newSale;
  }

  async updateSaleStatus(status: UpdateStatus, id: number){
    await this.getSaleById(id)

    await salesRepository.updateSaleStatus(status, id)

    return true;
  }

  async deleteSale(id: number, deactivatedByUser: number): Promise<boolean> {
    const saleExists = await this.getSaleById(id);

    const deletedSale = await salesRepository.deleteSale(id, deactivatedByUser);

    await Promise.all(
      saleExists.items.map(async (item) => {
        try {
          await salesRepository.deleteSaleItem(item.id);
        } catch (error) {
          console.error(
            `${SalesConstants.ConsoleLog.ErrorDeletingSaleItem}: ${item.product}`
          );
        }
      })
    );

    await Promise.all(
      saleExists.items.map(async (item) => {
        try {
          await inventoryService.incrementProductStock(
            item.productId,
            item.quantity
          );
        } catch (error) {
          console.error(
            `${InventoryConstants.Error.UpdatingStockError}: ${item.product}`
          );
        }
      })
    );

    return deletedSale;
  }
}

export const salesService = new SalesService();
