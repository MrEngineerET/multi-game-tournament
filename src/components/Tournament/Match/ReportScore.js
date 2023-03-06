import React, { useEffect } from "react"
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
import { Form, useActionData, useNavigation } from "react-router-dom"
import { updateMatch } from "../../../api/tournament"

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
  const actionData = useActionData()
  const navigation = useNavigation()

  useEffect(() => {
    // dialog closing code
    if (actionData) {
      if (actionData.closeDialog) {
        onClose()
        actionData.closeDialog = false
      }
    }
  }, [actionData])

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Form method="post">
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
              <TableCell>{match.participants[0].name}</TableCell>
              <TableCell>
                <input
                  name="match_id"
                  type="number"
                  value={match.id}
                  readOnly
                  style={{ display: "none" }}
                />
                <TextField
                  name="participant_one_score"
                  type="number"
                  sx={styles.scoreInputField}
                  required
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{match.participants[1].name}</TableCell>
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
          disabled={navigation.state === "submitting"}
        >
          Save
        </Button>
      </Box>
    </Form>
  )
}

ReportScore.propTypes = {
  match: PropTypes.object,
  onClose: PropTypes.func,
}

export async function action({ request, params }) {
  const { id } = params
  const formData = await request.formData()
  const participantOneScore = Number(formData.get("participant_one_score"))
  const participantTwoScore = Number(formData.get("participant_two_score"))
  const matchId = Number(formData.get("match_id"))

  const playerOneResult =
    participantOneScore > participantOneScore ? "win" : "loss"

  await updateMatch(
    {
      id: Number(matchId),
      opponent1: {
        score: participantOneScore,
        result: playerOneResult,
      },
      opponent2: {
        score: participantTwoScore,
      },
    },
    id,
  )
  return { closeDialog: true }
}
