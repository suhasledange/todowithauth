import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }


},{timestamps:true});

const User = mongoose.model("users",userSchema)

export default User;