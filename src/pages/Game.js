import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { GameCard, GameCardSkeleton } from "../components/Game/GameCard"
import { useLoaderData, defer, Await } from "react-router-dom"
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
  banner: (theme) => ({
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "250px",
      margin: "0 auto",
    },
    gap: { xs: 3, sm: 10 },
    justifyContent: "space-between",
  }),
}

export function Game() {
  const { games } = useLoaderData()
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
      <Container
        sx={{
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <React.Suspense
          fallback={new Array(3).fill(0).map((el, i) => (
            <GameCardSkeleton key={i} />
          ))}
        >
          <Await resolve={games}>
            {(games) =>
              games.map((game) => (
                <Box
                  sx={{
                    width: 280,
                    transition: "box-shadow 0.3s ease-in-out",
                    ":hover": {
                      boxShadow: 3,
                    },
                  }}
                  key={game._id}
                >
                  <GameCard game={game} />
                </Box>
              ))
            }
          </Await>
        </React.Suspense>
      </Container>
    </Box>
  )
}

export async function loader() {
  const gamesPromise = getAllGames()
  return defer({ games: gamesPromise })
}

//TODO: move all the styling to sxStyles
