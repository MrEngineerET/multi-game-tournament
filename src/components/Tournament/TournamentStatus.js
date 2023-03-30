import React from "react"
import { useTournamentContext } from "../../context/TournamentContext"
import { Box, Alert, AlertTitle, Button, Typography } from "@mui/material"
import { useFetcher, useLocation } from "react-router-dom"

export function TournamentStatus() {
  const { tournamentData } = useTournamentContext()
  const tournamentStatus = tournamentData.status
  const stage = tournamentData.stages[0]
  const location = useLocation()
  const fetcher = useFetcher()

  return (
    <Box>
      {tournamentStatus !== "progress" &&
        tournamentData.participants.length !== 0 &&
        stage && (
          <>
            <Alert severity="info" sx={{ mb: 5 }}>
              <AlertTitle>Info</AlertTitle>
              <Typography>
                Once your bracket is looking good and participants are ready:
              </Typography>
              <fetcher.Form
                method="post"
                action={`/tournament/${tournamentData._id}?type=updateStatus`}
              >
                <input hidden value="progress" name="status" readOnly />
                <Button
                  type="submit"
                  sx={{ mt: 5 }}
                  disabled={
                    fetcher.state === "submitting" ||
                    fetcher.state === "loading"
                  }
                >
                  Start the tournament
                </Button>
              </fetcher.Form>
            </Alert>
            <Alert severity="info" sx={{ mb: 5 }}>
              This bracket is a preview and subject to change until the
              tournament is started.
            </Alert>
          </>
        )}
      {!location.pathname.includes("settings") &&
        tournamentData.games.length === 0 && (
          <Box>
            <Alert severity="info">
              <Typography sx={{ pb: 3 }}>
                If you want to add games to your tournament
              </Typography>
              <Button href="settings">Add Game</Button>
            </Alert>
          </Box>
        )}

      {!location.pathname.includes("participants") &&
        tournamentData.participants.length === 0 && (
          <Box sx={{ mt: 5 }}>
            <Alert severity="info">
              <Typography sx={{ pb: 3 }}>
                To get started add participants
              </Typography>
              <Button href="participants">Add Participants</Button>
            </Alert>
            <Alert severity="info" sx={{ mt: 5 }}>
              A bracket preview will be displayed once 2 or more participants
              are registered.
            </Alert>
          </Box>
        )}
    </Box>
  )
}
