import React from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/system"

const styles = {
  connectDown: {
    position: "absolute",
    bottom: 0,
    left: 1,
    height: "50%",
    borderTop: 2,
    borderRight: 2,
    borderColor: "bracket.line",
    zIndex: -1,
  },
  connectUp: {
    position: "absolute",
    left: 1,
    top: 0,
    height: "50%",
    borderBottom: 2,
    borderRight: 2,
    borderColor: "bracket.line",
    zIndex: -1,
  },
  connectBehind: {
    position: "absolute",
    right: 1,
    borderTop: 2,
    borderColor: "bracket.line",
  },
}

export function BackConnector({
  roundIndex,
  gapBetweenRounds,
  isLoserGroup = false,
}) {
  let connectorWidth
  if (isLoserGroup && roundIndex % 2 === 1) {
    connectorWidth = {
      xs: gapBetweenRounds.xs * 4 - 2, // 4 is the value of the theme spacing, and -2 is just a random number
      sm: gapBetweenRounds.sm * 4 - 2,
    }
  } else {
    connectorWidth = {
      xs: (gapBetweenRounds.xs / 2) * 4 - 2, // 4 is the value of the theme spacing, and -2 is just a random number
      sm: (gapBetweenRounds.sm / 2) * 4 - 2,
    }
  }

  if (!(roundIndex == 0))
    return <Box sx={{ ...styles.connectBehind, width: connectorWidth }} />
  else return ""
}
BackConnector.propTypes = {
  roundIndex: PropTypes.number.isRequired,
  gapBetweenRounds: PropTypes.object.isRequired,
  isLoserGroup: PropTypes.bool,
}

export function FrontConnector({
  isLastRound,
  roundIndex,
  matchIndex,
  gapBetweenRounds,
  isLoserGroup = false,
}) {
  const connectorWidth = {
    xs: (gapBetweenRounds.xs / 2) * 4 - 2, // 4 is the value of the theme spacing, and -2 is just a random number
    sm: (gapBetweenRounds.sm / 2) * 4 - 2,
  }

  if (isLastRound | (isLoserGroup && roundIndex % 2 === 0)) return ""
  if (matchIndex % 2 === 0)
    return <Box sx={{ ...styles.connectDown, width: connectorWidth }} />
  else return <Box sx={{ ...styles.connectUp, width: connectorWidth }} />
}

FrontConnector.propTypes = {
  isLastRound: PropTypes.bool.isRequired,
  roundIndex: PropTypes.number.isRequired,
  matchIndex: PropTypes.number.isRequired,
  gapBetweenRounds: PropTypes.object.isRequired,
  isLoserGroup: PropTypes.bool,
}
