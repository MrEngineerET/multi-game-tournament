import React from "react"
import { Button, Box } from "@mui/material"

export function Tournament() {
  return (
    <Box>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button href="new">Create Tournament</Button>
      </Box>
    </Box>
  )
}
