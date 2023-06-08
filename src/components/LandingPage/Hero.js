import { Box, Container, Stack, Typography, Button } from "@mui/material"
import React from "react"

export function Hero() {
  return (
    <Box sx={{ bgcolor: "#e4e7eb", py: 20, pt: 10 }}>
      <Container
        maxWidth="lg"
        sx={(theme) => ({ [theme.breakpoints.down("lg")]: { pl: 6, pr: 6 } })}
      >
        <Stack
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Stack
            sx={(theme) => ({
              width: {
                xs: "100%",
                md: "50%",
              },
              pt: 32,
              pb: 32,
              justifyContent: "center",
              alignItems: "flex-start",
              [theme.breakpoints.down("md")]: {
                alignItems: "center",
                pt: 16,
                pb: 16,
              },
            })}
          >
            <Box sx={{ maxWidth: "520px", mb: 8 }}>
              <Typography
                variant="h4"
                sx={{
                  mb: { xs: 4, md: 8 },
                  fontWeight: "700",
                  letterSpacing: "-0.025em",
                  fontSize: "28px",
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                }}
              >
                Simplify Tournament Management.
              </Typography>

              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "1.75rem",
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                }}
              >
                Tourney is an easy-to-use platform for Tournament Organizers to
                create and manage tournaments while players can participate in
                various tournaments with ease.
              </Typography>
            </Box>
            <Button
              size="large"
              sx={{
                textTransform: "none",
                width: 200,
                pl: 10,
                pr: 10,
                fontSize: 16,
              }}
            >
              Get Started
            </Button>
          </Stack>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "90%",
                md: "50%",
              },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component={"img"}
              src="/images/hero.png"
              alt="Tournament management web application image"
              sx={{
                maxWidth: 600,
                width: "100%",
                objectFit: "contain",
                height: "100%",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
                borderRadius: "3px",
                mb: 5,
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
