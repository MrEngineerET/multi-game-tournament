import React from "react"
import { LoggedInAppBar } from "./LoggedInAppHeader"
import { LoggedOutAppBar } from "./LoggedOutAppHeader"
import { useAuth } from "../context/AuthContext"

export const AppHeaderBar = () => {
  const { user } = useAuth()
  return user ? <LoggedInAppBar /> : <LoggedOutAppBar />
}
