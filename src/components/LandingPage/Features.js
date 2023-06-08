import { Box, Typography, Container, Stack } from "@mui/material"
import ElectricBoltTwoToneIcon from "@mui/icons-material/ElectricBoltTwoTone"
import React from "react"

export function Features() {
  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={(theme) => ({
          p: 20,
          [theme.breakpoints.down("lg")]: { px: 6 },
          [theme.breakpoints.down("md")]: { py: 15 },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
            mb: 8,
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", maxWidth: 600, fontWeight: 700 }}
          >
            The easiest way to create and organize your tournaments.
          </Typography>
          <Typography variant="body1" fontSize={18} align="center">
            Tourney has all the tools you need for an organized, successful
            tournament.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: {
              xs: 2,
              lg: 5,
            },
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {features.map((feature) => (
            <Box
              key={feature.title}
              sx={{
                width: {
                  xs: "100%",
                  sm: "80%",
                  md: "45%",
                  lg: "45%",
                },
                gap: 5,
                p: 2,
                pb: 5,
                mb: 5,
              }}
            >
              <Stack flexDirection="row" gap={5}>
                <Box>
                  <Box
                    sx={{
                      bgcolor: "#e0e7ff",
                      borderRadius: "50%",
                      p: 2,
                      mt: 2,
                    }}
                  >
                    <ElectricBoltTwoToneIcon
                      sx={{
                        fill: "#393bd1",
                        fontSize: 30,
                      }}
                    />
                  </Box>
                </Box>
                <Stack gap={4}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    {feature.description}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

const features = [
  {
    title:
      "Powerful Tournament Management Made Effortless: Create, Customize, Control!",
    description:
      "Effortlessly create and customize tournaments for various games. Stay in control as you manage registrations, teams, and scores. Streamline your operations and deliver a seamless tournament experience.",
  },
  {
    title: "Seamless Tournament Experience: Connect, Compete, Conquer!",
    description:
      "Enjoy a user-friendly interface that lets you browse, filter, and sign up for tournaments with ease. Connect with teams, get updates, and dive into the excitement of competitive gaming.",
  },
  {
    title: "Immersive Design for Unforgettable Gaming Experiences",
    description:
      "Experience our visually appealing and intuitive web app design. Stay focused on the thrill of the competition with a thoughtfully crafted interface.",
  },
  {
    title: "Multi-Game Mayhem: Unleash Dynamic Tournaments!",
    description:
      "Experience the thrill of multi-game tournaments like never before. Create, organize, and compete across a variety of games. Seamlessly manage registrations, teams, and scores. Unleash the ultimate multi-game mayhem!",
  },
]
