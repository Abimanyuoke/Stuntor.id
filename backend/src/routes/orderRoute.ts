import express from "express"
import { getAllOrders, createOrder, updateStatusOrder, deleteOrder } from "../controller/orderController"
import { verifyAddOrder, verifyEditStatus } from "../middleware/orderValidation"
import { verifyRole, verifyToken } from "../middleware/authorization"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getAllOrders)
app.post(`/`, [verifyToken, verifyRole(["CASHIER"]), verifyAddOrder], createOrder)
app.put(`/:id`, [verifyToken, verifyRole(["CASHIER"]), verifyEditStatus], updateStatusOrder)
app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteOrder)

export default app