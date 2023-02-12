import { Schema, model } from "mongoose"

export interface IGame {
  name: string
  images?: string[]
  description?: string
}

const GameSchema = new Schema<IGame>({
  name: { type: String, required: true },
  images: [String],
  description: String,
})

export const Game = model<IGame>("Game", GameSchema)
