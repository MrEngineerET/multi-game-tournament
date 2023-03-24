import express from "express"
import { getAllErrors } from "../controllers/errorController"

const router = express.Router()

router.get("/", getAllErrors)

export default router
