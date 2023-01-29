import React from "react"
import { Button, Box, Typography, Container, Stack } from "@mui/material"

export const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md">
        <Stack
          sx={{
            gap: 5,
            mt: 10,
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Simplify Tournament Management</Typography>
          <Button href="tournament">Tournament</Button>
          <Button href="tournament/example-one">Example</Button>
          <Button href="tournament/example-completed">
            Example (completed)
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
