const rawTournamentData = {
  id: 0,
  name: "Single Tournament Example",
  participant: [
    {
      id: 0,
      tournament_id: 0,
      name: "aaa",
    },
    {
      id: 1,
      tournament_id: 0,
      name: "bbb",
    },
    {
      id: 2,
      tournament_id: 0,
      name: "ccc",
    },
    {
      id: 3,
      tournament_id: 0,
      name: "ddd",
    },
    {
      id: 4,
      tournament_id: 0,
      name: "aae",
    },
    {
      id: 5,
      tournament_id: 0,
      name: "bbe",
    },
    {
      id: 6,
      tournament_id: 0,
      name: "cce",
    },
    {
      id: 7,
      tournament_id: 0,
      name: "dde",
    },
    {
      id: 8,
      tournament_id: 0,
      name: "aaf",
    },
    {
      id: 9,
      tournament_id: 0,
      name: "bbf",
    },
    {
      id: 10,
      tournament_id: 0,
      name: "ccf",
    },
    {
      id: 11,
      tournament_id: 0,
      name: "ddf",
    },
    {
      id: 12,
      tournament_id: 0,
      name: "aag",
    },
    {
      id: 13,
      tournament_id: 0,
      name: "bbg",
    },
    {
      id: 14,
      tournament_id: 0,
      name: "ccg",
    },
    {
      id: 15,
      tournament_id: 0,
      name: "ddg",
    },
  ],
  stage: [
    {
      id: 0,
      tournament_id: 0,
      name: "SingleElimination",
      type: "single_elimination",
      number: 1,
      settings: {
        seedOrdering: ["natural"],
        consolationFinal: false,
        matchesChildCount: 0,
        size: 16,
      },
    },
  ],
  group: [
    {
      id: 0,
      stage_id: 0,
      number: 1,
    },
  ],
  round: [
    {
      id: 0,
      number: 1,
      stage_id: 0,
      group_id: 0,
    },
    {
      id: 1,
      number: 2,
      stage_id: 0,
      group_id: 0,
    },
    {
      id: 2,
      number: 3,
      stage_id: 0,
      group_id: 0,
    },
    {
      id: 3,
      number: 4,
      stage_id: 0,
      group_id: 0,
    },
  ],
  match: [
    {
      id: 0,
      number: 1,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 2,
      opponent1: {
        id: 0,
        position: 1,
      },
      opponent2: {
        id: 1,
        position: 2,
      },
    },
    {
      id: 1,
      number: 2,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 2,
      opponent1: {
        id: 2,
        position: 3,
      },
      opponent2: {
        id: 3,
        position: 4,
      },
    },
    {
      id: 2,
      number: 3,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 2,
      opponent1: {
        id: 4,
        position: 5,
      },
      opponent2: {
        id: 5,
        position: 6,
      },
    },
    {
      id: 3,
      number: 4,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 2,
      opponent1: {
        id: 6,
        position: 7,
      },
      opponent2: {
        id: 7,
        position: 8,
      },
    },
    {
      id: 4,
      number: 5,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 2,
      opponent1: {
        id: 8,
        position: 9,
      },
      opponent2: {
        id: 9,
        position: 10,
      },
    },
    {
      id: 5,
      number: 6,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 2,
      opponent1: {
        id: 10,
        position: 11,
      },
      opponent2: {
        id: 11,
        position: 12,
      },
    },
    {
      id: 6,
      number: 7,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 2,
      opponent1: {
        id: 12,
        position: 13,
      },
      opponent2: {
        id: 13,
        position: 14,
      },
    },
    {
      id: 7,
      number: 8,
      stage_id: 0,
      group_id: 0,
      round_id: 0,
      child_count: 0,
      status: 2,
      opponent1: {
        id: 14,
        position: 15,
      },
      opponent2: {
        id: 15,
        position: 16,
      },
    },
    {
      id: 8,
      number: 1,
      stage_id: 0,
      group_id: 0,
      round_id: 1,
      child_count: 0,
      status: 0,
      opponent1: {
        id: null,
      },
      opponent2: {
        id: null,
      },
    },
    {
      id: 9,
      number: 2,
      stage_id: 0,
      group_id: 0,
      round_id: 1,
      child_count: 0,
      status: 0,
      opponent1: {
        id: null,
      },
      opponent2: {
        id: null,
      },
    },
    {
      id: 10,
      number: 3,
      stage_id: 0,
      group_id: 0,
      round_id: 1,
      child_count: 0,
      status: 0,
      opponent1: {
        id: null,
      },
      opponent2: {
        id: null,
      },
    },
    {
      id: 11,
      number: 4,
      stage_id: 0,
      group_id: 0,
      round_id: 1,
      child_count: 0,
      status: 0,
      opponent1: {
        id: null,
      },
      opponent2: {
        id: null,
      },
    },
    {
      id: 12,
      number: 1,
      stage_id: 0,
      group_id: 0,
      round_id: 2,
      child_count: 0,
      status: 0,
      opponent1: {
        id: null,
      },
      opponent2: {
        id: null,
      },
    },
    {
      id: 13,
      number: 2,
      stage_id: 0,
      group_id: 0,
      round_id: 2,
      child_count: 0,
      status: 0,
      opponent1: {
        id: null,
      },
      opponent2: {
        id: null,
      },
    },
    {
      id: 14,
      number: 1,
      stage_id: 0,
      group_id: 0,
      round_id: 3,
      child_count: 0,
      status: 0,
      opponent1: {
        id: null,
      },
      opponent2: {
        id: null,
      },
    },
  ],
  match_game: [],
}

