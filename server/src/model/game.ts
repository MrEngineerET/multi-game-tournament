import { Schema, model, Types } from "mongoose"

interface IGame {
  _id: Types.ObjectId
  name: string
  images?: string[]
  description?: string
  createdBy: Types.ObjectId
  active: boolean
}

const gameSchema = new Schema<IGame>(
  {
    name: { type: String, required: true },
    images: [String],
    description: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const Game = model<IGame>("Game", gameSchema)
