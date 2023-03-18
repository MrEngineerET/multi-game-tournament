import React from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/material"
import { Round } from "./Round/Round"

const styleConstants = {
  gapBetweenRounds: { xs: 10, sm: 15 },
}
const styles = {
  root: {
    minWidth: "100%",
    overflow: "scroll",
  },
  group: {
    display: "flex",
    gap: styleConstants.gapBetweenRounds,
  },
}
export function SingleEliminationGroup({ group }) {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.group}>
        {group.rounds.map((round, i, rounds) => {
          return (
            <Round
              key={i}
              round={round}
              roundIndex={i}
              isLastRound={i === rounds.length - 1}
              gapBetweenRounds={styleConstants.gapBetweenRounds}
            />
          )
        })}
      </Box>
    </Box>
  )
}

SingleEliminationGroup.propTypes = {
  group: PropTypes.object,
}
