import React from "react"
import { Button, Box, Typography, Container, Stack } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { AppHeaderBar } from "../components/AppHeaderBar"

export const LandingPage = () => {
  const { user } = useAuth()

  if (!user)
    return (
      <>
        <AppHeaderBar />
        <div
          style={{
            fontSize: "40px",
            marginLeft: "40px",
            marginTop: "40px",
          }}
        >
          This is the landing page for loggedout user
        </div>
      </>
    )

  return (
    <>
      <AppHeaderBar />
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
            <Button href="game">Game</Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
