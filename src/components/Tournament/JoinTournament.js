import React from "react"
import { Form, redirect, useNavigation } from "react-router-dom"
import { Box, Container, TextField, Typography } from "@mui/material"
import { LoadingButton } from "../Common/LoadingButton"
import { getTournament, joinTournament } from "../../api/tournament"
import LocalaStorage from "../../utils/localStorage"

export function JoinTournament() {
  const navigation = useNavigation()
  return (
    <Box>
      <Container maxWidth="xl">
        <Typography>Join Tournament</Typography>
        <Typography>
          Could you kindly provide us with your first name, so that we may grant
          you access?
        </Typography>
        <Form method="post">
          <TextField
            name="firstName"
            type="text"
            required
            label="First Name"
            fullWidth
            variant="outlined"
            autoFocus
          />
          <LoadingButton
            type="submit"
            loading={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "Joining →" : "Join →"}
          </LoadingButton>
        </Form>
      </Container>
    </Box>
  )
}

export async function loader({ params }) {
  try {
    const tournamentId = params.id
    const tournament = await getTournament(tournamentId)
    // if the tournament is found it means the user is already joined
    if (tournament) return redirect(`/tournament/${tournamentId}`)
    else return null
  } catch (error) {
    return null
  }
}

export async function action({ request, params }) {
  try {
    const formData = await request.formData()
    const firstName = formData.get("firstName")
    const { id } = params
    const res = await joinTournament(id, firstName)

    LocalaStorage.setItem("tournament_token", res.data.tournamentToken)
    return redirect(`/tournament/${id}`)
  } catch (error) {
    console.log("our error ", error)
    return null
  }
}
