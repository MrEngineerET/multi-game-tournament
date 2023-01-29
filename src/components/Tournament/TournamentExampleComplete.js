import React from "react"
import { Box, Stack, Typography } from "@mui/material"

import { Match } from "../Match"

const styles = {
  column: {
    flex: 1,
  },
  row: {
    flex: 1,
    display: "flex",
  },
  matchWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
  afterTopWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  afterTop: {
    borderTop: 2,
    borderRight: 2,
    borderColor: "bracket.line",
    position: "absolute",
    height: "50%",
    top: "50%",
    left: 1,
    width: "25px",
  },
  afterBottomWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  afterBottom: {
    borderBottom: 2,
    borderRight: 2,
    borderColor: "bracket.line",
    position: "absolute",
    height: "50%",
    bottom: "50%",
    width: "25px",
    left: 1,
  },
  beforeWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  before: {
    position: "absolute",
    borderBottom: 2,
    borderColor: "bracket.line",
    width: 30,
    top: "50%",
    right: 1,
  },
}

export const TournamentExampleComplete = () => {
  return (
    <Box p={5}>
      <Stack direction="row" gap={15}>
        <Stack gap={2}>
          <Box sx={styles.header}>
            <Typography variant="h5">Round One</Typography>
          </Box>
          <Stack gap={4} sx={styles.column}>
            <Box sx={styles.row}>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterTopWrapper}>
                <Box sx={styles.afterTop}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterBottomWrapper}>
                <Box sx={styles.afterBottom}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterTopWrapper}>
                <Box sx={styles.afterTop}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterBottomWrapper}>
                <Box sx={styles.afterBottom}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterTopWrapper}>
                <Box sx={styles.afterTop}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterBottomWrapper}>
                <Box sx={styles.afterBottom}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterTopWrapper}>
                <Box sx={styles.afterTop}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterBottomWrapper}>
                <Box sx={styles.afterBottom}></Box>
              </Box>
            </Box>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Box sx={styles.header}>
            <Typography variant="h5">Round Two</Typography>
          </Box>
          <Stack gap={4} sx={styles.column}>
            <Box sx={styles.row}>
              <Box sx={styles.beforeWrapper}>
                <Box sx={styles.before}></Box>
              </Box>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterTopWrapper}>
                <Box sx={styles.afterTop}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.beforeWrapper}>
                <Box sx={styles.before}></Box>
              </Box>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterBottomWrapper}>
                <Box sx={styles.afterBottom}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.beforeWrapper}>
                <Box sx={styles.before}></Box>
              </Box>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterTopWrapper}>
                <Box sx={styles.afterTop}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.beforeWrapper}>
                <Box sx={styles.before}></Box>
              </Box>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterBottomWrapper}>
                <Box sx={styles.afterBottom}></Box>
              </Box>
            </Box>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Box sx={styles.header}>
            <Typography variant="h5">Round Three</Typography>
          </Box>
          <Stack gap={4} sx={styles.column}>
            <Box sx={styles.row}>
              <Box sx={styles.beforeWrapper}>
                <Box sx={styles.before}></Box>
              </Box>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterTopWrapper}>
                <Box sx={styles.afterTop}></Box>
              </Box>
            </Box>
            <Box sx={styles.row}>
              <Box sx={styles.beforeWrapper}>
                <Box sx={styles.before}></Box>
              </Box>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
              <Box sx={styles.afterBottomWrapper}>
                <Box sx={styles.afterBottom}></Box>
              </Box>
            </Box>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Box sx={styles.header}>
            <Typography variant="h5">Final Round</Typography>
          </Box>
          <Stack gap={4} sx={styles.column}>
            <Box sx={styles.row}>
              <Box sx={styles.beforeWrapper}>
                <Box sx={styles.before}></Box>
              </Box>
              <Box sx={styles.matchWrapper}>
                <Match />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
