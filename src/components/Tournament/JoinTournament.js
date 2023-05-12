import React from "react"
import {
  Form,
  useNavigation,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom"
import { Box, Container, TextField, Typography, Stack } from "@mui/material"
import { LoadingButton } from "../Common/LoadingButton"
import { getTournament, joinTournament } from "../../api/tournament"
import { useAlert } from "../../context/AlertContext"

export function JoinTournament() {
  const navigation = useNavigation()
  const navigate = useNavigate()
  const actionData = useActionData()
  const loaderData = useLoaderData()
  const alert = useAlert()

  React.useEffect(() => {
    if (loaderData?.redirect) navigate(loaderData.redirect, { replace: true })
    if (actionData?.redirect) navigate(actionData.redirect, { replace: true })
    if (actionData?.error) alert.showError(actionData.error)
  }, [loaderData, actionData])

  return (
    <Box>
      <Container maxWidth="md" sx={{ pt: { xs: 5, md: 10 } }}>
        <Stack gap={5}>
          <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
            Join Tournament
          </Typography>
          <Typography>
            Could you kindly provide us with your first name, so that we may
            grant you access?
          </Typography>
          <Form method="post">
            <TextField
              name="firstName"
              type="text"
              required
              label="First Name"
              variant="outlined"
              autoFocus
              disabled={navigation.state === "submitting"}
              sx={{ width: "350px", mb: 3 }}
            />
            <br />
            <LoadingButton
              type="submit"
              loading={navigation.state === "submitting"}
              sx={{ mt: 2 }}
            >
              {navigation.state === "submitting" ? "Joining →" : "Join →"}
            </LoadingButton>
          </Form>
        </Stack>
      </Container>
    </Box>
  )
}

export async function loader({ params }) {
  try {
    const tournamentId = params.id
    const tournament = await getTournament(tournamentId)
    // if the tournament is found it means the user is already joined
    if (tournament) return { redirect: `/tournament/${tournamentId}` }
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
    await joinTournament(id, firstName)
    return { redirect: `/tournament/${id}` }
  } catch (error) {
    console.log("idid", "error-----> ", error)
    if (error?.response?.data?.message)
      return { error: error.response.data.message }
    return null
  }
}
