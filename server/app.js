const express = require("express")
const path = require("path")
const app = express()
const tournamentRouter = require("./routes/tournamentRoutes")

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/tournament", tournamentRouter)

module.exports = { app }
