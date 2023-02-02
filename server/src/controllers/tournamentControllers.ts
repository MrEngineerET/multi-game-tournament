import { BracketsManager } from "brackets-manager"
import { JsonDatabase } from "brackets-json-db"
import path from "path"
import { nanoid } from "nanoid"

import * as url from "url"
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))

export const getAllTournaments = async (req, res) => {
  res.json({ success: true, message: "here is all your tournaments" })
}

export const createTournament = async (req, res) => {
  const { name, type } = req.body
  const participants = req.body.participants.split(",")

  const jsonStorage = new JsonDatabase(
    path.join(__dirname, "..", "data", "tournaments.json"),
  )

  const manager = new BracketsManager(jsonStorage)

  const stage = await manager.create({
    name,
    tournamentId: 1,
    type,
    seeding: participants,
    settings: {
      consolationFinal: false,
      seedOrdering: ["natural"],
    },
  })
  // const data = await jsonStorage.select()
  res.send({
    status: "",
    data: { ...stage, id: nanoid() },
  })
}

export const getTournament = async () => {
  console.log("working")
}
