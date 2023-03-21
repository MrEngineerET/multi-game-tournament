import React from "react"
import PropTypes from "prop-types"
import { Form, redirect, useNavigation } from "react-router-dom"
import { Box, Typography, Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ArchiveIcon from "@mui/icons-material/Archive"
import { sleep } from "../../utils"
import { deleteTournament } from "../../api/tournament"

export function TableToolBar({ tournamentIds }) {
  const numSelected = tournamentIds.length
  const navigation = useNavigation()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
        p: 2,
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: "1 1 100%" }}></Box>
      )}
      <Form
        action="archive"
        method="post"
        onSubmit={() => {
          console.log("idid", "hey submitting a form")
          //   event.preventDefault()
        }}
      >
        <Button
          startIcon={<ArchiveIcon />}
          variant="text"
          color="secondary"
          disabled={numSelected === 0 || navigation.state === "submitting"}
          size="small"
          type="submit"
        >
          Archive
        </Button>
      </Form>
      <Form action="destroy" method="delete">
        <input hidden name="tournament_ids" value={tournamentIds} />
        <Button
          startIcon={<DeleteIcon />}
          variant="text"
          color="secondary"
          disabled={numSelected === 0 || navigation.state === "submitting"}
          size="small"
          type="submit"
        >
          Delete
        </Button>
      </Form>
    </Box>
  )
}
TableToolBar.propTypes = {
  tournamentIds: PropTypes.array.isRequired,
}

export async function deleteTemplateAction({ request }) {
  const formData = await request.formData()
  const tournamentIds = formData.get("tournament_ids").split(",")
  await deleteTournament(tournamentIds[tournamentIds.length - 1])
  return redirect("/tournament")
}

export async function archiveTemplateAction() {
  await sleep(2000)
  return redirect("/tournament")
}
