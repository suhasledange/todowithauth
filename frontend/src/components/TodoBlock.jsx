import React, { useState } from 'react'
import axios from "../services/axios"
const TodoBlock = ({todos,loading,setLoading,fetchTodos}) => {

  const [title,setTitle] = useState("")
  const [adding,setAdding] = useState(false)

  const handleCreate = async(e)=>{
    e.preventDefault();  
    if(!title.trim()) return;

      try {
          const res = await axios.post("/todo/createTodo",{title});
          if(res){
              fetchTodos();
              setTitle("")
          }

      } catch (error) {
        console.error("Error creating todos",error)
      }
  }

  const handleUpdate = async(id)=>{
        
  }

  const handleDelete = async (id) =>{

    if(!confirm("Do You want to delete")) return

    try {
      await axios.delete(`/todo/deleteTodo/${id}`)
      fetchTodos()
    } catch (error) {
      console.error("Error deleting todo",error)
    }
  }


  return (
   <div className='flex flex-col items-start justify-start gap-4 p-2'>
        <h1 className='text-xl font-bold'>Todo Block</h1>
        <div className='max-w-xl mx-auto'>
          <h2 className='font-semibold mb-4'>Your Todos</h2>

          <form onSubmit={handleCreate} className='flex gap-2 mb-4'>
            <input
                type='text'
                placeholder='Enter a new todo...'
                className='flex-1 p-1 border border-gray-200 rounded'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />
            <button
              type='submit'
              className='bg-blue-500 px-3 text-sm py-1 rounded-md'
            > {adding ? "creating..." : "create"} </button>
          </form>

      <div>
        {
          loading ? (
            <p>Loading Todos...</p>
          ) : todos.length === 0 ? (
            <p>No Todos found. Add one above</p>
          ) : (
            <ul>
                {
                  todos.map(todo => (
                      <li key={todo._id}
                          className='flex mb-3 justify-between items-center'
                      >
                        <span>{todo.title}</span>
                        
                        <div className='flex items-center justify-center gap-3'>
                          <button className='bg-blue-500 px-4 py-1 cursor-pointer' onClick={()=>handleUpdate(todo._id)}>update</button>
                        <button className='bg-red-500 px-4 py-1 cursor-pointer' onClick={()=>handleDelete(todo._id)}>delete</button>
                        </div>
                      
                      </li>
                  ))
                }
            </ul>
          )
        }

      </div>

        </div>
    </div>
  )
}

export default TodoBlock
