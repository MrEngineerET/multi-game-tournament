import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@mui/material"
import { Round } from "./Round"

const styleConstants = {
  gapBetweenRounds: { xs: 10, sm: 15 },
}
const styles = {
  root: {
    minWidth: "100%",
    overflow: "scroll",
    border: 1,
  },
  group: {
    display: "flex",
    gap: styleConstants.gapBetweenRounds,
  },
}
export function Group({ group }) {
  return (
    <Box sx={styles.root}>
      <Typography>Group</Typography>
      <Box sx={styles.group}>
        {group.rounds.map((round, i, rounds) => {
          return (
            <Round
              key={i}
              round={round}
              isFirstRound={i === 0}
              isLastRound={i === rounds.length - 1}
              gapBetweenRounds={styleConstants.gapBetweenRounds}
            />
          )
        })}
      </Box>
    </Box>
  )
}

Group.propTypes = {
  group: PropTypes.object,
}
