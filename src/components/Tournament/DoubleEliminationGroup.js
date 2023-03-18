import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@mui/material"
import { Round } from "./Round/Round"

const styleConstants = {
  gapBetweenRounds: { xs: 10, sm: 15 },
}
const styles = {
  root: {
    minWidth: "100%",
    overflow: "scroll",
    border: 1,
    pl: 5,
    pb: 5,
  },
  group: {
    display: "flex",
    gap: styleConstants.gapBetweenRounds,
  },
}
export function DoubleEliminationGroup({ group, isLoserGroup = false }) {
  return (
    <Box sx={styles.root}>
      <Typography>Group</Typography>
      <Box sx={styles.group}>
        {group.rounds.map((round, i, rounds) => {
          return (
            <Round
              key={i}
              round={round}
              roundIndex={i}
              roundLength={rounds.length}
              gapBetweenRounds={styleConstants.gapBetweenRounds}
              isLoserGroup={isLoserGroup}
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
}
