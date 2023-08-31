import React from "react"
import {
  Form,
  defer,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom"
import { Box, Container, Stack, Typography } from "@mui/material"
import { BasicInfo } from "../components/Tournament/CreateTournament/BasicInfo"
import { GameInfo } from "../components/Tournament/CreateTournament/GameInfo"
import { createTournament, stageType } from "../api/tournament"
import { getAllGames } from "../api/game"
import { useAlert } from "../context/AlertContext"
import { AddParticipant } from "../components/Tournament/CreateTournament/AddParticipants"
import { LoadingButton } from "../components/Common/LoadingButton"

const styles = {
  bannerWrapper: (theme) => ({
    background: theme.palette.background.cucumberWater,
  }),
  banner: {
    px: { xs: 5, sm: 10, md: 20 },
    py: { xs: 10, sm: 25, md: 30 },
  },
  content: {
    pt: 10,
  },
}

export function CreateTournament() {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const submitting = navigation.state === "submitting"
  const actionData = useActionData()
  const alert = useAlert()

  React.useEffect(() => {
    if (actionData?.redirectURL) {
      navigate(actionData.redirectURL, { replace: true })
    }
    if (actionData?.error) {
      alert.showError(actionData.error)
    }
  }, [actionData])

  return (
    <Box>
      <Box sx={styles.bannerWrapper}>
        <Container sx={styles.banner}>
          <Typography variant="h3" component="h1">
            New Tournament
          </Typography>
        </Container>
      </Box>
      <Box>
        <Container sx={styles.content}>
          <Form method="post">
            <Stack gap={10} sx={{ width: { xs: "100%", md: "80%" } }}>
              <BasicInfo disableInputs={submitting} />
              <AddParticipant disableInputs={submitting} />
              <GameInfo />
              <Box align="right">
                <LoadingButton type="submit" loading={submitting}>
                  Save and continue
                </LoadingButton>
              </Box>
            </Stack>
          </Form>
          <Box sx={{ padding: 40 }} />
        </Container>
      </Box>
    </Box>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = {}

  let participants = formData.get("participants").split(",")
  participants = participants.map((p) => {
    if (p) return p.trim()
    return null
  })
  participants = participants.filter((p) => p)

  if (participants.length < 2)
    return { error: "Number of participants must be greater than 2" }
  data.participants = participants
  const selectedGames = JSON.parse(formData.get("selected_games"))
  data.games = selectedGames.map((g) => ({ gameId: g._id, count: g.count }))
  data.name = formData.get("tournament_name")
  data.description = formData.get("tournament_desc")
  data.stageType = formData.get("stage_type")
  if (data.stageType === stageType.singleElimination)
    data.consolationFinal = formData.get("consolation_final") === "true"
  else if (data.stageType === stageType.doubleElimination) {
    data.grandFinal = formData.get("grand_final")
  }
  try {
    const tournament = await createTournament(data)
    return { redirectURL: `/tournament/${tournament._id}` }
  } catch (error) {
    if (error.response?.data?.message)
      return { error: error.response.data.message }
    else throw error
  }
}

export async function loader() {
  const gamesPromise = getAllGames(true)
  return defer({ games: gamesPromise })
}
