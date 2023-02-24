import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { GameCard } from "../components/Game/GameCard"
import { useLoaderData } from "react-router-dom"
import { getAllGames } from "../api/game"

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  bannerWrapper: {
    bgcolor: "background.paper",
    p: { xs: 10, sm: 20 },
    pl: 5,
    pr: 5,
  },
  banner: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 3, sm: 10 },
    justifyContent: "space-between",
  },
}

export function Game() {
  const games = useLoaderData()
  return (
    <Box sx={styles.root}>
      <Box sx={styles.bannerWrapper}>
        <Container>
          <Box sx={styles.banner}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ textAlign: { xs: "center", sm: "start" } }}
            >
              Games
            </Typography>
            <Button href="new">Add Game</Button>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          {/* <GameCard game={games[0]} /> */}
          <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {games.map((game) => {
              return <GameCard key={game._id} game={game} />
            })}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export async function loader() {
  return getAllGames()
}
