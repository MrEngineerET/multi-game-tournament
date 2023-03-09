export function catagorizeData(tournamentData) {
  const organizedData = {
    _id: tournamentData._id,
    name: tournamentData.name,
    participants: tournamentData.participant,
    stages: tournamentData.stage,
    groups: tournamentData.group,
    rounds: tournamentData.round,
    matches: tournamentData.match,
    match_games: tournamentData.match_game,
    games: tournamentData.game,
  }

  // create participants property in matches and add 'opponent1' and 'opponent2'
  organizedData.matches.forEach((match) => {
    match.participants = [match.opponent1, match.opponent2]
  })

  // collect matches into group
  organizedData.rounds.forEach((round) => (round.matches = []))
  for (let round of organizedData.rounds) {
    for (let match of organizedData.matches)
      if (match.round_id === round.id) round.matches.push({ ...match })
  }
  delete organizedData.matches

  // collect groups into round
  organizedData.groups.forEach((group) => (group.rounds = []))
  for (let group of organizedData.groups) {
    for (let round of organizedData.rounds)
      if (round.group_id === group.id) group.rounds.push(round)
  }
  delete organizedData.rounds

  // collect groups into stage
  organizedData.stages.forEach((stage) => (stage.groups = []))
  for (let stage of organizedData.stages) {
    for (let group of organizedData.groups)
      if (group.stage_id === stage.id) stage.groups.push(group)
  }
  delete organizedData.groups

  return organizedData
}

export function addParticipantNameInMatch(tournamentData) {
  function getParticipantName(id) {
    const participant = tournamentData.participant.find(
      (participant) => participant.id === id,
    )
    if (!participant) return ""
    return participant.name
  }

  const updatedData = tournamentData
  for (let match of updatedData.match) {
    if (match.opponent1)
      match.opponent1.name = getParticipantName(match.opponent1.id)
    if (match.opponent2)
      match.opponent2.name = getParticipantName(match.opponent2.id)
  }
  return updatedData
}
