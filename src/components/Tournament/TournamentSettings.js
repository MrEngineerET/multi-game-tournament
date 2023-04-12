import React from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material"
import { useMediaQuery, useTheme } from "@mui/material"
import {
  stageType,
  updateTournament,
  removeGameFromTournament,
  addGameToTouranment,
  updateGameInTournament,
} from "../../api/tournament"
import { GameInfo } from "./CreateTournament/GameInfo"
import { useTournamentContext } from "../../context/TournamentContext"
import { useFetcher } from "react-router-dom"

export function TournamentSettings() {
  const fetcher = useFetcher()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const { tournamentData } = useTournamentContext()
  const name = tournamentData.name
  const description = tournamentData.description
  const selectedStageType = tournamentData.stages[0].type
  const [changeDetected, setChangeDetected] = React.useState(false)
  React.useEffect(() => {
    if (
      fetcher.data?.status === "success" &&
      fetcher.data?.intent === "edit_basic"
    ) {
      setChangeDetected(false)
    }
  }, [fetcher.data])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: { xs: "100%", md: "75%" },
        maxWidth: "700px",
      }}
    >
      <Card>
        <CardHeader title="Basic Info" sx={{ bgcolor: "background.default" }} />
        <CardContent>
          <fetcher.Form method="post">
            <Stack gap={5}>
              <TextField
                label="Tournament name"
                required
                fullWidth
                name="tournament_name"
                variant="outlined"
                size={isSmallScreen ? "small" : "normal"}
                defaultValue={name}
                disabled={fetcher.state === "submitting"}
                onChange={() => {
                  setChangeDetected(true)
                }}
              />

              <TextField
                label="Description"
                fullWidth
                name="tournament_description"
                variant="outlined"
                multiline
                minRows={3}
                maxRows={5}
                size={isSmallScreen ? "small" : "normal"}
                required
                defaultValue={description}
                disabled={fetcher.state === "submitting"}
                onChange={() => {
                  setChangeDetected(true)
                }}
              />

              <TextField
                label="Type"
                name="stage_type"
                fullWidth
                select
                defaultValue={selectedStageType}
                size={isSmallScreen ? "small" : "normal"}
                disabled={fetcher.state === "submitting"}
                onChange={() => {
                  setChangeDetected(true)
                }}
              >
                <MenuItem value={stageType.singleElimination}>
                  Single Elimination
                </MenuItem>
                <MenuItem value={stageType.doubleElimination}>
                  Double Elimination
                </MenuItem>
              </TextField>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
              <Button
                type="submit"
                name="intent"
                value="edit_basic"
                disabled={fetcher.state === "submitting" || !changeDetected}
              >
                Save
              </Button>
            </Box>
          </fetcher.Form>
        </CardContent>
      </Card>
      <fetcher.Form method="post">
        <GameInfo
          showSaveButton
          selectedGames={tournamentData.games.map((g) => ({
            ...g.gameId,
            count: g.count,
          }))}
          submitDisabled={fetcher.state === "submitting"}
        />
      </fetcher.Form>
      {/* invisible layout Element */}
      <Box
        sx={{
          height: 200,
          visibility: "hidden",
        }}
      />
    </Box>
  )
}

export async function action({ request, params }) {
  const { id: tournamentId } = params
  let formData = await request.formData()
  formData = Object.fromEntries(formData)
  if (formData.intent === "edit_basic") {
    const updates = {}
    if (formData.tournament_name) {
      updates.name = formData.tournament_name
    }
    if (formData.tournament_description) {
      updates.description = formData.tournament_description
    }
    if (formData.stage_type) {
      updates.stageType = formData.stage_type
    }
    await updateTournament(tournamentId, updates)
    return { status: "success", intent: "edit_basic" }
  } else if (formData.intent === "edit_game") {
    const initialSelectedValues = JSON.parse(formData.initial_values)
    const updatedGames = JSON.parse(formData.selected_games).map((g) => ({
      gameId: g._id,
      count: g.count,
    }))

    const newGames = updatedGames.filter((g) => {
      return !initialSelectedValues.find((i) => i._id === g.gameId)
    })
    const countUpdatedGames = updatedGames.filter((g) => {
      return initialSelectedValues.find(
        (i) => i._id === g.gameId && i.count !== g.count,
      )
    })

    const deletedGames = initialSelectedValues.filter((g) => {
      return !updatedGames.find((i) => i.gameId === g._id)
    })

    for (let i = 0; i < deletedGames.length; i++) {
      await removeGameFromTournament(tournamentId, deletedGames[i]._id)
    }

    for (let i = 0; i < newGames.length; i++) {
      await addGameToTouranment(
        tournamentId,
        newGames[i].gameId,
        newGames[i].count,
      )
    }

    for (let i = 0; i < countUpdatedGames.length; i++) {
      await updateGameInTournament(tournamentId, countUpdatedGames[i].gameId, {
        count: countUpdatedGames[i].count,
      })
    }
    return { status: "success", intent: "edit_game" }
  }
  return { status: "success" }
}
