import express from "express"
import { getAllMenus, createMenu, updateMenu, deleteMenu } from "../controller/menuController"
import { verifyAddMenu, verifyEditMenu } from "../middleware/menuValidation"
import { verifyRole, verifyToken } from "../middleware/authorization"
import uploadFile from "../middleware/menuUpload"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getAllMenus)
app.post(`/`, [uploadFile.single("picture"), verifyAddMenu], createMenu)
app.put(`/:id`, [uploadFile.single("picture"), verifyEditMenu], updateMenu)
app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteMenu)

export default app