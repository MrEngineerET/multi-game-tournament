import React from "react"
import Proptypes from "prop-types"
import { Box } from "@mui/material"
import { SingleEliminationGroup } from "./SingleEliminationGroup"

export function SingleEliminationStage({ stage }) {
  return (
    <Box>
      {stage.groups.map((group, i) => {
        return <SingleEliminationGroup key={i} group={group} />
      })}
    </Box>
  )
}

SingleEliminationStage.propTypes = {
  stage: Proptypes.object,
}
