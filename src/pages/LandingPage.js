import React from "react"
import { Button, Box, Typography, Container, Stack } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { AppHeaderBar } from "../components/AppHeaderBar"
import { Hero } from "../components/LandingPage/Hero"
import { Features } from "../components/LandingPage/Features"
import { HowItWorks } from "../components/LandingPage/HowItWorks"
// import { Pricing } from "../components/LandingPage/Pricing"
import { AreYouReady } from "../components/LandingPage/AreYourReady"
import { Footer } from "../components/LandingPage/Footer"

export const LandingPage = () => {
  const { user } = useAuth()

  if (!user)
    return (
      <>
        <AppHeaderBar />
        <Hero />
        <Features />
        <HowItWorks />
        {/* <Pricing /> */}
        <AreYouReady />
        <Footer />
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
