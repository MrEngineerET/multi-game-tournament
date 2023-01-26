import React from "react"
import Proptypes from "prop-types"
import { Box } from "@mui/material"
import { Group } from "./Group"

export function SingleEliminationStage({ stage }) {
  return (
    <Box>
      {stage.groups.map((group, i) => {
        return <Group key={i} group={group} />
      })}
    </Box>
  )
}

SingleEliminationStage.propTypes = {
  stage: Proptypes.object,
}
