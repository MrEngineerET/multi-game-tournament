import React, { useState } from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { Tabs, Tab } from "@mui/material"
import { GameCard, GameCardSkeleton } from "../components/Game/GameCard"
import { useLoaderData, defer, Await } from "react-router-dom"
import { deleteGame } from "../api/game"
import { getAllGames } from "../api/game"
import { GameDeleteDialog } from "../components/Game/GameDeleteDialog"

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
  tabs: { maxWidth: 500, margin: "auto", minHeight: 35 },
  tab: (theme) => ({
    "&.Mui-selected": {
      bgcolor: "background.paper",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      flex: 1,
      fontSize: 12,
      minHeight: 35,
    },
  }),
}

export function Game() {
  const [tabValue, setTabValue] = useState(0)
  const { games } = useLoaderData()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState({
    status: false,
    gameId: null,
  })
  const openDeleteDialog = (gameId) => {
    setDeleteDialogOpen({ status: true, gameId })
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
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
      <Container>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
          <Tabs sx={styles.tabs} value={tabValue} onChange={handleTabChange}>
            <Tab sx={styles.tab} label="All Game" />
            <Tab sx={styles.tab} label="Active" />
            <Tab sx={styles.tab} label="Inactive" />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <React.Suspense
            fallback={new Array(9).fill(0).map((el, i) => (
              <GameCardSkeleton key={i} />
            ))}
          >
            <Await resolve={games}>
              {(games) => {
                const activeGames = games.filter((game) => game.active)
                const inactiveGames = games.filter((game) => !game.active)
                const gamesToBeShown =
                  tabValue === 0
                    ? [...activeGames, ...inactiveGames]
                    : tabValue === 1
                    ? activeGames
                    : inactiveGames
                return gamesToBeShown.map((game) => (
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
                    <GameCard game={game} openDeleteDialog={openDeleteDialog} />
                  </Box>
                ))
              }}
            </Await>
          </React.Suspense>
        </Box>
      </Container>
      <GameDeleteDialog
        gameId={deleteDialogOpen.gameId}
        isOpen={deleteDialogOpen.status}
        onClose={() => {
          setDeleteDialogOpen({ status: false, gameId: null })
        }}
      />
    </Box>
  )
}

export async function loader() {
  const gamesPromise = getAllGames()
  return defer({ games: gamesPromise })
}

export async function action({ request }) {
  try {
    const url = new URL(request.url)
    const gameId = url.searchParams.get("gameId")
    const deleteCompletely = toBoolean(url.searchParams.get("deleteCompletely"))
    await deleteGame(gameId, deleteCompletely)
    return { redirect: "/dashboard/game" }
  } catch (error) {
    console.log("error in delete game action")
    return null
  }

  function toBoolean(str) {
    return str === "true"
  }
}
