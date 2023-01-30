import React from "react"
import { redirect } from "react-router-dom"
import {
  Box,
  Container,
  Typography,
  Card,
  Stack,
  TextField,
  MenuItem,
  CardActions,
  Button,
  CardContent,
} from "@mui/material"
import { useMediaQuery, useTheme } from "@mui/material"
// import { Form } from "react-router-dom"
import { createTournament } from "../api/tournament"

const styles = {
  bannerWrapper: {
    bgcolor: "background.paper",
  },
  banner: {
    p: 20,
    pl: 5,
    pr: 5,
  },
  content: {
    pt: 10,
  },
  fieldName: {
    width: 200,
    fontSize: { xs: 16, md: 20 },
    mb: 1,
  },
  fieldInput: {
    flex: 1,
  },
}

export function CreateTournament() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box>
      <Box sx={styles.bannerWrapper}>
        <Container sx={styles.banner}>
          <Typography variant="h3" component="h1">
            New Tournament
          </Typography>
        </Container>
      </Box>
      <Box>
        <Container sx={styles.content}>
          <Card elevation={5}>
            <Box sx={{ bgcolor: "background.default", p: 5 }}>
              <Typography variant="h5">Basic Info</Typography>
            </Box>
            <CardContent sx={{ p: 5 }}>
              <Stack gap={5}>
                <Stack direction={{ xs: "column", md: "row" }}>
                  <Typography sx={styles.fieldName}>Tournament name</Typography>
                  <Box sx={styles.fieldInput}>
                    <TextField
                      required
                      fullWidth
                      id="tournament_name"
                      variant="outlined"
                      size={isSmallScreen ? "small" : "normal"}
                    />
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }}>
                  <Typography sx={styles.fieldName}>Description</Typography>
                  <Box sx={styles.fieldInput}>
                    <TextField
                      fullWidth
                      id="tournament_desc"
                      variant="outlined"
                      multiline
                      minRows={3}
                      maxRows={5}
                      size={isSmallScreen ? "small" : "normal"}
                    />
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }}>
                  <Typography sx={styles.fieldName}>Type</Typography>
                  <Box sx={styles.fieldInput}>
                    <TextField
                      fullWidth
                      select
                      defaultValue="single_elimination"
                      size={isSmallScreen ? "small" : "normal"}
                    >
                      <MenuItem value="single_elimination">
                        Single Elimination
                      </MenuItem>
                      <MenuItem value="double_elimination">
                        Double Elimination
                      </MenuItem>
                      <MenuItem value="round_robin">Round Robin</MenuItem>
                    </TextField>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
            <CardActions sx={{ mb: 5, pl: 5 }}>
              <Button>Save and continue</Button>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </Box>
  )
}

export async function action() {
  const tournament = await createTournament()
  window.tournamentData = tournament
  return redirect(`/tournament/${tournament.number}`)
}
