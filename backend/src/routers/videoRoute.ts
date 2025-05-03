import express from "express"
import { getAllVideo, createVideo, updateVideo, deleteVideo } from "../controllers/videoController"
import { verifyAddVideo, verifyEditVideo } from "../middlewares/videoValidation"
import uploadFile from "../middlewares/videoUpload"
import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getAllVideo)
app.post(`/`, [verifyToken, verifyRole(["MANAGER"]), uploadFile.single("video"), verifyAddVideo], createVideo)
app.put(`/:id`, [verifyToken, verifyRole(["MANAGER"]), uploadFile.single("video"), verifyEditVideo], updateVideo)
app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteVideo)

export default app