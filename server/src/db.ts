import mongoose from "mongoose"

const PORT = process.env.PORT || 9090
async function openMongooseConnection(DB_URI = null): Promise<void> {
  const URI = process.env.DB_URI
  if (DB_URI) {
    await mongoose.connect(DB_URI)
  } else if (URI) {
    await mongoose.connect(URI)
  } else {
    throw new Error("No DB_URI found in process.env")
  }
  console.log("Mongoose connection opened successfully")
}

async function closeMongooseConnection(): Promise<void> {
  await mongoose.connection.close()
  console.log("Mongoose connection closed successfully")
}

export { openMongooseConnection, closeMongooseConnection, mongoose, PORT }
