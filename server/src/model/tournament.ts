import { Schema, model, Model, Types, HydratedDocument } from "mongoose"
import {
  Group,
  Match as M,
  Participant,
  Round,
  MatchGame,
  Stage,
} from "brackets-model"
import { Game } from "./game.js"

export interface Match extends M {
  gameId: Types.ObjectId | null
}

export interface Match extends M {
  gameId: Types.ObjectId | null
}

export interface Game {
  _id: Types.ObjectId
  gameId: Types.ObjectId
  count: number
}

export const tournamentStageType = {
  singleElimination: "single_elimination",
  doubleElimination: "double_elimination",
  roundRobin: "round_robin",
}

export interface Game {
  _id: Types.ObjectId
  gameId: Types.ObjectId
  count: number
}

export interface ITournament {
  _id: number
  name: string
  description: string
  participant: Participant[]
  stage: Stage[]
  group: Group[]
  round: Round[]
  match: Match[]
  match_game: MatchGame[]
  game: Game[]
  participantGameMatrix: { participantId: number; games: Game[] }[]
}

type TournamentDocumentOverrides = {
  stage: Types.DocumentArray<Stage>
  group: Types.DocumentArray<Group>
  round: Types.DocumentArray<Round>
  participant: Types.DocumentArray<Participant>
  match: Types.DocumentArray<Match>
  match_game: Types.DocumentArray<MatchGame>
  game: Types.DocumentArray<Game>
  participantGameMatrix: Types.DocumentArray<{
    participantId: number
    games: Types.DocumentArray<Game>
  }>
}

type TournamentModelType = Model<
  ITournament,
  object,
  TournamentDocumentOverrides
>

const TournamentSchema = new Schema<ITournament, TournamentModelType>({
  _id: Number,
  name: { type: String, required: true },
  description: String,
  participant: [
    {
      id: Number,
      tournament_id: Number,
      name: { type: String, required: true },
    },
  ],
  stage: [
    {
      id: { type: Number, default: 0 },
      tournament_id: {
        type: Number,
        default: 0,
      },
      name: { type: String, required: true },
      type: {
        type: String,
        enum: [
          tournamentStageType.singleElimination,
          tournamentStageType.doubleElimination,
          tournamentStageType.roundRobin,
        ],
        required: true,
      },
      number: Number,
      settings: {
        consolationFinal: Boolean,
        seedOrdering: [String],
        matchesChildCount: Number,
        size: Number,
        grandFinal: String,
        balanceByes: Boolean,
      },
    },
  ],
  group: [
    {
      id: { type: Number, required: true },
      number: { type: Number, required: true },
      stage_id: { type: Number, required: true },
    },
  ],
  round: [
    {
      id: { type: Number, required: true },
      number: { type: Number, required: true },
      group_id: { type: Number, required: true },
      stage_id: { type: Number, required: true },
    },
  ],
  match: [
    {
      id: { type: Number, required: true },
      number: { type: Number, required: true },
      group_id: { type: Number, required: true },
      stage_id: { type: Number, required: true },
      round_id: { type: Number, required: true },
      child_count: Number,
      status: Number,
      opponent1: {
        id: Number,
        position: Number,
        score: Number,
        result: { type: String, enum: ["win", "loss"] },
      },
      opponent2: {
        id: Number,
        position: Number,
        score: Number,
        result: { type: String, enum: ["win", "loss"] },
      },
      gameId: {
        type: Schema.Types.ObjectId,
        ref: Game,
        default: null,
      },
    },
  ],
  match_game: [],
  game: [
    {
      gameId: {
        type: Schema.Types.ObjectId,
        ref: Game,
        required: true,
      },
      count: { type: Number, default: 1 },
    },
  ],
  participantGameMatrix: [
    {
      participantId: Number,
      games: [
        {
          gameId: Schema.Types.ObjectId,
          count: Number,
        },
      ],
    },
  ],
})

export const Tournament = model<ITournament, TournamentModelType>(
  "tournament",
  TournamentSchema,
)

export type TournamentType = HydratedDocument<
  ITournament,
  object,
  TournamentDocumentOverrides
>
