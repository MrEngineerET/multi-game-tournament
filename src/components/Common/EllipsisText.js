import React from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/system"

export function EllipsisText({ text }) {
  return (
    <Box
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </Box>
  )
}

EllipsisText.propTypes = {
  text: PropTypes.string.isRequired,
}
