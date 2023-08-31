import React from "react"
import { PropTypes } from "prop-types"
import { Box, Button } from "@mui/material"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useAlert } from "../../context/AlertContext"

export function ShareTournamentDialog({ isOpen = false, onClose }) {
  const alert = useAlert()
  const tournamentURL = window.location.href.match(/^.*tournament\/\d*/)[0]
  const joinURL = `${tournamentURL}/join`

  const handleCopy = () => {
    navigator.clipboard.writeText(joinURL)
    alert.showSuccess("Copied to clipboard")
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle>Share Tournament</DialogTitle>
        <IconButton sx={{ mr: 3 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 0 }}>
        <DialogContentText>
          Copy the link below and share it with your friends.
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
          }}
        >
          <TextField
            sx={{ flex: 1 }}
            value={joinURL}
            InputProps={{
              readOnly: true,
              style: {
                fontSize: 12,
              },
              type: "url",
            }}
            onClick={handleCopy}
          />
          <Button sx={{ ml: 2 }} onClick={handleCopy}>
            Copy
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

ShareTournamentDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}
