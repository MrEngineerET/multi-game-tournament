import express from "express"
import tournamentRouter from "./routes/tournamentRoutes.js"

const app = express()
app.use(express.static("public"))

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/tournament", tournamentRouter)

export { app }
