import React from "react"
import {
  Button,
  Box,
  Typography,
  List,
  Divider,
  ListItemButton,
} from "@mui/material"
import { Container } from "@mui/system"
import { useLoaderData, defer, Await } from "react-router-dom"
import { getTournaments } from "../api/tournament"
import { Link } from "react-router-dom"
import { TournamentSkeleton } from "../components/Tournament/TournamentSkeleton"

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
  content: {
    pt: 5,
  },
}

export function Tournament() {
  const { tournaments } = useLoaderData()
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
      <Box sx={styles.content}>
        <Container>
          <React.Suspense fallback={<TournamentSkeleton />}>
            <Await
              resolve={tournaments}
              errorElement={<div>Error while loading the tournaments</div>}
            >
              {(tournaments) => (
                <>
                  {!tournaments && (
                    <Typography>No result were found</Typography>
                  )}
                  {tournaments && (
                    <List>
                      {tournaments.map((tournament, i) => {
                        return (
                          <Box key={i}>
                            <ListItemButton
                              to={`${tournament._id}`}
                              component={Link}
                            >
                              {tournament.name}
                            </ListItemButton>
                            <Divider />
                          </Box>
                        )
                      })}
                    </List>
                  )}
                </>
              )}
            </Await>
          </React.Suspense>
        </Container>
      </Box>
    </Box>
  )
}

export async function loader() {
  const tournamentDataPromise = getTournaments()
  return defer({
    tournaments: tournamentDataPromise,
  })
}
