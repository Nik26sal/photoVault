import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect("mongodb+srv://Nikhil:123yougetfree@cluster0.kz2acay.mongodb.net/photo")
        console.log(`Connect ho gaya !! ${connect.connection.host}`)
    } catch (error) {
        console.log("Connect nahi ho raha",error)
        process.exit(1);
    }
}

export default connectDb