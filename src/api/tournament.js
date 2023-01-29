import { InMemoryDatabase } from "brackets-memory-db"
import { BracketsManager } from "brackets-manager"

const storage = new InMemoryDatabase()
const bracketsManager = new BracketsManager(storage)

export async function createTournament() {
  // eslint-disable-next-line no-unused-vars
  let query = {
    name: "aa",
    seeding: ["a", "b", "c", "d"],
    settings: {
      seedOrdering: ["natural"],
      consolationFinal: false,
    },
    tournamentId: 0,
    type: "single_elimination",
  }
  const bracket = await bracketsManager.create(query)

  return { ...bracket, ...storage.data }
}
