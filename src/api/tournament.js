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
}) {
  const { data: tournament } = (
    await axios.post("/tournament", {
      name,
      description,
      participants,
      stageType,
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

export async function updateMatch(match, tournamentId) {
  const { data: tournament } = (
    await axios.patch(`/tournament/${tournamentId}/update-match`, match)
  ).data
  return tournament
}
