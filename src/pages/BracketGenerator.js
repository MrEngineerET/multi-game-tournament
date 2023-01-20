/* eslint-disable no-unused-vars */
import React from "react"
import { Box, Stack, Typography } from "@mui/material"

import { Match } from "../components/Match"

const styles = {}

export const BracketGenerator = () => {
  return (
    <Box p={5}>
      <Stack direction="row" gap={5}>
        <Stack gap={5}>
          <Typography>Round One</Typography>
          <Match />
          <Match />
        </Stack>
        <Stack gap={5}>
          <Typography>Round Two</Typography>
          <Match />
          <Match />
        </Stack>
        <Stack gap={5}>
          <Typography>Round Three</Typography>
          <Match />
          <Match />
        </Stack>
        <Stack gap={5}>
          <Typography>Final Round</Typography>
          <Match />
          <Match />
        </Stack>
      </Stack>
    </Box>
  )
}
