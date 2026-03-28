import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/Dashboard'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes