import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import TodoBlock from "../components/TodoBlock"
import axios from '../services/axios'
const Dashboard = () => {

    const [loading,setLoading] = useState(true);
    const [todos,setTodos] = useState([])

    const fetchTodos = async ()=>{
        try {
            const res = await axios.get("/todo/getTodos")
            if(res) setTodos(res.data.todos)
        } catch (error) {
            console.error("Error fetching todos",error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchTodos()
    },[])

  return (
    <div className="flex gap-5 bg-gray-500 h-full p-2">
        <div className="">
            <Sidebar/>
        </div>
        <div>
            <TodoBlock todos={todos} loading={loading} setLoading={setLoading} fetchTodos={fetchTodos}/>
        </div>
    </div>
  )
}

export default Dashboard
