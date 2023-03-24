import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@mui/material"
import { Round } from "./Round/Round"

const styleConstants = {
  gapBetweenRounds: { xs: 10, sm: 15 },
}
const styles = {
  group: {
    display: "flex",
    gap: styleConstants.gapBetweenRounds,
  },
}
export function DoubleEliminationGroup({
  group,
  isLoserGroup = false,
  isGrandFinalGroup = false,
}) {
  let rounds = group.rounds
  if (isGrandFinalGroup) {
    const roundOneWinner = rounds[0].matches[0].opponent1
    const displayCount = roundOneWinner?.result === "win" ? 1 : 2
    rounds = rounds.slice(0, displayCount)
  }
  return (
    <Box>
      {isLoserGroup ? (
        <Typography variant="h6" sx={{ opacity: 0.7, pb: 5 }}>
          Lower Bracket
        </Typography>
      ) : isGrandFinalGroup ? (
        <Typography variant="h6" sx={{ opacity: 0.7, pb: 5 }}>
          Grand Final
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ opacity: 0.7, pb: 5 }}>
          Upper Bracket
        </Typography>
      )}
      <Box sx={styles.group}>
        {rounds.map((round, i, rounds) => {
          return (
            <Round
              key={i}
              round={round}
              roundIndex={i}
              roundLength={rounds.length}
              gapBetweenRounds={styleConstants.gapBetweenRounds}
              isLoserGroup={isLoserGroup}
              isGrandFinalGroup={isGrandFinalGroup}
            />
          )
        })}
      </Box>
    </Box>
  )
}

DoubleEliminationGroup.propTypes = {
  group: PropTypes.object,
  isLoserGroup: PropTypes.bool,
  isGrandFinalGroup: PropTypes.bool,
}
