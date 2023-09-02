import React from "react"
import PropTypes from "prop-types"
import { useRouteError, useAsyncError } from "react-router-dom"
import { Typography } from "@mui/material"
import { Container, Button } from "@mui/material/"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

export function ErrorPage({ onRetry }) {
  if (onRetry === undefined) onRetry = () => window.location.reload()
  let error = useRouteError()
  const asyncError = useAsyncError()
  if (!error) error = asyncError
  let errorMessage = error?.response?.data.message // error from axios
  console.log("error", error)
  if (error?.statusText === "Not Found") errorMessage = "Page not found"

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 20,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 100,
          color: "error.main",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          marginTop: 2,
          marginBottom: 1,
          textAlign: "center",
        }}
      >
        Oops! Something went wrong.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        {errorMessage || "Something went wrong"}
      </Typography>
      <Button variant="contained" color="primary" onClick={onRetry}>
        Try Again
      </Button>
    </Container>
  )
}

ErrorPage.propTypes = {
  onRetry: PropTypes.func,
}
