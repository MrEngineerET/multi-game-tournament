import React from "react"
import PropTypes from "prop-types"
import { Match } from "./Match"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  round: {
    display: "flex",
    gap: 5,
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
  connectDown: {
    position: "absolute",
    bottom: 0,
    left: 1,
    height: "50%",
    borderTop: 2,
    borderRight: 2,
    borderColor: "bracket.line",
  },
  connectUp: {
    position: "absolute",
    left: 1,
    top: 0,
    height: "50%",
    borderBottom: 2,
    borderRight: 2,
    borderColor: "bracket.line",
  },
  connectBehind: {
    position: "absolute",
    right: 1,
    borderTop: 2,
    borderColor: "bracket.line",
  },
  matchAndConnector: {
    display: "flex",
    flex: 1,
  },
}
export function Round({ round, isFirstRound, isLastRound, gapBetweenRounds }) {
  const connectorWidth = {
    xs: (gapBetweenRounds.xs / 2) * 4 - 2, // 4 is the value of the theme spacing, and 2 is just a random number
    sm: (gapBetweenRounds.sm / 2) * 4 - 2,
  }
  function contain(el, arr) {
    const index = arr.findIndex((element) => element === el)
    return index !== -1
  }
  return (
    <Box sx={styles.root}>
      <Typography textAlign="center" mb={4}>
        Round
      </Typography>
      <Box sx={styles.round}>
        {round.matches.map((match, i) => {
          let connector = []
          if (!isLastRound)
            i % 2 == 0 ? connector.push("down") : connector.push("up")
          if (!isFirstRound) connector.push("behind")
          return (
            <Box key={i} sx={styles.matchAndConnector}>
              <Box sx={styles.connectorWrapper}>
                {contain("behind", connector) && (
                  <Box
                    sx={{ ...styles.connectBehind, width: connectorWidth }}
                  ></Box>
                )}
              </Box>
              <Box sx={styles.matchWrapper}>
                <Match match={match} />
              </Box>
              <Box sx={styles.connectorWrapper}>
                {contain("down", connector) && (
                  <Box
                    sx={{ ...styles.connectDown, width: connectorWidth }}
                  ></Box>
                )}
                {contain("up", connector) && (
                  <Box
                    sx={{ ...styles.connectUp, width: connectorWidth }}
                  ></Box>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

Round.propTypes = {
  round: PropTypes.object,
  isFirstRound: PropTypes.bool,
  isLastRound: PropTypes.bool,
  gapBetweenRounds: PropTypes.object,
}
