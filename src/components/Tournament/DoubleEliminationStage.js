import React from "react"
import PropTypes from "prop-types"
import { DoubleEliminationGroup } from "./DoubleEliminationGroup"
import { Box, useMediaQuery, useTheme } from "@mui/material"

export function DoubleEliminationStage({ stage }) {
  const [winnerGroup, loserGroup, grandFinalRound] = stage.groups
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 20,
          mb: 10,
          minWidth: "100%",
          overflow: "auto",
        }}
      >
        <DoubleEliminationGroup group={winnerGroup} />

        {grandFinalRound && !isSmallScreen && (
          <DoubleEliminationGroup group={grandFinalRound} isGrandFinalGroup />
        )}
      </Box>
      {loserGroup && (
        <Box sx={{ minWidth: "100%", overflow: "auto" }}>
          <DoubleEliminationGroup group={loserGroup} isLoserGroup />
        </Box>
      )}
      {isSmallScreen && grandFinalRound && (
        <Box sx={{ minWidth: "100%", overflow: "auto" }}>
          <DoubleEliminationGroup group={grandFinalRound} isGrandFinalGroup />
        </Box>
      )}
    </Box>
  )
}

DoubleEliminationStage.propTypes = {
  stage: PropTypes.object.isRequired,
}
