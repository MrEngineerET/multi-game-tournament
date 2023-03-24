import React from "react"
import PropTypes from "prop-types"
import { Match } from "../Match/Match"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import { BackConnector, FrontConnector } from "./Connector"

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    pb: 4,
  },
  round: {
    display: "flex",
    gap: 15,
    flexDirection: "column",
    flex: 1,
  },
  matchWrapper: {
    display: "flex",
    alignItems: "center",
  },
  connectorWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  matchAndConnector: {
    display: "flex",
    flex: 1,
  },
  roundName: {
    mb: 5,
    bgcolor: "background.lightest",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}

export function Round({
  round,
  roundIndex,
  gapBetweenRounds,
  isLoserGroup = false,
  roundLength,
  isGrandFinalGroup = false,
}) {
  const isLastRound = roundLength - 1 === roundIndex

  function getRoundName(roundIndex, roundLength, isLastRound) {
    if (!(isLoserGroup || isGrandFinalGroup)) {
      return getMainRoundName(roundIndex, roundLength, isLastRound)
    }
    if (isLoserGroup) return getLoserBracketRoundName(roundIndex, isLastRound)
    if (isGrandFinalGroup) return getGrandFinalRoundName(isLastRound)
  }

  function getMainRoundName(roundIndex, roundLength, isLastRound) {
    if (isLastRound) return "Final Round"
    if (roundIndex === 0) return "Round 1"
    if (roundLength > 2) {
      if (roundIndex === roundLength - 2) return "Semi Final"
      return `Round ${roundIndex + 1}`
    }
  }
  function getLoserBracketRoundName(roundIndex, isLastRound) {
    if (isLastRound) return "LB Final Round"
    return `LB Round ${roundIndex + 1}`
  }
  function getGrandFinalRoundName(isLastRound) {
    if (isLastRound) return "GF Round 2"
    return `GF Round 1`
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.roundName}>
        <Typography
          sx={{
            fontWeight: "500",
            opacity: 0.6,
          }}
        >
          {getRoundName(roundIndex, roundLength, isLastRound)}
        </Typography>
      </Box>
      <Box sx={styles.round}>
        {round.matches.map((match, matchIndex) => (
          <Box key={matchIndex} sx={styles.matchAndConnector}>
            <Box sx={styles.connectorWrapper}>
              <BackConnector
                roundIndex={roundIndex}
                gapBetweenRounds={gapBetweenRounds}
                isLoserGroup={isLoserGroup || isGrandFinalGroup}
              />
            </Box>
            <Box sx={styles.matchWrapper}>
              <Match match={match} />
            </Box>
            <Box sx={styles.connectorWrapper}>
              <FrontConnector
                matchIndex={matchIndex}
                gapBetweenRounds={gapBetweenRounds}
                isLastRound={isLastRound}
                isLoserGroup={isLoserGroup || isGrandFinalGroup}
                roundIndex={roundIndex}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
Round.propTypes = {
  round: PropTypes.object.isRequired,
  roundIndex: PropTypes.number.isRequired,
  roundLength: PropTypes.number.isRequired,
  isLoserGroup: PropTypes.bool,
  isGrandFinalGroup: PropTypes.bool,
  gapBetweenRounds: PropTypes.object,
}
