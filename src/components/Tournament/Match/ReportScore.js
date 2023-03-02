import React, { useState } from "react"
import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@mui/material"
import { DialogContent, Box } from "@mui/material"
import { TextField, Button } from "@mui/material"
import { useTournamentContext } from "../../../context/TournamentContext"
import PropTypes from "prop-types"

const styles = {
  scoreInputField: {
    width: "5rem",
  },
  dialogAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    p: 3,
    gap: 4,
  },
}

export function ReportScore({ match, onClose }) {
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
    <>
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
      <Box sx={styles.dialogAction}>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          cancel
        </Button>
        <Button onClick={handleSave} disabled={!scoreOne || !scoreTwo}>
          Save
        </Button>
      </Box>
    </>
  )
}

ReportScore.propTypes = {
  match: PropTypes.object,
  onClose: PropTypes.func,
}
