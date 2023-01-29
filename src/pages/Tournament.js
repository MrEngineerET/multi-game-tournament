import React from "react"
import { Button, Box, Typography } from "@mui/material"
import { Container } from "@mui/system"

const styles = {
  root: {},
  bannerWrapper: {
    background: "linear-gradient(to right, #414345, #232526)",
    p: 20,
    pl: 5,
    pr: 5,
  },
  banner: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 10,
    justifyContent: "space-between",
  },
  yourTournament: {
    textAlign: { xs: "center", sm: "start" },
  },
  content: {
    pt: 5,
  },
}

export function Tournament() {
  return (
    <Box
      sx={{
        ...styles.root,
      }}
    >
      <Box sx={styles.bannerWrapper}>
        <Container sx={styles.banner}>
          <Typography
            variant="h3"
            component="h1"
            color="whitesmoke"
            sx={styles.yourTournament}
          >
            Your Tournaments
          </Typography>
          <Button href="new" fullWidth={false}>
            Create Tournament
          </Button>
        </Container>
      </Box>
      <Box sx={styles.content}>
        <Container>
          <Typography>No result were found</Typography>
        </Container>
      </Box>
    </Box>
  )
}
