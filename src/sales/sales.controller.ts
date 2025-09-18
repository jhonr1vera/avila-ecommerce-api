import { salesService } from "./sales.services";
import { CreateSaleSchema, UpdateStatusSchema } from "./dtos/create-sale.dto";
import { SalesConstants } from "./constants/sales";
import { Request, Response, NextFunction } from "express";
import { BadRequestError, ForbiddenError } from "../shared/utils/custom-errors";
import { GlobalConstants } from "../shared/constants/global";
import { getQueryParamAsNumber } from "../shared/utils/query-param-number";

class SalesController {
  async getSales(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = getQueryParamAsNumber(req.query.page, 1);
      const limit = getQueryParamAsNumber(req.query.limit, 10);
      const skip = (page - 1) * limit;
      const sales = await salesService.getSales(limit, skip);

      res.status(200).json({ sales });
    } catch (error) {
      next(error);
    }
  }

  async getSalesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = getQueryParamAsNumber(req.query.page, 1);
      const limit = getQueryParamAsNumber(req.query.limit, 10);
      const skip = (page - 1) * limit;

      let customerId = parseInt(req.params.id);

      if (!customerId) {
        throw new BadRequestError(SalesConstants.Error.BadRequestErrorUser);
      }


      const sales = await salesService.getSalesByUserId(
        customerId,
        limit,
        skip
      );

      res.status(200).json({ sales });
    } catch (error) {
      next(error);
    }
  }

  async getSalesByOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = getQueryParamAsNumber(req.query.page, 1);
      const limit = getQueryParamAsNumber(req.query.limit, 10);
      const skip = (page - 1) * limit;

      if((req as any).user.roleId !== GlobalConstants.Role.userId){
          throw new ForbiddenError(SalesConstants.Error.ForbiddenErrorUserOnly)
      }

      let customerId = parseInt((req as any).user.id);

      const sales = await salesService.getSalesByUserId(
        customerId,
        limit,
        skip
      );

      res.status(200).json({ sales });
    } catch (error) {
      next(error);
    }
  }

  async getSaleById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const saleId = parseInt(req.params.id);

      if (!saleId) {
        throw new BadRequestError(SalesConstants.Error.BadRequestErrorSale);
      }

      const sale = await salesService.getSaleById(saleId);

      if (
        (req as any).user.roleId !== GlobalConstants.Role.adminId &&
        sale.customerId !== (req as any).user.id
      ) {
        throw new ForbiddenError(SalesConstants.Error.ForbiddenErrorOwnerOnly)
      }

      res.status(200).json({ sale });
    } catch (error) {
      next(error);
    }
  }

  async addSale(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const saleData = CreateSaleSchema.parse(req.body);

      const customerId = (req as any).user.id;

      if((req as any).user.roleId !== GlobalConstants.Role.userId){
          throw new ForbiddenError(SalesConstants.Error.ForbiddenErrorUserOnly)
      }

      const newSale = await salesService.addSale({ ...saleData, customerId });

      res.status(201).json({ newSale });
    } catch (error) {
      next(error);
    }
  }

   async updateSaleStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const saleId = parseInt(req.params.id);

      if (!saleId) {
        throw new BadRequestError(SalesConstants.Error.BadRequestErrorSale);
      }

      const status = UpdateStatusSchema.parse(req.body)

      await salesService.updateSaleStatus(status, saleId)

      res.status(200).json({message: SalesConstants.Success.updateSaleStatus})
    } catch (error) {
      next(error);
    }
  }

  async deleteSale(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const saleId = parseInt(req.params.id);

      if (!saleId) {
        throw new BadRequestError(SalesConstants.Error.BadRequestErrorSale);
      }

      const deactivatedByUser = (req as any).user.id;

      await salesService.deleteSale(saleId, deactivatedByUser);

      res.status(200).json({ message: SalesConstants.Success.deletedSale });
    } catch (error) {
      next(error);
    }
  }
}

export const salesController = new SalesController();
