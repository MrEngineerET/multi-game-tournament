import React from "react"
import { SingleEliminationStage } from "./SingleEliminationStage"
import { DoubleEliminationStage } from "./DoubleEliminationStage"
import { RoundRobinStage } from "./RoundRobinStage"
import { useTournamentContext } from "../../context/TournamentContext"
import { Box, Alert, AlertTitle, Button } from "@mui/material"
import { useNavigation, useFetcher } from "react-router-dom"

export function TournamentBracket() {
  const { tournamentData } = useTournamentContext()
  const tournamentStatus = tournamentData.status
  const stage = tournamentData.stages[0]
  const navigation = useNavigation()
  const fetcher = useFetcher()

  return (
    <Box sx={{}}>
      {}
      {tournamentStatus !== "progress" && (
        <>
          <Alert severity="info" sx={{ mb: 5 }}>
            <AlertTitle>Info</AlertTitle>
            Once your bracket is looking good and participants are ready:
            <br />
            <fetcher.Form
              method="post"
              action={`/tournament/${tournamentData._id}?type=updateStatus`}
            >
              <input hidden value="progress" name="status" />
              <Button
                type="submit"
                sx={{ mt: 5 }}
                disabled={
                  navigation.state === "submitting" ||
                  navigation.state === "loading"
                }
              >
                Start the tournament
              </Button>
            </fetcher.Form>
          </Alert>
          <Alert severity="info" sx={{ mb: 5 }}>
            This bracket is a preview and subject to change until the tournament
            is started.
          </Alert>
        </>
      )}
      <Box>
        {stage.type === "single_elimination" && (
          <SingleEliminationStage stage={stage} />
        )}
        {stage.type === "double_elimination" && (
          <DoubleEliminationStage stage={stage} />
        )}
        {stage.type === "round_robin" && <RoundRobinStage stage={stage} />}
      </Box>
    </Box>
  )
}
