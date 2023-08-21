import React from "react"
import PropTypes from "prop-types"
import { Card, CardHeader, CardContent, Button } from "@mui/material"
import { Box, TextField, Chip } from "@mui/material"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import { shuffle } from "../../../utils"

export function AddParticipant({ disableInputs }) {
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
            disabled={disableInputs}
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
        {participants.length > 1 && (
          <Button
            variant="text"
            endIcon={<ShuffleIcon />}
            color="secondary"
            size="small"
            sx={{ mt: 2 }}
            onClick={() =>
              setParticipants((participants) => shuffle(participants))
            }
          >
            Shuffle
          </Button>
        )}
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 3 }}>
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

AddParticipant.propTypes = {
  disableInputs: PropTypes.bool,
}
