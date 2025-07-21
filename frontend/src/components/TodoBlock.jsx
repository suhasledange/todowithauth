import React, { useState } from 'react'
import axios from "../services/axios"
const TodoBlock = ({todos,loading,setLoading,fetchTodos}) => {

  const [title,setTitle] = useState("")
  const [adding,setAdding] = useState(false)

  const [editingId, setEditingId] = useState(null); // which todo is being edited
  const [editTitle, setEditTitle] = useState(""); // value of the editing input

  const handleCreate = async(e)=>{
    e.preventDefault();  
    if(!title.trim()) return;

      try {
        setAdding(true)
          const res = await axios.post("/todo/createTodo",{title});
          if(res){
              fetchTodos();
              setTitle("")
          }

      } catch (error) {
        console.error("Error creating todos",error)
      }finally{
        setAdding(false)
      }
  }

    const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleUpdate = async(id)=>{
        if(!editTitle.trim()) return;

        try {
          const res = await axios.put(`/todo/updateTodo/${id}`,{title:editTitle})
          if(res) fetchTodos()
          cancelEdit()
        } catch (error) {
          console.error("Error updating todo", error);
        }
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

     <div className='bg-gray-300 px-3 py-1 flex items-center justify-center'>
          {loading ? (
            <p>Loading Todos...</p>
          ) : todos.length === 0 ? (
            <p>No Todos found. Add one above</p>
          ) : (
            <ul>
              {todos.map(todo => (
                <li key={todo._id} className='flex mb-3 justify-between items-center gap-3 text-black'>
                  {editingId === todo._id ? (
                    <>
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 p-1 bg-transparent border-b-2 border-gray-600 rounded"
                      />
                      <button
                        className='bg-green-500 cursor-pointer text-white px-3 py-1 rounded'
                        onClick={() => handleUpdate(todo._id)}
                      >
                        Save
                      </button>
                      <button
                        className='bg-gray-400 cursor-pointer text-white px-3 py-1 rounded'
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        value={todo.title}
                        readOnly
                        className="flex-1 p-1 border-none bg-transparent rounded"
                      />
                      <button
                        className='bg-blue-500 cursor-pointer text-white px-4 py-1 rounded'
                        onClick={() => startEditing(todo)}
                      >
                        Update
                      </button>
                      <button
                        className='bg-red-500 cursor-pointer text-white px-4 py-1 rounded'
                        onClick={() => handleDelete(todo._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
    </div>
  )
}

export default TodoBlock
