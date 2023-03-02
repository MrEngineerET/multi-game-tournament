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
}
export function Round({
  round,
  roundIndex,
  isLastRound,
  gapBetweenRounds,
  isLoserGroup,
}) {
  return (
    <Box sx={styles.root}>
      <Typography textAlign="center" mb={4}>
        Round
      </Typography>
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
  round: PropTypes.object,
  roundIndex: PropTypes.number,
  isLastRound: PropTypes.bool,
  gapBetweenRounds: PropTypes.object,
  isLoserGroup: PropTypes.bool,
}
