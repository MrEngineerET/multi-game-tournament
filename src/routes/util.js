import React from "react"
import PropTypes from "prop-types"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to={"/"} replace={true} />
  return <>{children}</>
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export const RestrictedRoute = ({ children, role }) => {
  const { user } = useAuth()
  if (user.role !== role) return <div>This is a restricted page</div>
  return <>{children}</>
}
RestrictedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
}
