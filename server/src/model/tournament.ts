import { Schema, Model, model } from "mongoose"
import { InputStage } from "brackets-model"

export const tournamentStageType = {
  singleElimination: "single_elimination",
  doubleElimination: "double_elimination",
  roundRobin: "round_robin",
}
interface ITournament {
  name: string
  participant: [object]
  stage: [object]
  group: [object]
  round: [object]
  match: [object]
  match_game: [object]
}

interface ITournamentMethods {
  update(): boolean
  delete(): boolean
  insert(): boolean
  select(): boolean
}

// eslint-disable-next-line @typescript-eslint/ban-types
interface TournamentModel extends Model<ITournament, {}, ITournamentMethods> {
  createTournament(stage: InputStage): Promise<boolean>
}

const TournamentSchema = new Schema<
  ITournament,
  TournamentModel,
  ITournamentMethods
>({
  name: { type: String, required: true },
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
})

TournamentSchema.methods.update = function () {
  return true
}
TournamentSchema.methods.delete = function () {
  return true
}
TournamentSchema.methods.select = function () {
  return true
}

TournamentSchema.statics.createTournament = async function (stage: InputStage) {
  console.log("stage===== >>>>>>", stage)
  return true
}

export const Tournament = model<ITournament, TournamentModel>(
  "tournament",
  TournamentSchema,
)
