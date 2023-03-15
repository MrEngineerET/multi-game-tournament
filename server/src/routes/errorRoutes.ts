import express from "express"
import { getAllErrors } from "../controllers/errorController.js"

const router = express.Router()

router.get("/", getAllErrors)

export default router
