import express from "express"
import { getAllErrors } from "../controllers/errorController"
import authController from "../controllers/userController/authController"

const router = express.Router()

router.use(authController.protect)
router.use(authController.restrictTo("admin"))
router.get("/", getAllErrors)

export default router
