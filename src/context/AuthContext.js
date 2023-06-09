import React, { useState, createContext, useContext, useEffect } from "react"
import { CircularProgress, Box } from "@mui/material"
import PropTypes from "prop-types"
import { auth } from "../utils/auth"

export const authContext = createContext(null)

export const useAuth = () => useContext(authContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    getIdentity()
  }, [])

  const login = async (email, password) => {
    const user = await auth.login(email, password)
    setUser(user)
  }
  const logout = async () => {
    await auth.logout()
    setUser(null)
  }
  const getIdentity = async () => {
    setUser(undefined)
    try {
      const user = await auth.getIdentity()
      setUser(user)
    } catch (error) {
      setUser(null)
    }
  }

  const value = { user, login, logout, getIdentity }

  if (user === undefined)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    )
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
