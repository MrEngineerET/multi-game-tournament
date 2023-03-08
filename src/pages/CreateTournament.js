import React from "react"
import { Form, redirect, defer } from "react-router-dom"
import { Box, Container, Stack, Typography, Button } from "@mui/material"
import { BasicInfo } from "../components/Tournament/CreateTournament/BasicInfo"
import { GameInfo } from "../components/Tournament/CreateTournament/GameInfo"
import { createTournament } from "../api/tournament"
import { getAllGames } from "../api/game"

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
              <GameInfo />
              <Box align="right">
                <Button type="submit">Save and continue</Button>
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
  const tournament = await createTournament({
    name,
    description,
    participants,
    stageType,
    games: selectedGames.map((g) => ({ gameId: g._id, count: g.count })),
  })
  return redirect(`/tournament/${tournament._id}`)
}

export async function loader() {
  const gamesPromise = getAllGames()
  return defer({ games: gamesPromise })
}
