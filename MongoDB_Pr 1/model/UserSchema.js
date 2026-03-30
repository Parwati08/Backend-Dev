import mongoose from "mongoose";

 export const userSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:[25,"name must coontain 26 char only"]
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        reqiure:true,
        minlength:[8,"password must contain 8 char only"],

    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

const user=mongoose.model("User", userSchema)
