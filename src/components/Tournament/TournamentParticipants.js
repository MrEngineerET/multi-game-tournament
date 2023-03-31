import React from "react"
import { Box, IconButton, TextField, Typography, Button } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { useTournamentContext } from "../../context/TournamentContext"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { useFetcher } from "react-router-dom"
import { addParticipant } from "../../api/tournament"

export function TournamentParticipants() {
  const fetcher = useFetcher()
  const { tournamentData } = useTournamentContext()
  const isPending = tournamentData.status === "pending"

  if (!tournamentData.stages[0]) return ""
  return (
    <Box
      sx={{
        maxWidth: "600px",
      }}
    >
      <Box>
        {tournamentData.participants.map((participant, index) => (
          <Box
            key={participant.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              boxShadow: 2,
              borderRadius: 1,
              mb: 1,
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box>{index + 1}</Box>
              <Box>
                <DragIndicatorIcon />
              </Box>
              <Typography>{participant.name}</Typography>
            </Box>
            <Box sx={{ display: "flex", fontSize: 12, gap: 2 }}>
              <IconButton
                size="small"
                sx={{ padding: 0 }}
                disabled={!isPending}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ padding: 0 }}
                disabled={!isPending}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
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
              >
                Add
              </Button>
            </Box>
          </Box>
        </fetcher.Form>
      )}
    </Box>
  )
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const name = formData.get("name")
  const tournamentId = params.id
  await addParticipant(tournamentId, [name])
  return null
}
