import { Schema, model, Types } from "mongoose"

interface IGame {
  _id: Types.ObjectId
  name: string
  images?: string[]
  description?: string
}

const GameSchema = new Schema<IGame>(
  {
    name: { type: String, required: true },
    images: [String],
    description: String,
  },
  { timestamps: true },
)

export const Game = model<IGame>("Game", GameSchema)
