import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"
import { Snackbar, Alert } from "@mui/material"

const alertContext = createContext(null)
export const useAlert = () => useContext(alertContext)

export function AlertProvider({ children }) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("error")
  const [anchorOrigin, setAnchorOrigin] = useState({
    vertical: "top",
    horizontal: "center",
  })
  function openAlert(message, severityType, anchorOrigin) {
    setMessage(message)
    if (severityType) setSeverity(severity)
    if (anchorOrigin) setAnchorOrigin(anchorOrigin)
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
        anchorOrigin={anchorOrigin}
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
