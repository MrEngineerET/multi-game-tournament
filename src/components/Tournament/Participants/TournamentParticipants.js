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
  useMediaQuery,
  useTheme,
} from "@mui/material"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import { CircularProgress } from "@mui/material"
import { useTournamentContext } from "../../../context/TournamentContext"
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { useFetcher } from "react-router-dom"
import {
  addParticipant,
  updateParticipant,
  removeParticipant,
  shuffleParticipants,
} from "../../../api/tournament"
import { useAlert } from "../../../context/AlertContext"
import { shuffle } from "../../../utils"

export function TournamentParticipants() {
  const fetcher = useFetcher()
  const shuffleFetcher = useFetcher()
  const { tournamentData } = useTournamentContext()
  const isPending = tournamentData.status === "pending"
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    status: false,
    participantId: null,
  })
  const alert = useAlert()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const isSubmitting =
    fetcher.state === "submitting" || shuffleFetcher.state === "submitting"
  const isTournamentOwner = tournamentData.player.tournamentOwner
  const disableForms = isSubmitting || !isTournamentOwner

  useEffect(() => {
    if (fetcher.data?.error) {
      alert.showError(fetcher.data.error, {
        vertical: "bottom",
        horizontal: "left",
      })
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {tournamentData.participants.length > 1 && (
          <shuffleFetcher.Form method="patch">
            <input
              readOnly
              name="shuffled_participants"
              value={JSON.stringify(
                shuffle(tournamentData.participants.map((p) => p.name)),
              )}
              hidden
            />
            <Button
              variant="text"
              endIcon={<ShuffleIcon />}
              color="secondary"
              sx={{ mb: 2 }}
              type="submit"
              name="intent"
              value="shuffle"
              disabled={disableForms}
            >
              Shuffle
            </Button>
          </shuffleFetcher.Form>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
            pr: 8,
            visibility: isSubmitting ? "visible" : "hidden",
          }}
        >
          <CircularProgress color="secondary" size={25} />
        </Box>
      </Box>
      <Box>
        {tournamentData.participants.map((participant, index) => (
          <ParticipantListItem
            key={participant.id}
            participant={participant}
            index={index}
            isPending={isPending}
            openDeleteDialog={openDialog}
            disableActions={disableForms}
          />
        ))}
      </Box>
      {isPending && (
        <fetcher.Form method="post">
          <Box sx={{ mt: 10, mb: 20 }}>
            <Box sx={{ display: "flex", gap: 5 }}>
              <TextField
                placeholder="Name"
                required
                fullWidth
                name="name"
                label="Name"
                disabled={disableForms}
              />
              <Button
                sx={{ width: 100 }}
                type="submit"
                disabled={disableForms}
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
        <Box sx={{ p: { xs: 1, sm: 5 } }}>
          <DialogTitle>
            Are you sure you want to remove the participant?
          </DialogTitle>
          <DialogContent sx={{ pb: 10 }}>
            <Typography>
              This action will remove the participant from the tournament
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mr: 3 }}>
            <Button
              color="secondary"
              onClick={handleCloseDialog}
              sx={{ mr: 3 }}
            >
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
                {isSmallScreen ? "Remove" : "Remove Participant"}
              </Button>
            </fetcher.Form>
          </DialogActions>
        </Box>
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
  } else if (intent === "shuffle") {
    try {
      let shuffledParticipants = formData.get("shuffled_participants")
      if (shuffleParticipants)
        shuffledParticipants = JSON.parse(shuffledParticipants)
      else return { error: "Participant required" }
      await shuffleParticipants(tournamentId, shuffledParticipants)
      return null
    } catch (error) {
      if (error.response?.data?.message)
        return { error: error.response.data.message }
      else throw error
    }
  }
}
