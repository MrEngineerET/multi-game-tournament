import React from "react"
import { useLoaderData } from "react-router-dom"
import { addParticipantNameInMatch, catagorizeData } from "../../testData"
import { Typography, Box, Divider } from "@mui/material"
import { SingleEliminationStage } from "./SingleEliminationStage"
import { DoubleEliminationStage } from "./DoubleEliminationStage"
import { RoundRobinStage } from "./RoundRobinStage"
import { getTournament } from "../../api/tournament"

export function TournamentDetail() {
  let { tournamentData } = useLoaderData()
  tournamentData = catagorizeData(addParticipantNameInMatch(tournamentData))

  if (!tournamentData) return "waiting"
  return (
    <Box sx={{ m: 5 }}>
      <Typography variant="h4" component="h1">
        {tournamentData.name}
      </Typography>
      {tournamentData.stages.map((stage, i) => {
        return (
          <Box key={stage.name && i}>
            {stage.type === "single_elimination" && (
              <SingleEliminationStage stage={stage} />
            )}
            {stage.type === "double_elimination" && (
              <DoubleEliminationStage stage={stage} />
            )}
            {stage.type === "round_robin" && <RoundRobinStage stage={stage} />}
            <Divider />
          </Box>
        )
      })}
    </Box>
  )
}

export async function loader({ params }) {
  const tournamentId = params.id
  const tournament = await getTournament(tournamentId)
  return { tournamentData: tournament }
}
