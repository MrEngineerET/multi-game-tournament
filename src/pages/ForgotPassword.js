import React, { useState, useEffect } from "react"
import { Container, TextField, Button, Typography } from "@mui/material"
import { Box, Alert } from "@mui/material"
import { useFetcher } from "react-router-dom"
import { auth } from "../utils/auth"
import { useAlert } from "../context/AlertContext"

export const ForgotPassword = () => {
  const fetcher = useFetcher()
  const alert = useAlert()
  const [disabled, setDisabled] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  useEffect(() => {
    if (fetcher.state === "submitting") {
      setDisabled(true)
    }
    if (fetcher.data?.status === "success") {
      setDisabled(true)
      setShowSuccessMessage(true)
    }
    if (fetcher.data?.status === "error") {
      alert.showError(fetcher.data?.message)
      setDisabled(false)
    }
  }, [fetcher.data, fetcher.state])

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 30 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <fetcher.Form method="post">
          <Box sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ mb: 2 }}
              disabled={disabled}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={disabled}
            >
              Send Reset Link
            </Button>
          </Box>
        </fetcher.Form>
        <Box sx={{ mt: 3 }}>
          {showSuccessMessage && (
            <Alert severity="success">Reset link sent to your email</Alert>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export async function action({ request }) {
  try {
    const formData = await request.formData()
    const email = formData.get("email")
    await auth.resetPassword(email)
    return { status: "success", message: "Reset link sent to your email" }
  } catch (error) {
    if (error.response?.data?.message) {
      return { status: "error", message: error.response.data.message }
    }
    throw error
  }
}
