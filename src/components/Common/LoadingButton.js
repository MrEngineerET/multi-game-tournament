import React from "react"
// eslint-disable-next-line no-unused-vars
import { Button, CircularProgress } from "@mui/material"

export const LoadingButton = React.forwardRef((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      {props.loading && (
        <CircularProgress size={20} sx={{ color: "white", mr: 5 }} />
      )}
      {props.children}
    </Button>
  )
})

LoadingButton.displayName = "LoadingButton"
LoadingButton.propTypes = Button.propTypes
