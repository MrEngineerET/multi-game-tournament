import React from "react"
import PropTypes from "prop-types"
import { Button, CircularProgress } from "@mui/material"

export const LoadingButton = React.forwardRef((props, ref) => {
  const loading = !!props.loading ?? false
  return (
    <Button {...props} ref={ref} disabled={loading || props.disabled}>
      {loading && <CircularProgress size={20} sx={{ mr: 5 }} />}
      {props.children}
    </Button>
  )
})

LoadingButton.displayName = "LoadingButton"
LoadingButton.propTypes = {
  ...Button.propTypes,
  loading: PropTypes.bool.isRequired,
}
