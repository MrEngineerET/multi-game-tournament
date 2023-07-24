import { axios } from "../utils/axios"
// import LocalStorage from "../utils/localStorage"

export const stageType = {
  singleElimination: "single_elimination",
  doubleElimination: "double_elimination",
  round_robin: "round_robin",
}

export async function createTournament(data) {
  const {
    name,
    description,
    participants,
    stageType,
    games,
    consolationFinal,
    grandFinal,
  } = data

  const { data: tournament } = (
    await axios.post("/tournament", {
      name,
      description,
      participants,
      stageType,
      games,
      consolationFinal,
      grandFinal,
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

/**
 *
 * @param {string} tournamentId
 */
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

export async function removeParticipant(tournamentId, participantId) {
  await axios.delete(`/tournament/${tournamentId}/participant/${participantId}`)
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

/**
 *
 * @param {string} tournamentId
 * @param {sting} gameId
 * @param {string} count
 */
export async function addGameToTouranment(tournamentId, gameId, count) {
  await axios.post(`/tournament/${tournamentId}/game`, { gameId, count })
}

/**
 *
 * @param {string} tournamentId
 * @param {string} gameId
 */
export async function removeGameFromTournament(tournamentId, gameId) {
  await axios.delete(`/tournament/${tournamentId}/game/${gameId}`)
}

/**
 *
 * @param {string} tournamentId
 * @param {string} gameId
 * @param {object} update
 */
export async function updateGameInTournament(tournamentId, gameId, update) {
  await axios.patch(`/tournament/${tournamentId}/game/${gameId}`, update)
}

export async function joinTournament(tournamentId, firstName) {
  return (await axios.post(`/tournament/${tournamentId}/join`, { firstName }))
    .data
}

export async function getTournamentStanding(tournamentId) {
  return (await axios.get(`/tournament/${tournamentId}/standing`)).data
}
