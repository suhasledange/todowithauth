import axios from "../services/axios"
import { useAuth } from '../context/AuthContext'
const Sidebar = () => {
    
    const {setUser} = useAuth()

  const handleLogout  = async()=>{

        try {
            
            const res = await axios.get("/auth/logout")
            if(res.data.success) setUser(null)

        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className='flex flex-col items-start justify-start gap-4 p-2 px-4 border-r-2 border-gray-300'>
        <h1 className='text-xl'>Todo</h1>
      <button className=' cursor-pointer px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 duration-200' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Sidebar
