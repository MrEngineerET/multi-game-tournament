import React from "react"
import { Box, Container, Stack, Typography } from "@mui/material"
import SouthIcon from "@mui/icons-material/South"
import DoneIcon from "@mui/icons-material/Done"
import { useMediaQuery, useTheme } from "@mui/material"

export function HowItWorks() {
  const theme = useTheme()
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <Box sx={{ bgcolor: "#e5e7eb", py: 10 }}>
      <Container
        maxWidth="lg"
        sx={(theme) => ({
          p: 20,
          [theme.breakpoints.down("lg")]: { px: 6 },
        })}
      >
        <Stack
          sx={(theme) => ({
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 10,
            [theme.breakpoints.down("md")]: {
              alignItems: "center",
            },
          })}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "80%",
                md: "60%",
              },
            }}
          >
            <Box
              component={"img"}
              width={"100%"}
              height="100%"
              src={
                isLaptop
                  ? "/images/tournament_large_laptop.jpg"
                  : "/images/tournament_large.jpg"
              }
              sx={{
                objectFit: "fill",
                borderRadius: 1,
                boxShadow: 2,
              }}
            />
          </Box>
          <Box
            sx={{
              width: 0.4,
              minWidth: 400,
              maxWidth: 550,
            }}
          >
            {howToSteps.map((step, index, array) => (
              <Box
                key={step.title}
                sx={{
                  display: "flex",
                  gap: 5,
                  minHeight: 150,
                }}
              >
                <Stack>
                  <Box sx={{ height: 40, width: 40 }}>
                    <Box
                      sx={{
                        border: "0.5px solid grey",
                        width: 1,
                        height: 1,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {index !== array.length - 1 ? (
                        <SouthIcon sx={{ fill: "#393bd1" }} />
                      ) : (
                        <DoneIcon sx={{ fill: "#393bd1" }} />
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {index !== array.length - 1 && (
                      <Box
                        sx={{
                          border: "1px grey solid",
                          borderLeftWidth: 0,
                          height: 1,
                        }}
                      ></Box>
                    )}
                  </Box>
                </Stack>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, pb: 2 }}>
                    {step.title}
                  </Typography>
                  <Typography>{step.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

const howToSteps = [
  {
    title: "Step 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    title: "Step 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    title: "Step 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    title: "Step 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
]
