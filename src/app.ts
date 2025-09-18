import express from "express";
// import './types/express.d';
import morgan from "morgan";
import InventoryRouter from "./inventory/inventory.routes"
import AuthRouter from "./auth/auth.routes"
import SalesRouter from "./sales/sales.routes"
import { ErrorHandler } from "./shared/middlewares/error-handler";
import { AccessControl } from "./shared/middlewares/access-control";

const PORT = 5000
const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use("/api/v1/products", AccessControl, InventoryRouter);
app.use("/api/v1/sales", AccessControl, SalesRouter)
app.use("/api/v1/auth", AuthRouter)


app.use(ErrorHandler);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT );
})

