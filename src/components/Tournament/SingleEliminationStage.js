import React from "react"
import Proptypes from "prop-types"
import { Typography, Box } from "@mui/material"
import { SingleEliminationGroup } from "./SingleEliminationGroup"
import { Match } from "./Match/Match"

export function SingleEliminationStage({ stage }) {
  const isConsolationGamePresent = stage.settings.consolationFinal
  const mainGroup = stage.groups[0]
  const consolationFinalMatch = isConsolationGamePresent
    ? stage.groups[1].rounds[0].matches[0]
    : null

  return (
    <>
      <SingleEliminationGroup group={mainGroup} />
      {consolationFinalMatch && (
        <Box sx={{ display: "inline-block", mt: { xs: 10, md: 15 } }}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: "500", opacity: 0.6 }}>
              {" "}
              Third Place Game
            </Typography>
            <Match match={consolationFinalMatch} />
          </Box>
        </Box>
      )}
    </>
  )
}

SingleEliminationStage.propTypes = {
  stage: Proptypes.object,
}
