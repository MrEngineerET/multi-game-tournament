import React from "react"
import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { TextField, Button, Box } from "@mui/material"
import PropTypes from "prop-types"
import { useFetcher } from "react-router-dom"
import { updateTournament } from "../../../api/tournament"

const styles = {
  scoreInputField: {
    width: "5rem",
  },
  dialogAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    p: 3,
    pb: 0,
    gap: 4,
  },
}

export function ReportScore({ match, onClose }) {
  const theme = useTheme()
  const fetcher = useFetcher()

  React.useEffect(() => {
    if (fetcher.data?.closeDialog && fetcher.state === "idle") onClose()
  }, [fetcher.data, fetcher.state])

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <fetcher.Form method="post" action={`?match_id=${match.id}`}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Participant</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{match.participants[0]?.name}</TableCell>
              <TableCell>
                <TextField
                  name="participant_one_score"
                  type="number"
                  sx={styles.scoreInputField}
                  required
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{match.participants[1]?.name}</TableCell>
              <TableCell>
                <TextField
                  name="participant_two_score"
                  type="number"
                  sx={styles.scoreInputField}
                  required
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={styles.dialogAction}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          size={isSmallScreen ? "small" : "medium"}
        >
          cancel
        </Button>
        <Button
          type="submit"
          size={isSmallScreen ? "small" : "medium"}
          disabled={fetcher.state === "submitting"}
        >
          Save
        </Button>
      </Box>
    </fetcher.Form>
  )
}

ReportScore.propTypes = {
  match: PropTypes.object,
  onClose: PropTypes.func,
}

export async function updateMatchAction(request, params) {
  const url = new URL(request.url)
  const matchId = url.searchParams.get("match_id")
  const { id } = params
  const formData = await request.formData()
  const participantOneScore = Number(formData.get("participant_one_score"))
  const participantTwoScore = Number(formData.get("participant_two_score"))

  const playerOneResult =
    participantOneScore > participantTwoScore ? "win" : "loss"

  await updateTournament(id, {
    match: {
      id: Number(matchId),
      opponent1: {
        score: participantOneScore,
        result: playerOneResult,
      },
      opponent2: {
        score: participantTwoScore,
      },
    },
  })
  return { closeDialog: true }
}
