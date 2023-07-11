import React from "react"
import {
  Form,
  defer,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom"
import { Box, Container, Stack, Typography, Button } from "@mui/material"
import { BasicInfo } from "../components/Tournament/CreateTournament/BasicInfo"
import { GameInfo } from "../components/Tournament/CreateTournament/GameInfo"
import { createTournament } from "../api/tournament"
import { getAllGames } from "../api/game"
import { useAlert } from "../context/AlertContext"
import { AddParticipant } from "../components/Tournament/CreateTournament/AddParticipants"

const styles = {
  bannerWrapper: {
    bgcolor: "background.paper",
  },
  banner: {
    p: 20,
    pl: 5,
    pr: 5,
  },
  content: {
    pt: 10,
  },
}

export function CreateTournament() {
  const navigate = useNavigate()
  const navigation = useNavigation()
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
              <BasicInfo />
              <AddParticipant />
              <GameInfo />
              <Box align="right">
                <Button
                  type="submit"
                  disabled={navigation.state === "submitting"}
                >
                  Save and continue
                </Button>
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
  const name = formData.get("tournament_name")
  const description = formData.get("tournament_desc")
  const stageType = formData.get("stage_type")
  let participants = formData.get("participants").split(",")
  participants = participants.map((p) => {
    if (p) return p.trim()
    return null
  })
  participants = participants.filter((p) => p)
  let selectedGames = JSON.parse(formData.get("selected_games"))

  if (participants.length < 2)
    return { error: "Number of participants must be greater than 2" }
  try {
    const tournament = await createTournament({
      name,
      description,
      participants,
      stageType,
      games: selectedGames.map((g) => ({ gameId: g._id, count: g.count })),
    })
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
