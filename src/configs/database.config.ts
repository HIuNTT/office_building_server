import mongoose from 'mongoose'

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URL!)
    console.log('Database connected successfully')
  } catch (error) {
    console.log('Error connecting to the database: ', error)
  }
}
