import { Schema, model, Model, Types, HydratedDocument } from "mongoose"
import {
  Group,
  Match as M,
  Round,
  MatchGame,
  Stage,
  Participant,
  Status,
} from "brackets-model"
import { Game } from "./game"

export declare type CustomParticipant = Participant & {
  userId?: Types.ObjectId
  invitation?: "accepted" | "pending" | "declined"
}
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
export enum TournamentStatus {
  pending = "pending",
  progress = "progress",
  completed = "completed",
  archived = "archived",
}

export interface ITournament {
  _id: number
  name: string
  description: string
  participant: CustomParticipant[]
  stage: Stage[]
  group: Group[]
  round: Round[]
  match: Match[]
  match_game: MatchGame[]
  game: Game[]
  participantGameMatrix: { participantId: number; games: Game[] }[]
  status: TournamentStatus
  createdBy: Types.ObjectId
  progress: number
}

type TournamentDocumentOverrides = {
  stage: Types.DocumentArray<Stage>
  group: Types.DocumentArray<Group>
  round: Types.DocumentArray<Round>
  participant: Types.DocumentArray<CustomParticipant>
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

const TournamentSchema = new Schema<ITournament, TournamentModelType>(
  {
    _id: Number,
    name: { type: String, required: true },
    description: String,
    participant: [
      {
        id: Number, // id used by the bracket manager
        tournament_id: Number,
        name: { type: String, required: true },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        invitation: {
          type: String,
          enum: ["accepted", "pending", "declined"],
        },
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
          type: Object,
          default: null,
          id: Number,
          position: Number,
          score: Number,
          result: { type: String, enum: ["win", "loss"] },
        },
        opponent2: {
          type: Object,
          default: null,
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
    status: { type: String, default: TournamentStatus.pending },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

TournamentSchema.virtual("progress").get(function () {
  if (this.status === TournamentStatus.completed) return 100
  const matches = this.match
  const completedMatchLength = matches.filter(
    (match) =>
      match.status === Status.Completed || match.status === Status.Archived,
  ).length
  return (completedMatchLength / matches.length) * 100
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
