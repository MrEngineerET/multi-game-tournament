import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material"
import { CircularProgress } from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { useFetcher } from "react-router-dom"
import { useAlert } from "../../../context/AlertContext"

export function ParticipantListItem({
  participant,
  index,
  isPending,
  openDeleteDialog,
  disableActions = false,
}) {
  const fetcher = useFetcher()
  const [openNameEditor, setOpenNameEditor] = useState(false)
  const alert = useAlert()
  useEffect(() => {
    if (fetcher.state === "loading") {
      // this means it has successfully submitted
      setOpenNameEditor(false)
    }
    if (fetcher.data?.error) {
      alert.showError(fetcher.data.error)
    }
  }, [fetcher.state, fetcher.data])

  return (
    <Box
      key={participant.id}
      sx={{
        boxShadow: 2,
        borderRadius: 1,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 2,
          pb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ width: 25, textAlign: "right" }}>{index + 1}</Box>
          {/* <Box sx={{ opacity: 0.6, cursor: "grab", mb: "-7px" }}>
                    <DragIndicatorIcon />
                  </Box> */}
          <Typography sx={{ fontWeight: 500, pl: 2 }}>
            {participant.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", pr: 3 }}>
          <IconButton
            size="small"
            onClick={() => setOpenNameEditor((prev) => !prev)}
            disabled={!isPending || disableActions}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            size="small"
            disabled={!isPending || disableActions}
            type="submit"
            name="intent"
            value="delete"
            onClick={() => openDeleteDialog(participant.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      {openNameEditor && (
        <>
          <Divider />
          <fetcher.Form method="post">
            <Box
              sx={{
                display: "flex",
                gap: 5,
                width: { xs: 1, sm: 0.8 },
                mt: 4,
                pb: 3,
                pl: 10,
              }}
            >
              <input
                name="participant_id"
                value={participant.id}
                hidden
                readOnly
              />
              <TextField
                placeholder="Name"
                required
                fullWidth
                name="updated_name"
                defaultValue={participant.name}
                disabled={fetcher.state === "submitting"}
                size="small"
                autoFocus
              />
              <Button
                sx={{ width: 100 }}
                type="submit"
                disabled={fetcher.state === "submitting" || !isPending}
                name="intent"
                value="edit"
                size="small"
              >
                Save
              </Button>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress
                  color="secondary"
                  size={20}
                  sx={{
                    visibility:
                      fetcher.state === "submitting" ? "visible" : "hidden",
                  }}
                />
              </Box>
            </Box>
          </fetcher.Form>
        </>
      )}
    </Box>
  )
}

ParticipantListItem.propTypes = {
  participant: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isPending: PropTypes.bool.isRequired,
  openDeleteDialog: PropTypes.func.isRequired,
  disableActions: PropTypes.bool,
}
