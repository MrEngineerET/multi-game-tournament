import React, { useState, createContext, useContext } from "react"
import PropTypes from "prop-types"
import { auth } from "../utils/auth"

export const authContext = createContext(null)

export const useAuth = () => useContext(authContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // const [user, setUser] = useState({ firstName: "Biruk" })

  const signin = async (newUser) => {
    const user = await auth.signin(newUser)
    setUser(user)
  }
  const signout = async () => {
    await auth.signout()
    setUser(null)
  }

  const value = { user, signin, signout }
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
