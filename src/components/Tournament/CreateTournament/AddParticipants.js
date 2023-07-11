import React from "react"
import { Card, CardHeader, CardContent, Button } from "@mui/material"
import { Box, TextField, Chip } from "@mui/material"

export function AddParticipant() {
  const [name, setName] = React.useState("")
  const [participants, setParticipants] = React.useState([])

  const handleParticipantDelete = (participant) => {
    setParticipants(participants.filter((p) => p !== participant))
  }

  return (
    <Card elevation={3}>
      <CardHeader title="Participant" sx={{ bgcolor: "background.default" }} />
      <CardContent sx={{ p: 5 }}>
        <Box sx={{ display: "flex", gap: 5 }}>
          <TextField
            value={name}
            size="small"
            onChange={(e) => {
              if (e.target.value === "") return setName(e.target.value)
              setName(e.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                if (event.target.value === "") return
                setParticipants([...participants, event.target.value])
                setName("")
              }
            }}
            sx={{ minWidth: { xs: 200, sm: 250 } }}
          />
          <input hidden readOnly value={participants} name="participants" />
          <Button
            onClick={() => {
              if (name === "") return
              setParticipants([...participants, name])
              setName("")
            }}
            disabled={name === ""}
            sx={{ px: 10 }}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ mt: 5, display: "flex", flexWrap: "wrap", gap: 3 }}>
          {participants.map((participant) => (
            <Chip
              onMouseDown={(event) => {
                event.stopPropagation()
                event.preventDefault()
              }}
              onDelete={() => {
                handleParticipantDelete(participant)
              }}
              key={participant}
              label={participant}
              sx={{ px: 1 }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
