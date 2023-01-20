/* eslint-disable no-unused-vars */
import React from "react"
import { Box, Stack, Typography } from "@mui/material"

import { Match } from "../components/Match"

const styles = {
  column: {
    height: "100%",
  },
  row: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
}

export const BracketGenerator = () => {
  return (
    <Box p={5}>
      <Stack direction="row" gap={15}>
        <Stack gap={2}>
          <Box sx={styles.header}>
            <Typography variant="h5">Round One</Typography>
          </Box>
          <Stack gap={6} sx={styles.column}>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Box sx={styles.header}>
            <Typography variant="h5">Round Two</Typography>
          </Box>
          <Stack gap={4} sx={styles.column}>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Box sx={styles.header}>
            <Typography variant="h5">Round Three</Typography>
          </Box>
          <Stack gap={4} sx={styles.column}>
            <Box sx={styles.row}>
              <Match />
            </Box>
            <Box sx={styles.row}>
              <Match />
            </Box>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Box sx={styles.header}>
            <Typography variant="h5">Final Round</Typography>
          </Box>
          <Stack gap={4} sx={styles.column}>
            <Box sx={styles.row}>
              <Match />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
