import mongoose from 'mongoose'

const dbConnection = async()=>{
    try {
        let con = await mongoose.connect(process.env.MONGO_URL)
        console.log(`DataBase Connected`.bgMagenta)
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection;