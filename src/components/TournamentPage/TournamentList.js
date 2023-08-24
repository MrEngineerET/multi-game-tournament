import React from "react"
import PropTypes from "prop-types"
import { Box, Typography, Card, Button, Paper } from "@mui/material"
import { Await, useLoaderData, useFetcher } from "react-router-dom"
import { TournamentListSkeleton } from "./TournamentListSkeleton"
import { TournamentListTable } from "./TournamentListTable"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { LoadingButton } from "../Common/LoadingButton"

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
              <TournamentListErrorComponent
                onRetry={() => window.location.reload()}
              />
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

export function TournamentListErrorComponent({ onRetry, disableButton }) {
  const fetcher = useFetcher()
  if (onRetry === undefined) onRetry = () => fetcher.load("/tournament/?index")
  return (
    <Paper
      elevation={1}
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        margin: "2rem auto",
        my: 10,
        mx: { xs: 0, sm: 10 },
      }}
    >
      <ErrorOutlineIcon
        color="error"
        fontSize="large"
        sx={{
          fontSize: "4rem",
        }}
      />
      <Typography variant="h5" color="textSecondary">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" textAlign="center" color="textSecondary">
        {
          "We couldn't fetch the tournaments. Please check your internet connection and try again."
        }
      </Typography>
      <LoadingButton
        variant="outlined"
        color="primary"
        onClick={onRetry}
        loading={disableButton || fetcher.state === "loading"}
      >
        Retry
      </LoadingButton>
    </Paper>
  )
}

TournamentListErrorComponent.propTypes = {
  onRetry: PropTypes.func,
  disableButton: PropTypes.bool,
}
