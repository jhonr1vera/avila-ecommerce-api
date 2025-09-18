import { Router } from "express";
import { inventoryController } from "./inventory.controller";
import { AdminAccess } from "../shared/middlewares/admin";

const InventoryRouter = Router();

InventoryRouter.get("/", inventoryController.getInventory);
InventoryRouter.get("/:id", inventoryController.getProductById);
InventoryRouter.post("/", AdminAccess, inventoryController.addProduct);
InventoryRouter.patch("/:id", AdminAccess, inventoryController.updateProduct);
InventoryRouter.patch("/:id/delete", AdminAccess, inventoryController.deleteProduct);

export default InventoryRouter;
