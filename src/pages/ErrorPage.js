import React from "react"
import { useRouteError } from "react-router-dom"
import { Box, Typography } from "@mui/material"

export function ErrorPage() {
  const error = useRouteError()
  let errorMessage = error?.response?.data.message
  console.log("error", error)
  if (error.statusText === "Not Found") errorMessage = "Page not found"

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <i>{errorMessage || error?.message || "Something went wrong"}</i>
      </Typography>
    </Box>
  )
}
