import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
function App() {
        
  return (
    <Routes>
      <Route
          path="/"
          element={
              <ProtectedRoute type="guest">
              <AuthLayout>
                <Login/>
              </AuthLayout>
              </ProtectedRoute>
          }
      />
        <Route
          path="/signup"
          element={
              <ProtectedRoute type="guest">
              <AuthLayout>
                <Signup/>
              </AuthLayout>
              </ProtectedRoute>
          }
      />
       <Route
          path="/dashboard"
          element={
            <ProtectedRoute type="protected">
              <AppLayout>
                <Dashboard/>
              </AppLayout>
            </ProtectedRoute>
          }
      />
    </Routes>
  )
}

export default App
