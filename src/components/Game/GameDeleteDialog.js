import React from "react"
import PropTypes from "prop-types"
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material"
import { CustomDialogTitle } from "../Common/Dialog/CustomDialogTitle"
import { useNavigation, useFetcher } from "react-router-dom"

export function GameDeleteDialog({ isOpen, onClose, gameId }) {
  const fetcher = useFetcher()

  React.useEffect(() => {
    if (fetcher.data?.closeDialog && fetcher.state === "idle") onClose()
  }, [fetcher.data, fetcher.state])

  const navigation = useNavigation()
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <CustomDialogTitle onClose={onClose}>
        Are you sure you want to delete?
      </CustomDialogTitle>
      <DialogContent>
        Are you sure you want to delete this game? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <fetcher.Form method="post" action={`/game?gameId=${gameId}`}>
          <Button
            type="submit"
            size="small"
            disabled={navigation.state === "submitting"}
          >
            Delete
          </Button>
        </fetcher.Form>
      </DialogActions>
    </Dialog>
  )
}

GameDeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gameId: PropTypes.string,
}
