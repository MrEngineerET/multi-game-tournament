import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TextField,
} from "@mui/material"
import { useTheme, useMediaQuery } from "@mui/material"
import PropTypes from "prop-types"
import { useTournamentContext } from "../../../context/TournamentContext"

const styles = {
  scoreInputField: {
    width: "5rem",
  },
}

export const MatchEditDialog = ({ open, onClose, match }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const { handleUpdateTournament } = useTournamentContext()

  const [scoreOne, setScoreOne] = useState(match.participants[0].score)
  const [scoreTwo, setScoreTwo] = useState(match.participants[0].score)

  const handleScoreChange = ({ target }) => {
    if (target.name === "participantOne") setScoreOne(Number(target.value))
    if (target.name === "participantTwo") setScoreTwo(Number(target.value))
  }
  const handleSave = async () => {
    if (!scoreOne || !scoreTwo) return
    const payload = { ...match }
    payload.opponent1 = { ...match.payload1 }
    payload.opponent2 = { ...match.payload2 }

    payload.opponent1.score = scoreOne
    payload.opponent2.score = scoreTwo

    if (scoreOne > scoreTwo) payload.opponent1.result = "win"
    else payload.opponent2.result = "win"

    delete payload.participants

    await handleUpdateTournament(payload)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isSmallScreen}
    >
      <DialogTitle>Report Score</DialogTitle>
      <DialogContent>
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
                  <TextField
                    name="participantOne"
                    type="number"
                    sx={styles.scoreInputField}
                    value={match.participants[0].score}
                    onChange={handleScoreChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{match.participants[1].name}</TableCell>
                <TableCell>
                  <TextField
                    name="participantTwo"
                    type="number"
                    sx={styles.scoreInputField}
                    value={match.participants[1].score}
                    onChange={handleScoreChange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          cancel
        </Button>
        <Button onClick={handleSave} disabled={!scoreOne || !scoreTwo}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

MatchEditDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  match: PropTypes.object,
}
