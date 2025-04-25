import express from "express"
import { getDashboard, getFavourite } from "../controller/reportController"
import { verifyRole, verifyToken } from "../middleware/authorization"

const app = express()
app.use(express.json())

app.get(`/dashboard`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getDashboard)
app.get(`/favorite`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getFavourite)

export default app