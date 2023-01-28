import React from "react"
import { addParticipantNameInMatch, catagorizeData } from "../../testData"
import { Typography, Box, Divider } from "@mui/material"
import { SingleEliminationStage } from "./SingleEliminationStage"
import { DoubleEliminationStage } from "./DoubleEliminationStage"
import { RoundRobinStage } from "./RoundRobinStage"

export function TournamentDetail() {
  const tournamentData = catagorizeData(
    addParticipantNameInMatch(window.tournamentData),
  )

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