export const singleEliminationTournament = {
  id: 0,
  name: "Single Tournament Example",
  participant: [
    {
      id: 0,
      tournament_id: 0,
      name: "Biruk Berhanu",
    },
    {
      id: 1,
      tournament_id: 0,
      name: "Abraham Adamu",
    },
    {
      id: 2,
      tournament_id: 0,
      name: "Belay Adamu",
    },
    {
      id: 3,
      tournament_id: 0,
      name: "Natnael Birhanu",
    },
  ],
  stage: [
    {
      id: 0,
      tournament_id: 0,
      number: 1,
      name: "Stage One",
      type: "single_elimination",
      settings: {
        size: 8,
        seedOrdering: ["natural", "natural", "reverse_half_shift", "reverse"],
        grandFinal: "double",
        matchesChildCount: 0,
      },
    },
  ],
  group: [
    {
      id: 0,
      stage_id: 0,
      number: 1,
    },
  ],
  round: [
    {
      id: 0,
      group_id: 0,
      number: 1,
    },
    {
      id: 1,
      group_id: 0,
      number: 2,
    },
  ],
  match: [
    {
      id: 0,
      number: 1,
      round_id: 0,
      opponent1: {
        id: 0,
        position: 1,
        score: 6,
        result: "win",
      },
      opponent2: {
        id: 1,
        position: 2,
        score: 2,
        result: "loss",
      },
    },
    {
      id: 1,
      number: 2,
      round_id: 0,
      opponent1: {
        id: 2,
        position: 3,
        score: 3,
        result: "win",
      },
      opponent2: {
        id: 3,
        position: 4,
        score: 1,
        result: "loss",
      },
    },
    {
      id: 2,
      number: 3,
      round_id: 1,
      opponent1: {
        id: 0,
        position: 1,
        score: 16,
        result: "win",
      },
      opponent2: {
        id: 2,
        position: 2,
        score: 12,
        result: "loss",
      },
    },
  ],
}

export function catagorizeData(tournamentData) {
  const organizedData = {
    id: tournamentData.id,
    name: tournamentData.name,
    participants: tournamentData.participant,
    stages: tournamentData.stage,
    groups: tournamentData.group,
    rounds: tournamentData.round,
    matches: tournamentData.match,
    match_games: tournamentData.match_game,
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

export const organizedData = catagorizeData(
  addParticipantNameInMatch(rawTournamentData),
)
