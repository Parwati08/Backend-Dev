import mongoose from "mongoose";
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.mongouri);
        console.log("conection done ")
    } catch (error) {
        console.log("Connection Failed",error);
    }
}
export default connectDb;
