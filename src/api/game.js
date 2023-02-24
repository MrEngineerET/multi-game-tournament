import { axios } from "../utils/axios"
export async function getAllGames() {
  const { data: games } = (await axios.get("/game")).data
  return games
}

export async function deleteGame(gameId) {
  await axios.delete(`/game/${gameId}`)
}

export async function createGame({ name, description, images }) {
  const { data: game } = (
    await axios.post("/game", { name, description, images })
  ).data
  return game
}

export async function getGame(gameId) {
  const { data: game } = (await axios.get(`/game/${gameId}`)).data
  return game
}

export async function updateGame(gameId, update) {
  const { data: game } = (await axios.patch(`/game/${gameId}`, update)).data
  return game
}
