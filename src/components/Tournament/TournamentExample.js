import React from "react"
import { organizedData as tournamentData } from "../../testData"
import { Typography, Box, Divider } from "@mui/material"
import { SingleEliminationStage } from "./SingleEliminationStage"
import { DoubleEliminationStage } from "./DoubleEliminationStage"
import { RoundRobinStage } from "./RoundRobinStage"

export function TournamentExample() {
  return (
    <Box sx={{ m: 5 }}>
      <Typography>Tournament Example with data created manually</Typography>
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
