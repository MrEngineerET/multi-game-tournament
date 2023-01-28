import React from "react"
import { redirect } from "react-router-dom"
import { Box, Button, TextField } from "@mui/material"
import { Form } from "react-router-dom"
import { createTournament } from "../api/tournament"

export function CreateTournament() {
  return (
    <Box m={5}>
      <Form method="post">
        Tournament Name
        <TextField label="Tournament Name" variant="standard" />
        Participants
        <TextField label="Participants" placeholder="" />
        <Button type="submit">Submit</Button>
      </Form>
    </Box>
  )
}

export async function action() {
  const tournament = await createTournament()
  window.tournamentData = tournament
  return redirect(`/tournament/${tournament.number}`)
}
