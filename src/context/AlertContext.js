import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"
import { Snackbar, Alert } from "@mui/material"

const alertContext = createContext(null)
export const useAlert = () => useContext(alertContext)

export function AlertProvider({ children }) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("error")
  function openAlert(message, severityType) {
    setMessage(message)
    if (severityType) setSeverity(severity)
    setOpenSnackbar(true)
  }
  return (
    <alertContext.Provider value={openAlert}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false)
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      {children}
    </alertContext.Provider>
  )
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
