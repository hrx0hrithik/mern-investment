import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.DATABASE_URL
    if (!uri) {
      console.error(
        "MongoDB connection string not found. Set MONGO_URI in your .env file."
      )
      process.exit(1)
    }

    await mongoose.connect(uri)
    console.log("MongoDB connected")
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export default connectDB
