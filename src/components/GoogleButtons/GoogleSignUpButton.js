import React, { useEffect } from "react"
import { Box } from "@mui/material"

export function GoogleSignUpButton() {
  useEffect(() => {
    const scriptElement = document.createElement("script")
    scriptElement.src = "https://accounts.google.com/gsi/client"
    scriptElement.async = true
    scriptElement.defer = true
    document.body.appendChild(scriptElement)
    return () => {
      document.body.removeChild(scriptElement)
    }
  }, [])
  return (
    <Box sx={{ my: 3 }}>
      <div
        id="g_id_onload"
        data-client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        data-context="signup"
        data-ux_mode="popup"
        data-login_uri={process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL}
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signup_with"
        data-size="large"
        data-logo_alignment="center"
        data-width="250"
      ></div>
    </Box>
  )
}
