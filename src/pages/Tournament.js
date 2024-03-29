import React, { useState } from "react"
import { Button, Box, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { defer } from "react-router-dom"
import { getTournaments } from "../api/tournament"

import { TournamentList } from "../components/TournamentPage/TournamentList"
import { TournamentFilter } from "../components/TournamentPage/TournamentFilter"

const styles = {
  bannerWrapper: (theme) => ({
    px: { xs: 5, sm: 10, md: 20 },
    py: { xs: 10, sm: 25, md: 30 },
    background: theme.palette.background.cucumberWater,
  }),
  banner: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  yourTournament: {
    textAlign: { xs: "center", sm: "start" },
  },
}

export function Tournament() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  function handleFilterChange(filterOption) {
    setSelectedFilter(filterOption)
  }
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

      <Container sx={{ pt: { xs: 4, sm: 10 }, p: 4 }}>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 4, md: 8 },
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <Box sx={{ flex: 10 }}>
            <TournamentList filter={selectedFilter} />
          </Box>
          <Box sx={{ flex: 3, maxWidth: { xs: "unset", md: 300 } }}>
            <TournamentFilter
              selectedFilter={selectedFilter}
              onChange={handleFilterChange}
            />
          </Box>
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
