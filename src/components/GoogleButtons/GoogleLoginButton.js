import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/material"
import { useFetcher } from "react-router-dom"

export function GoogleLoginButton({ onSuccess, onFail, setSubmitting }) {
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.data?.token) {
      onSuccess()
      setSubmitting(false)
    }
    if (fetcher.data?.error) {
      onFail(fetcher.data.error)
      setSubmitting(false)
    }
  }, [fetcher.data])

  useEffect(() => {
    const scriptElement = document.createElement("script")
    scriptElement.src = "https://accounts.google.com/gsi/client"
    scriptElement.async = true
    scriptElement.defer = true
    document.body.appendChild(scriptElement)
    window.googleAuthCallback = googleAuthCallback
    return () => {
      document.body.removeChild(scriptElement)
    }
  }, [])

  function googleAuthCallback(res) {
    setSubmitting(true)
    fetcher.submit(
      { ...res, intent: "googleSignIn" },
      {
        method: "POST",
      },
    )
  }

  return (
    <Box sx={{ my: 3 }}>
      <div
        id="g_id_onload"
        data-client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="googleAuthCallback"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="center"
        data-width="250"
      ></div>
    </Box>
  )
}

GoogleLoginButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
}
