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
    mb: 4,
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
  isLoserGroup,
  roundLength,
}) {
  const isLastRound = roundLength - 1 === roundIndex

  function getRoundName(roundIndex, roundLength, isLastRound) {
    const toString = ["One", "Two", "Three", "Four", "Five", "Six"]
    if (isLastRound) return "Final"
    if (roundIndex === 0) return "Round One"
    if (roundLength > 2) {
      if (roundIndex === roundLength - 2) return "Semi Final"
      return `Round ${toString[roundIndex]}`
    }
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
                isLoserGroup={isLoserGroup}
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
                isLoserGroup={isLoserGroup}
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
  gapBetweenRounds: PropTypes.object,
}
