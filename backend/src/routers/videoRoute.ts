import express from "express"
import { getAllUsers, createUser, updateUser, deleteUser, changePicture, authentication, getUserById } from "../controllers/userController"
import { verifyAddUser, verifyEditUser, verifyAuthentication } from "../middlewares/videoValidation"
import uploadFile from "../middlewares/videoUpload"
import { verifyToken, verifyRole } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["MANAGER"])], getAllUsers)
app.get(`/profile`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getUserById)
app.post(`/`, uploadFile.single("picture"), verifyAddUser, createUser)
// app.post(`/`, [verifyToken, verifyRole(["MANAGER"]), uploadFile.single("picture"), verifyAddUser], createUser)
app.put(`/:id`, [verifyToken, verifyRole(["CASHIER", "MANAGER"]), uploadFile.single("picture"), verifyEditUser], updateUser)
app.put(`/profile/:id`, [verifyToken, verifyRole(["CASHIER", "MANAGER"]), uploadFile.single("picture")], changePicture)
app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteUser)
app.post(`/login`, [verifyAuthentication], authentication)

export default app