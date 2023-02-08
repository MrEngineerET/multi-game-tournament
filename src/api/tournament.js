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
  const tournaments = ls.getItem("tournaments")
  if (!tournaments) return null
  const tournament = tournaments.find((tournament) => tournament.id == id)
  return tournament
}

export async function updateTournament(match, tournamentId) {
  //get the tournament data
  const tournamentData = await getTournament(tournamentId)

  // console.log("idid", "match in updateTournament function ", match)
  // console.log("idid", "tournament Data ", tournamentId, tournamentData)

  const storage = new InMemoryDatabase()
  const bracketsManager = new BracketsManager(storage)
  await bracketsManager.import(tournamentData)
  await bracketsManager.update.match(match)
  const newTournamentData = await bracketsManager.export()
  newTournamentData.id = tournamentId
  newTournamentData.name = tournamentData.name
  newTournamentData.type = tournamentData.type
  newTournamentData.number = tournamentData.number

  // reflect the update onto local storage
  let tournaments = ls.getItem("tournaments")
  if (!tournaments) tournaments = [newTournamentData]
  else {
    tournaments = tournaments.map((tournament) => {
      if (tournament.id === tournamentId) return newTournamentData
      else return tournament
    })
  }

  ls.setItem("tournaments", tournaments)

  //return the updated tournament
  return newTournamentData
}
