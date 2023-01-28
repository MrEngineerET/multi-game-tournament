import { InMemoryDatabase } from "brackets-memory-db"
import { BracketsManager } from "brackets-manager"

const storage = new InMemoryDatabase()
const bracketsManager = new BracketsManager(storage)

export async function createTournament() {
  const bracket = await bracketsManager.create({
    tournamentId: 0,
    name: "Tournament Name",
    type: "single_elimination",
    number: 1,
    settings: {
      size: 4,
    },
  })
  const tournament = {
    ...storage.data,
    ...bracket,
  }
  console.log("idid", "newly created tournament", tournament)
  return tournament
}
