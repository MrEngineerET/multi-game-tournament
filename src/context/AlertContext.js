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
    if (anchorOrigin) setAnchorOrigin(anchorOrigin)
    if (severityType) setSeverity(severityType)
    setMessage(message)
    setOpenSnackbar(true)
  }
  const values = {
    showSuccess: (message, anchorOrigin) =>
      openAlert(message, "success", anchorOrigin),
    showError: (message, anchorOrigin) =>
      openAlert(message, "error", anchorOrigin),
    showInfo: (message, anchorOrigin) =>
      openAlert(message, "info", anchorOrigin),
    showWarning: (message, anchorOrigin) =>
      openAlert(message, "warning", anchorOrigin),
  }
  return (
    <alertContext.Provider value={values}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false)
          setAnchorOrigin({ vertical: "top", horizontal: "center" })
        }}
        anchorOrigin={
          anchorOrigin ?? {
            vertical: "top",
            horizontal: "center",
          }
        }
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
