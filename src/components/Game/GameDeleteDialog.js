import React from "react"
import PropTypes from "prop-types"
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Box,
} from "@mui/material"
import { CustomDialogTitle } from "../Common/Dialog/CustomDialogTitle"
import {
  useNavigation,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom"

export function GameDeleteDialog({
  isOpen,
  onClose,
  gameId,
  deleteCompletely = false,
}) {
  const formData = useActionData()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (formData?.redirect) {
      onClose()
      navigate(formData.redirect, { replace: true })
    }
  }, [formData])

  const navigation = useNavigation()
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box sx={{ p: 5 }}>
        <CustomDialogTitle onClose={onClose}>
          Are you sure you want to delete?
        </CustomDialogTitle>
        <DialogContent>
          Are you sure you want to delete this game?{" "}
          {deleteCompletely &&
            "This action is irreversible and may result in errors for tournaments that rely on the game."}
        </DialogContent>
        <DialogActions>
          <Form
            method="delete"
            action={`/dashboard/game?gameId=${gameId}&deleteCompletely=${deleteCompletely}`}
          >
            <Button
              type="submit"
              size="small"
              disabled={navigation.state === "submitting"}
            >
              Delete {deleteCompletely && "Permanently"}
            </Button>
          </Form>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

GameDeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  gameId: PropTypes.string,
  deleteCompletely: PropTypes.bool,
}
