import React from "react"
import PropTypes from "prop-types"
import {
  Box,
  List,
  Divider,
  ListItemButton,
  Typography,
  Card,
} from "@mui/material"
import { Link, Await, useLoaderData } from "react-router-dom"
import { TournamentSkeleton } from "./TournamentSkeleton"

export function TournamentList() {
  const { tournaments } = useLoaderData()
  return (
    <Box sx={{ width: 1 }}>
      <Card sx={{ bgcolor: "background.lightest" }} elevation={3}>
        <React.Suspense fallback={<TournamentSkeleton />}>
          <Await
            resolve={tournaments}
            errorElement={<div>Error while loading the tournaments</div>}
          >
            {(tournaments) => (
              <>
                {!tournaments && <Typography>No result were found</Typography>}
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
      </Card>
    </Box>
  )
}

export function TournamentFilter({ sx = {} }) {
  return (
    <Box sx={{ width: 1, ...sx }}>
      <Card sx={{ bgcolor: "background.lightest" }}>
        Tournament Filter block
      </Card>
    </Box>
  )
}

TournamentFilter.propTypes = {
  sx: PropTypes.object,
}
