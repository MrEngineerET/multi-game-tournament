import React from "react"
import { Box, IconButton, Typography } from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { useTournamentContext } from "../../context/TournamentContext"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"

export function TournamentParticipants() {
  const { tournamentData } = useTournamentContext()
  console.log(tournamentData)
  const isPending = tournamentData.status === "pending"

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
      {isPending && <Box>Add participant box</Box>}
    </Box>
  )
}
