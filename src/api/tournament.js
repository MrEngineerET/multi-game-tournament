import { axios } from "../utils/axios"

export const stageType = {
  singleElimination: "single_elimination",
  doubleElimination: "double_elimination",
  round_robin: "round_robin",
}

export async function createTournament({
  name,
  description,
  participants,
  stageType,
  games,
}) {
  const { data: tournament } = (
    await axios.post("/tournament", {
      name,
      description,
      participants,
      stageType,
      games,
    })
  ).data
  return tournament
}

export async function getTournaments() {
  const { data: tournaments } = (await axios.get("/tournament")).data
  return tournaments
}

export async function getTournament(id) {
  const { data: tournament } = (await axios.get(`/tournament/${id}`)).data
  return tournament
}

/**
 *
 * @param {string} tournamentId
 * @param {object} data - {match?, participant?, name?, description?, status?, stageType?}
 */
export async function updateTournament(tournamentId, updateData) {
  const { data: tournament } = (
    await axios.patch(`/tournament/${tournamentId}`, updateData)
  ).data
  return tournament
}

export async function deleteTournament(tournamentId) {
  await axios.delete(`/tournament/${tournamentId}`)
}

/**
 *
 * @param {string} tournamentId
 * @param {string | string[]} participants
 */
export async function addParticipant(tournamentId, participants) {
  if (!Array.isArray(participants)) participants = [participants]
  const tournament = await axios.post(
    `/tournament/${tournamentId}/participant`,
    { participants },
  )
  return tournament
}

/**
 *
 * @param {string} tournamentId
 * @param {string} participantId
 * @param {string} newName
 */
export async function updateParticipant(tournamentId, participantId, newName) {
  await axios.patch(`tournament/${tournamentId}/participant/${participantId}`, {
    name: newName,
  })
}

export async function addGameToTouranment(tournamentId, gameId, count) {
  await axios.post(`/tournament/${tournamentId}/game`, { gameId, count })
}

export async function removeGameFromTournament(tournamentId, gameId) {
  await axios.delete(`/tournament/${tournamentId}/game/${gameId}`)
}

export async function updateGameInTournament(tournamentId, gameId, update) {
  await axios.patch(`/tournament/${tournamentId}/game/${gameId}`, update)
}
