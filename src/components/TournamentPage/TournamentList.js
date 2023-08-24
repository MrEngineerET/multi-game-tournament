import React from "react"
import PropTypes from "prop-types"
import { Box, Typography, Card, Button } from "@mui/material"
import { Await, useLoaderData } from "react-router-dom"
import { TournamentListSkeleton } from "./TournamentListSkeleton"
import { TournamentListTable } from "./TournamentListTable"

export function TournamentList({ filter = "all" }) {
  const { tournaments } = useLoaderData()
  return (
    <Box sx={{ width: 1 }}>
      <Card
        sx={{ bgcolor: "background.lightest", p: 3, pt: 8, pb: 10 }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h6">Tournaments</Typography>
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ ml: 5 }}
              href="new"
            >
              + Tournament
            </Button>
          </Box>
        </Box>
        <React.Suspense fallback={<TournamentListSkeleton length={8} />}>
          <Await
            resolve={tournaments}
            errorElement={
              <Box
                sx={{
                  my: 5,
                  py: 10,
                  bgcolor: "background.themostlight",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography color="error" variant="h5">
                  Error while loading the tournaments
                </Typography>
              </Box>
            }
          >
            {(tournaments) => (
              <>
                <TournamentListTable
                  tournaments={tournaments}
                  filter={filter}
                />
              </>
            )}
          </Await>
        </React.Suspense>
      </Card>
    </Box>
  )
}
TournamentList.propTypes = {
  filter: PropTypes.string,
}
