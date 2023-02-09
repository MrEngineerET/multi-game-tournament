import React from "react"
import PropTypes from "prop-types"
import { DoubleEliminationGroup } from "./DoubleEliminationGroup"
import { Box } from "@mui/material"

export function DoubleEliminationStage({ stage }) {
  return (
    <Box>
      {stage.groups.map((group, i) => {
        return (
          <DoubleEliminationGroup
            key={i}
            group={group}
            isLoserGroup={i === 1}
          />
        )
      })}
    </Box>
  )
}

DoubleEliminationStage.propTypes = {
  stage: PropTypes.object.isRequired,
}
