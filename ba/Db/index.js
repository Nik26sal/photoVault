import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        console.log(process.env.MONGO_URL)
        const connect = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`Database connected Successfully !! ${connect.connection.host}`)
    } catch (error) {
        console.log("Something went wrong during making connections",error)
        process.exit(1);
    }
}

export default connectDb;