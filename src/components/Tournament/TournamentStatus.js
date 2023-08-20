import React from "react"
import { useTournamentContext } from "../../context/TournamentContext"
import { Box, Alert, AlertTitle, Button, Typography } from "@mui/material"
import { useFetcher, useLocation } from "react-router-dom"

export function TournamentStatus() {
  const { tournamentData } = useTournamentContext()
  const isTournamentOwner = tournamentData.player.tournamentOwner
  const stage = tournamentData.stages[0]
  const location = useLocation()
  const fetcher = useFetcher()

  const isPending = tournamentData.status === "pending"

  const isReadyToStart =
    isPending && tournamentData.participants.length >= 2 && stage

  const isBracketPage = location.pathname.trim().match(/tournament\/\d+$/)

  if (!isBracketPage) return ""
  if (isReadyToStart && isTournamentOwner)
    return (
      <Box>
        <Box>
          <Alert severity="info" sx={{ mb: 5 }}>
            <AlertTitle>Info</AlertTitle>
            <Typography sx={{ mb: 3 }}>
              Once your bracket is looking good and participants are ready:
            </Typography>
            <fetcher.Form
              method="post"
              action={`/tournament/${tournamentData._id}?type=updateStatus`}
            >
              <input hidden value="progress" name="status" readOnly />
              <Button
                type="submit"
                disabled={
                  fetcher.state === "submitting" || fetcher.state === "loading"
                }
              >
                Start the tournament
              </Button>
            </fetcher.Form>
          </Alert>
          {tournamentData.games.length === 0 && (
            <Box sx={{ mb: 5 }}>
              <Alert severity="info">
                <Typography sx={{ mb: 3 }}>
                  If you want to add games to your tournament
                </Typography>
                <Button href="settings">Add Game</Button>
              </Alert>
            </Box>
          )}
        </Box>
        <Alert severity="info" sx={{ mb: 5 }}>
          This bracket is a preview and subject to change until the tournament
          is started.
        </Alert>
      </Box>
    )
  else if (isReadyToStart && !isTournamentOwner)
    return (
      <Alert severity="info" sx={{ mb: 5 }}>
        Hang tight for the Tournament Creator to kick off the tournament! 😊
      </Alert>
    )
}
