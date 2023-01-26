//manually constructed data for 8 participants
export const singleEliminationTournament = {
  id: 0,
  name: "Single Tournament Example",
  participants: [
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
    {
      id: 4,
      tournament_id: 0,
      name: "Kaleab Bekele",
    },
    {
      id: 5,
      tournament_id: 0,
      name: "Leoul Mekonen",
    },
    {
      id: 6,
      tournament_id: 0,
      name: "Natnael Mekonen",
    },
    {
      id: 7,
      tournament_id: 0,
      name: "Tesfaye Maru",
    },
  ],
  stages: [
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
  groups: [
    {
      id: 0,
      stage_id: 0,
      number: 1,
    },
    {
      id: 1,
      stage_id: 0,
      number: 2,
    },
  ],
  rounds: [
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
    {
      id: 2,
      group_id: 0,
      number: 3,
    },
    {
      id: 3,
      group_id: 1,
      number: 1,
    },
  ],
  matches: [
    {
      id: 0,
      number: 1,
      round_id: 0,
      participants: [
        {
          id: 0,
          score: 5,
        },
        {
          id: 1,
          score: 2,
        },
      ],
      winner_id: null,
      loser_id: null,
    },
    {
      id: 1,
      number: 2,
      round_id: 0,
      participants: [
        {
          id: 2,
          score: null,
        },
        {
          id: 3,
          score: null,
        },
      ],
      winner_id: null,
      loser_id: null,
    },
    {
      id: 2,
      number: 3,
      round_id: 0,
      participants: [
        {
          id: 4,
          score: null,
        },
        {
          id: 5,
          score: null,
        },
      ],
      winner_id: null,
      loser_id: null,
    },
    {
      id: 3,
      number: 4,
      round_id: 0,
      participants: [
        {
          id: 6,
          score: null,
        },
        {
          id: 7,
          score: null,
        },
      ],
      winner_id: null,
      loser_id: null,
    },
    {
      id: 4,
      number: 5,
      round_id: 1,
      participants: [
        {
          id: null,
          score: null,
        },
        {
          id: null,
          score: null,
        },
      ],
      winner_id: null,
      loser_id: null,
    },
    {
      id: 5,
      number: 6,
      round_id: 1,
      participants: [
        {
          id: null,
          score: null,
        },
        {
          id: null,
          score: null,
        },
      ],
      winner_id: null,
      loser_id: null,
    },
    {
      id: 6,
      number: 7,
      round_id: 2,
      participants: [
        {
          id: null,
          score: null,
        },
        {
          id: null,
          score: null,
        },
      ],
      winner_id: null,
      loser_id: null,
    },
    {
      id: 7,
      number: 8,
      round_id: 3,
      participants: [
        {
          id: null,
          score: null,
        },
        {
          id: null,
          score: null,
        },
      ],
      winner_id: null,
      loser_id: null,
    },
  ],
}

function catagorizeData(tournamentData) {
  const organizedData = { ...tournamentData }
  // organize matches into group
  organizedData.rounds.forEach((round) => (round.matches = []))
  for (let round of organizedData.rounds) {
    for (let match of organizedData.matches)
      if (match.round_id === round.id) round.matches.push({ ...match })
  }
  delete organizedData.matches

  organizedData.groups.forEach((group) => (group.rounds = []))
  for (let group of organizedData.groups) {
    for (let round of organizedData.rounds)
      if (round.group_id === group.id) group.rounds.push(round)
  }
  delete organizedData.rounds

  organizedData.stages.forEach((stage) => (stage.groups = []))
  for (let stage of organizedData.stages) {
    for (let group of organizedData.groups)
      if (group.stage_id === stage.id) stage.groups.push(group)
  }
  delete organizedData.groups

  return organizedData
}

function addParticipantNameInMatch(tournamentData) {
  function getParticipantName(id) {
    const participant = tournamentData.participants.find(
      (participant) => participant.id === id,
    )
    if (!participant) return ""
    return participant.name
  }

  const updatedData = tournamentData
  for (let match of updatedData.matches) {
    for (let participant of match.participants) {
      participant.name = getParticipantName(participant.id)
    }
  }
  return updatedData
}

export const organizedData = catagorizeData(
  addParticipantNameInMatch(singleEliminationTournament),
)
