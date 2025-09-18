import { SalesConstants } from "./constants/sales";
import { InternalServerError } from "../shared/utils/custom-errors";
import {
  CreateSale,
  CreateSaleItems,
  Sale,
  SaleSummary,
  UpdateStatus,
} from "./models/sales.model";
import prisma from "../prisma";

class SalesRepository {
  async getSales(limit: number, skip: number): Promise<SaleSummary[]> {
    try {
      const sales = await prisma.sale.findMany({
        where: { active: true },
        skip: skip,
        take: limit,
        orderBy: {
          saleDate: "desc",
        },
        select: {
          id: true,
          saleDate: true,
          totalAmount: true,
          customerId: true,
          status: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return sales;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(SalesConstants.Error.InternalServerError);
    }
  }

  async getSalesByUserId(
    customerId: number,
    limit: number,
    skip: number
  ): Promise<SaleSummary[]> {
    try {
      const sales = await prisma.sale.findMany({
        where: { active: true, customerId: customerId },
        skip: skip,
        take: limit,
        orderBy: {
          saleDate: "desc",
        },
        select: {
          id: true,
          saleDate: true,
          totalAmount: true,
          customerId: true,
          status: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return sales;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(SalesConstants.Error.InternalServerError);
    }
  }

  async getSaleById(id: number): Promise<Sale | null> {
    try {
      const sale = await prisma.sale.findUnique({
        where: { id: id, active: true },
        select: {
          id: true,
          saleDate: true,
          totalAmount: true,
          customerId: true,
          paymentMethod: true,
          status: true,
          active: true,
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
          items: {
            select: {
              id: true,
              quantity: true,
              productId: true,
              salePrice: true,
              totalPrice: true,
              product: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return sale;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        SalesConstants.Error.InternalServerErrorById
      );
    }
  }

  async addSale(saleData: CreateSale, totalAmount: number): Promise<Sale> {
    try {
      const newSale = await prisma.sale.create({
        data: {
          totalAmount: totalAmount,
          ...saleData,
          items: {
            create: saleData.items.map((item: CreateSaleItems) => ({
              ...item,
              totalPrice: item.quantity * item.salePrice,
            })),
          },
        },
        select: {
          id: true,
          saleDate: true,
          totalAmount: true,
          customerId: true,
          paymentMethod: true,
          status: true,
          active: true,
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
          items: {
            select: {
              id: true,
              quantity: true,
              productId: true,
              salePrice: true,
              totalPrice: true,
              product: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return newSale;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        SalesConstants.Error.InternalServerErrorAdd
      );
    }
  }

  async updateSaleStatus(statusData: UpdateStatus, id: number){
    try {
      await prisma.sale.update({
        where: {id: id},
        data: {
          status: statusData.status
        }
      })

      return true;
    } catch (error) {
      throw new InternalServerError(SalesConstants.Error.InternalServerErrorUpdateStatus)
    }
  }

  async deleteSale(id: number, deactivatedByUser: number): Promise<boolean> {
    try {
      await prisma.sale.update({
        where: { id: id },
        data: {
          active: false,
          deactivatedById: deactivatedByUser,
          deactivatedAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(
        SalesConstants.Error.InternalServerErrorDelete
      );
    }
  }

  async deleteSaleItem(id: number) {
    try {
      await prisma.saleItem.update({
        where: { id: id },
        data: {
          cancelled: true,
        },
      });
    } catch (error) {
      throw new InternalServerError(
        SalesConstants.Error.InternalServerErrorDelete
      );
    }
  }
}

export const salesRepository = new SalesRepository();
