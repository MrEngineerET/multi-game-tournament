import React from "react"
import { SingleEliminationStage } from "./SingleEliminationStage"
import { DoubleEliminationStage } from "./DoubleEliminationStage"
import { RoundRobinStage } from "./RoundRobinStage"
import { useTournamentContext } from "../../context/TournamentContext"
import { Box } from "@mui/material"

export function TournamentBracket() {
  const { tournamentData } = useTournamentContext()
  const stage = tournamentData.stages[0]

  return (
    <Box>
      {stage && (
        <>
          {stage.type === "single_elimination" && (
            <SingleEliminationStage stage={stage} />
          )}
          {stage.type === "double_elimination" && (
            <DoubleEliminationStage stage={stage} />
          )}
          {stage.type === "round_robin" && <RoundRobinStage stage={stage} />}
        </>
      )}
    </Box>
  )
}
