import React from "react"
import PropTypes from "prop-types"
import { DialogTitle as MuiDialogTitle, IconButton } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

export function CustomDialogTitle(props) {
  const { children, onClose, ...others } = props

  return (
    <MuiDialogTitle {...others}>
      {children}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 4,
          top: 4,
        }}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  )
}

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
}
