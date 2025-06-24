import mongoose from 'mongoose'

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
  } catch (error) {
    console.error(`Database connection terminated!`)
    process.exit(1)
  }
}
