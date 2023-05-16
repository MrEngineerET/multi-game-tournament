import React from "react"
import {
  Form,
  useNavigation,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom"
import { Box, Container, TextField, Typography } from "@mui/material"
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
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Join Tournament
          </Typography>
          <Form method="post">
            <Box sx={{ mt: 5, display: "flex", flexDirection: "column" }}>
              <TextField
                name="firstName"
                type="text"
                required
                label="First Name"
                variant="outlined"
                autoFocus
                disabled={navigation.state === "submitting"}
                sx={{ width: "330px" }}
              />
              <LoadingButton
                type="submit"
                loading={navigation.state === "submitting"}
                sx={{ mt: 3, mb: 2, width: "330px" }}
              >
                {navigation.state === "submitting" ? "Joining →" : "Join →"}
              </LoadingButton>
            </Box>
          </Form>
        </Box>
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
