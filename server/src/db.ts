import mongoose from "mongoose"

const PORT = process.env.PORT || 9090
async function openMongooseConnection(DB_URI = null): Promise<void> {
  await mongoose.connect(DB_URI || process.env.DB_URI)
  console.log("Mongoose connection opened successfully")
}

async function closeMongooseConnection(): Promise<void> {
  await mongoose.connection.close()
  console.log("Mongoose connection closed successfully")
}

export { openMongooseConnection, closeMongooseConnection, mongoose, PORT }
