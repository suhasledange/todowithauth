import Todo from "../models/Todo.js"


export const createTodo = async (req,res)=>{

    const {title} = req.body

    try {

        const newTodo = await Todo.create({
            userId:req.user._id,
            title
        })

        res.status(201).json({
            success:true,
            message:"Todo Created Successfully",
            todo:newTodo
        })
        
    } catch (error) {
        console.error("error creating todo",error)
        res.status(500).json({
            success:false,
            message:"Failed to create todo"
        })
    }

}