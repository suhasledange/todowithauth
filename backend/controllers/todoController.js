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

export const getTodos = async (req,res)=>{

    try {
        
        const todos = await Todo.find({userId:req.user._id});
       res.status(200).json({
            success:true,
            todos
        })

    } catch (error) {
        console.error("Failed to get todos",error)
       res.status(500).json({
            success:false,
            message:"An internal server error occured"
        })
    }

}

export const updateTodo = async (req,res)=>{

    const {id} = req.params;
    const {title,completed} = req.body;
    
    try {
        const todo = await Todo.findOneAndUpdate(
            {_id:id,userId:req.user._id},
            {
             title,
             completed
            },
            {
                new:true
            }
        )
        if(!todo){
             res.status(404).json({
                status:false,
                message:"Todo not found"
            })
        }
       res.status(200).json({
            success:true,
            message:"Todo updated successfully"
        })
        
    } catch (error) {
         console.error("Failed to update todo",error)
        res.status(500).json({
            success:false,
            message:"An internal server error occured"
        })
    }
}

export const deleteTodo = async (req,res)=>{

    const {id} = req.params

    try {
        
        const todo = await Todo.findOneAndDelete(
            {_id:id,userId:req.user._id}
        )

        if(!todo){
            res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }
       res.status(200).json({
            success:true,
            message:"Todo Deleted successfully"
        })

    } catch (error) {
          console.error("Failed to delete todo",error)
        res.status(500).json({
            success:false,
            message:"An internal server error occured"
        })
    }

}
