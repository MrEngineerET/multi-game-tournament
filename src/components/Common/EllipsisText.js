import React from "react"
import PropTypes from "prop-types"
import { Typography } from "@mui/material"

export function EllipsisText({ children, sx, ...rest }) {
  return (
    <Typography
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  )
}

EllipsisText.propTypes = {
  children: PropTypes.string.isRequired,
  sx: PropTypes.object,
}
