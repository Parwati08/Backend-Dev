import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:[25,"Name must be at least 25 characters"]
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minLength:[8,"Password must be at least 8 characters"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }



})

const user= mongoose.model("user",userSchema);

export default user;