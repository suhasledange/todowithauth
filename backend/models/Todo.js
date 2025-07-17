import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false,
    }

},{timestamps:true})

const Todo = mongoose.model("todos",todoSchema)

export default Todo;