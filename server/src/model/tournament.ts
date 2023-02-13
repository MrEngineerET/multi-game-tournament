import { Schema, model, Model } from "mongoose"
import {
  Group,
  Match,
  Participant,
  Round,
  MatchGame,
  Stage,
} from "brackets-model"
import { Game, IGame } from "./game.js"

export const tournamentStageType = {
  singleElimination: "single_elimination",
  doubleElimination: "double_elimination",
  roundRobin: "round_robin",
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
  game: IGame[]
}

type TournamentModelType = Model<ITournament>

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
    },
  ],
  match_game: [],
  game: [
    {
      gameId: {
        type: Schema.Types.ObjectId,
        ref: Game,
      },
      count: { type: Number, default: 1 },
    },
  ],
})

export const Tournament = model<ITournament, TournamentModelType>(
  "tournament",
  TournamentSchema,
)
