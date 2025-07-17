import React from 'react'
import { useAuth } from '../context/AuthContext'

const AppLayout = ({children}) => {

    const {user} = useAuth()

  return (
     <div className="min-h-screen bg-gray-700 text-white p-4">
      <header className="mb-6">
        <h1 className="text-xl font-bold">Welcome, {user?.fullName}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default AppLayout
