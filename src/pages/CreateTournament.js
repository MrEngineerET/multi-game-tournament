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
import { Form } from "react-router-dom"
import { createTournament, stageType } from "../api/tournament"

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
          <Card elevation={3}>
            <Box sx={{ bgcolor: "background.default", p: 5 }}>
              <Typography variant="h5">Basic Info</Typography>
            </Box>
            <Form method="post">
              <CardContent sx={{ p: 5 }}>
                <Stack gap={5}>
                  <Stack direction={{ xs: "column", md: "row" }} gap={5}>
                    <Typography sx={styles.fieldName}>
                      Tournament name
                    </Typography>
                    <Box sx={styles.fieldInput}>
                      <TextField
                        required
                        fullWidth
                        name="tournament_name"
                        variant="outlined"
                        size={isSmallScreen ? "small" : "normal"}
                      />
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: "column", md: "row" }} gap={5}>
                    <Typography sx={styles.fieldName}>Description</Typography>
                    <Box sx={styles.fieldInput}>
                      <TextField
                        fullWidth
                        name="tournament_desc"
                        variant="outlined"
                        multiline
                        minRows={3}
                        maxRows={5}
                        size={isSmallScreen ? "small" : "normal"}
                        required
                      />
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: "column", md: "row" }} gap={5}>
                    <Typography sx={styles.fieldName}>Type</Typography>
                    <Box sx={styles.fieldInput}>
                      <TextField
                        name="stage_type"
                        fullWidth
                        select
                        defaultValue={stageType.singleElimination}
                        size={isSmallScreen ? "small" : "normal"}
                      >
                        <MenuItem value={stageType.singleElimination}>
                          Single Elimination
                        </MenuItem>
                        <MenuItem value={stageType.doubleElimination}>
                          Double Elimination
                        </MenuItem>
                        <MenuItem value={stageType.round_robin}>
                          Round Robin
                        </MenuItem>
                      </TextField>
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: "column", md: "row" }} gap={5}>
                    <Typography sx={styles.fieldName}>Participants</Typography>
                    <Box sx={styles.fieldInput}>
                      <TextField
                        name="participants"
                        fullWidth
                        size={isSmallScreen ? "small" : "normal"}
                        multiline
                        minRows={3}
                        maxRows={5}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions sx={{ mb: 5, pl: 5 }}>
                <Button type="submit">Save and continue</Button>
              </CardActions>
            </Form>
          </Card>
        </Container>
      </Box>
    </Box>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const name = formData.get("tournament_name")
  const desc = formData.get("tournament_desc")
  const stageType = formData.get("stage_type")
  let participants = formData.get("participants").split(",")
  participants = participants.map((p) => {
    if (p) return p.trim()
    return null
  })
  participants = participants.filter((p) => p)

  const tournament = await createTournament(name, desc, participants, stageType)
  return redirect(`/tournament/${tournament.id}`)
}
