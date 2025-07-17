import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../services/axios'
const Login = () => {
    
    const [formData ,setFormData] = useState({email:"",password:""});
    const navigate = useNavigate();
    const {setUser} = useAuth();
    const handleSubmit = async (e)=>{
        e.preventDefault();
       
        try {
            const res = await axios.post("/auth/login",formData);
            setUser(res)
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
            alert("Login Failed")
        }
    }

    return (
    <form onSubmit={handleSubmit} className='space-y-4' >
        <input
            autoComplete='email'
            type='email'
            placeholder='Enter your email'
            className='w-full p-2 border'
            value={formData.email}
            name="email"
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
        />
          <input
            autoComplete='current-password'
            type='password'
            placeholder='Enter your Password'
            className='w-full p-2 border'
            value={formData.password}
            name="password"
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
        />
        <button
            type='submit'
            className='cursor-pointer bg-blue-600 text-white 2-full p-2'
        >Login</button>
      
    </form>
  )
}

export default Login
