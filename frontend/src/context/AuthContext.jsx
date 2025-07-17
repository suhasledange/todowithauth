import { createContext, useContext, useEffect, useState } from "react"
import axios from '../services/axios'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const checkAuth = async () =>{
        try {
            const res = await axios.get("/auth/checkAuth")
            setUser(res.data.user)
        } catch (error) {
            setUser(null)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        checkAuth();
    },[])

  return (
    <AuthContext.Provider value={
        {
            user,setUser,checkAuth
        }
    }>
            {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)
