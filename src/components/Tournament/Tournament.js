import React from "react"
import { singleEliminationTournament as tournamentData } from "../../testData"
import { Typography, Box } from "@mui/material"
import { Stage } from "./Stage"

export function Tournament() {
  return (
    <Box>
      <Typography variant="h4" component="h1">
        {tournamentData.name}
      </Typography>
      <Stage />
    </Box>
  )
}
