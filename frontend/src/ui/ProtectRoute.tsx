import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Replace with actual authentication logic
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
  )
}

export default ProtectRoute