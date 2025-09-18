import { Router } from "express";
import { salesController } from "../sales/sales.controller";
import { AdminAccess } from "../shared/middlewares/admin";

const SalesRouter = Router();

SalesRouter.get("/", AdminAccess, salesController.getSales)
SalesRouter.get("/user/me", salesController.getSalesByOwner)
SalesRouter.get("/user/:id", AdminAccess, salesController.getSalesByUserId)
SalesRouter.get("/:id", salesController.getSaleById)
SalesRouter.patch("/:id", AdminAccess, salesController.updateSaleStatus)
SalesRouter.post("/", salesController.addSale)
SalesRouter.patch("/:id/delete", AdminAccess, salesController.deleteSale)

export default SalesRouter;