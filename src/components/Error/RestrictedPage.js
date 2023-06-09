import React from "react"
import { Box, Typography } from "@mui/material"

export function RestrictedPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Restricted Page
        </Typography>
        <Typography variant="body1">
          Sorry, but you {"don't"} have access to this page.
        </Typography>
      </Box>
    </Box>
  )
}
