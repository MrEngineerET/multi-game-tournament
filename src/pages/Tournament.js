import React from "react"
import { Button, Box, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { defer } from "react-router-dom"
import { getTournaments } from "../api/tournament"

import {
  TournamentList,
  TournamentFilter,
} from "../components/Tournament/TournamentList"

const styles = {
  bannerWrapper: {
    bgcolor: "background.paper",
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
}

export function Tournament() {
  return (
    <Box>
      <Box sx={styles.bannerWrapper}>
        <Container>
          <Box sx={styles.banner}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ textAlign: { xs: "center", sm: "start" } }}
            >
              Your Tournaments
            </Typography>
            <Button href="new" fullWidth={false}>
              Create Tournament
            </Button>
          </Box>
        </Container>
      </Box>

      <Container sx={{ p: { xs: 4, sm: 8 } }}>
        <Box
          sx={{
            display: "flex",
            gap: 8,
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <TournamentList />
          <TournamentFilter sx={{ width: 400 }} />
        </Box>
      </Container>
    </Box>
  )
}

export async function loader() {
  const tournamentDataPromise = getTournaments()
  return defer({
    tournaments: tournamentDataPromise,
  })
}
