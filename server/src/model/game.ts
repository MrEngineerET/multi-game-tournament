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

gameSchema.post("findOne", function (doc, next) {
  doc.images = doc.images?.map((img) => getFullImageUrl(img))
  next()
})
gameSchema.post("find", function (docs, next) {
  docs.forEach((doc) => {
    doc.images = doc.images?.map((img) => getFullImageUrl(img))
  })
  next()
})

function getFullImageUrl(url: string) {
  return `${process.env.SERVER_URL}/imgs/uploads/games/${url}`
}

export const Game = model<IGame>("Game", gameSchema)
