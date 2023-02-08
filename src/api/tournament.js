import { InMemoryDatabase } from "brackets-memory-db"
import { BracketsManager } from "brackets-manager"
import ls from "../utils/localStorage"
import { nanoid } from "nanoid"
import { axios } from "../utils/axios"

export const stageType = {
  singleElimination: "single_elimination",
  doubleElimination: "double_elimination",
  round_robin: "round_robin",
}

export async function createTournament(
  name,
  description,
  participants,
  stageType,
) {
  const storage = new InMemoryDatabase()
  const bracketsManager = new BracketsManager(storage)
  //create a tournament
  let query = {
    name,
    seeding: participants,
    settings: {
      seedOrdering: ["natural"],
      consolationFinal: false,
    },
    tournamentId: 1,
    type: stageType,
  }
  const bracket = await bracketsManager.create(query)
  const newTournament = { ...bracket, ...storage.data, id: nanoid() }
  //save to local storage
  let tournaments = ls.getItem("tournaments")
  if (!tournaments) tournaments = [newTournament]
  else tournaments.push(newTournament)

  ls.setItem("tournaments", tournaments)
  //return the tournament
  return newTournament
}

export async function getTournaments() {
  const { data: tournaments } = (await axios.get("/tournament")).data
  return tournaments
}

export async function getTournament(id) {
  const { data: tournament } = (await axios.get(`/tournament/${id}`)).data
  return tournament
}

export async function updateMatch(match, tournamentId) {
  const { data: tournament } = (
    await axios.patch(`/tournament/${tournamentId}/update-match`, match)
  ).data
  return tournament
}
