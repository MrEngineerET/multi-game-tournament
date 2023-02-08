import express from "express"
import tournamentRouter from "./routes/tournamentRoutes.js"
import morgan from "morgan"
import cors from "cors"

const app = express()
app.use(cors())

app.use(express.static("public"))

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(morgan("tiny"))
app.use("/api/v1/tournament", tournamentRouter)

export { app }
