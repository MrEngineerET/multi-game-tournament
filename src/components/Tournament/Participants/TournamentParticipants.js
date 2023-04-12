import React, { useState, useEffect } from "react"
import { ParticipantListItem } from "./ParticipantListItem"
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material"
import { Snackbar, Alert } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { useTournamentContext } from "../../../context/TournamentContext"
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { useFetcher } from "react-router-dom"
import {
  addParticipant,
  updateParticipant,
  removeParticipant,
} from "../../../api/tournament"

export function TournamentParticipants() {
  const fetcher = useFetcher()
  const { tournamentData } = useTournamentContext()
  const isPending = tournamentData.status === "pending"
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    status: false,
    participantId: null,
  })

  useEffect(() => {
    if (fetcher.data?.error) {
      setOpenSnackbar(true)
    }
  }, [fetcher.data])

  useEffect(() => {
    if (fetcher.state === "loading") {
      // this means it has successfully submitted
      setOpenDeleteDialog({ status: false, participantId: null })
    }
  }, [fetcher.state])

  const handleCloseDialog = () => {
    setOpenDeleteDialog({ status: false, participantId: null })
  }
  const openDialog = (id) => {
    setOpenDeleteDialog({ status: true, participantId: id })
  }
  if (!tournamentData.stages[0]) return ""
  return (
    <Box
      sx={{
        maxWidth: "600px",
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false)
        }}
      >
        <Alert severity="error">{fetcher?.data?.error}</Alert>
      </Snackbar>
      <Box>
        {tournamentData.participants.map((participant, index) => (
          <ParticipantListItem
            key={participant.id}
            participant={participant}
            index={index}
            isPending={isPending}
            openDeleteDialog={openDialog}
          />
        ))}
      </Box>
      {isPending && (
        <fetcher.Form method="post">
          <Box sx={{ mt: 10, mb: 20 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
                pr: 8,
                visibility:
                  fetcher.state === "submitting" ? "visible" : "hidden",
              }}
            >
              <CircularProgress color="secondary" size={25} />
            </Box>

            <Box sx={{ display: "flex", gap: 5 }}>
              <TextField
                placeholder="Name"
                required
                fullWidth
                name="name"
                label="Name"
                disabled={fetcher.state === "submitting"}
              />
              <Button
                sx={{ width: 100 }}
                type="submit"
                disabled={fetcher.state === "submitting"}
                name="intent"
                value="add"
              >
                Add
              </Button>
            </Box>
          </Box>
        </fetcher.Form>
      )}
      <Dialog open={openDeleteDialog.status} onClose={handleCloseDialog}>
        <DialogTitle>
          Are you sure you want to remove the participant?
        </DialogTitle>
        <DialogContent sx={{ pb: 10 }}>
          <Typography>
            This action will remove the participant from the tournament
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog} sx={{ mr: 3 }}>
            Cancel
          </Button>
          <fetcher.Form method="post">
            <input
              readOnly
              name="participant_id"
              value={openDeleteDialog.participantId}
              hidden
            />
            <Button type="submit" name="intent" value="delete">
              Remove Participant
            </Button>
          </fetcher.Form>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const intent = formData.get("intent")
  const tournamentId = params.id
  if (intent === "add") {
    const name = formData.get("name")
    try {
      await addParticipant(tournamentId, [name])
      return null
    } catch (error) {
      if (error.response?.data?.message)
        return { error: error.response.data.message }
      else throw error
    }
  } else if (intent === "edit") {
    try {
      const participantId = formData.get("participant_id")
      const updatedName = formData.get("updated_name")
      await updateParticipant(tournamentId, participantId, updatedName)
      return null
    } catch (error) {
      if (error.response?.data?.message)
        return { error: error.response.data.message }
      else throw error
    }
  } else if (intent === "delete") {
    const participantId = formData.get("participant_id")
    await removeParticipant(tournamentId, participantId)
    return null
  }
}