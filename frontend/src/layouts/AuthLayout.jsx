import React from 'react'

const AuthLayout = ({children}) => {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-700 text-white">
      <div className="bg-white p-8 rounded shadow-md w-[400px]">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
