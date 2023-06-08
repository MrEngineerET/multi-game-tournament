import React from "react"
import { Box, Container, Stack } from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

export function AreYouReady() {
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box sx={{ py: { xs: 15, md: 25 } }}>
      <Container>
        <Grid
          container
          direction={matchesSM ? "column-reverse" : "row"}
          sx={{
            px: 4,
            py: { xs: 10, sm: 15, md: 4 },
          }}
        >
          <Grid item xs={12} md={6} p={5}>
            <Stack sx={{ textAlign: "center", gap: 3, alignItems: "center" }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                align="center"
              >
                Ready to Organize Your Tournament?
              </Typography>
              <Typography variant="h6" component="p">
                Get started with our easy-to-use web application and take your
                tournament management to the next level.
              </Typography>
              <Button
                sx={{ mt: 10, width: "350px" }}
                variant="contained"
                color="primary"
                size="large"
              >
                Get Started
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} p={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                component={"img"}
                src="/images/are_you_ready_two.jpg"
                alt="Tournament"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: "5px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
