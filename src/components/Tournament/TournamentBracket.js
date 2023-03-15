import React from "react"
// import { useOutletContext } from "react-router-dom"
import { SingleEliminationStage } from "./SingleEliminationStage"
import { DoubleEliminationStage } from "./DoubleEliminationStage"
import { RoundRobinStage } from "./RoundRobinStage"
import { Box, Divider } from "@mui/material"
import { useTournamentContext } from "../../context/TournamentContext"

export function TournamentBracket() {
  const { tournamentData } = useTournamentContext()
  // const { tournamentData } = useOutletContext()
  return (
    <>
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
    </>
  )
}
