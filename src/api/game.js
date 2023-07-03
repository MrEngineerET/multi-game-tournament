import { axios } from "../utils/axios"
export async function getAllGames(active) {
  let query = undefined
  if (active) query = `active=${active}`
  const { data: games } = (await axios.get(`/game?${query}`)).data
  return games
}

export async function deleteGame(gameId, force) {
  await axios.delete(`/game/${gameId}?force=${force}`)
}

export async function createGame({ name, description, image }) {
  const { data: game } = (
    await axios.post(
      "/game",
      { name, description, image },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )
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
