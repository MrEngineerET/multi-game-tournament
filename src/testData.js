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
  matchs: [
    {
      id: 0,
      number: 1,
      round_id: 0,
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
      id: 1,
      number: 2,
      round_id: 0,
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
      id: 2,
      number: 3,
      round_id: 0,
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
      id: 3,
      number: 4,
      round_id: 0,
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
