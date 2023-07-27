import React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material"
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { FormLabel, RadioGroup, Radio, FormControl } from "@mui/material"
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
  const fetcherBasic = useFetcher()
  const fetcherGame = useFetcher()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const { tournamentData } = useTournamentContext()
  const isPending = tournamentData.status === "pending"
  const stage = tournamentData.stages[0]
  const [selectedStageType, setSelectedStageType] = React.useState(
    () => stage.type,
  )
  const [consolationFinal, setConsolationFinal] = React.useState(
    stage.settings.consolationFinal,
  )

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
          <fetcherBasic.Form method="post">
            <Stack gap={5}>
              <TextField
                label="Tournament name"
                required
                fullWidth
                name="tournament_name"
                variant="outlined"
                size={isSmallScreen ? "small" : "normal"}
                defaultValue={tournamentData.name}
                disabled={fetcherBasic.state === "submitting"}
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
                defaultValue={tournamentData.description}
                disabled={fetcherBasic.state === "submitting"}
              />
              <Box>
                <TextField
                  label="Type"
                  name="stage_type"
                  fullWidth
                  select
                  value={selectedStageType}
                  onChange={(e) => {
                    setSelectedStageType(e.target.value)
                  }}
                  size={isSmallScreen ? "small" : "normal"}
                  disabled={fetcherBasic.state === "submitting" || !isPending}
                >
                  <MenuItem value={stageType.singleElimination}>
                    Single Elimination
                  </MenuItem>
                  <MenuItem value={stageType.doubleElimination}>
                    Double Elimination
                  </MenuItem>
                </TextField>
                {selectedStageType === stageType.singleElimination && (
                  <FormControlLabel
                    label={
                      <Typography sx={{ ml: 5, fontSize: 14 }}>
                        Third Place Match
                      </Typography>
                    }
                    labelPlacement="start"
                    name="consolation_final"
                    value={consolationFinal}
                    checked={consolationFinal}
                    onChange={(e) => {
                      setConsolationFinal(e.target.checked)
                    }}
                    control={<Checkbox size="small" />}
                    disabled={!isPending}
                  />
                )}
                {selectedStageType === stageType.doubleElimination && (
                  <FormControl sx={{ ml: 10, mt: 1 }} disabled={!isPending}>
                    <FormLabel
                      id="demo-radio-buttons-group-label"
                      sx={{ fontSize: 14 }}
                    >
                      Grand Final
                    </FormLabel>
                    <RadioGroup
                      defaultValue={stage.settings.grandFinal}
                      name="grand_final"
                    >
                      <FormControlLabel
                        value="single"
                        control={
                          <Radio
                            sx={{
                              py: 1.5,
                              "& .MuiSvgIcon-root": {
                                fontSize: 16,
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: 14 }}>Single</Typography>
                        }
                      />
                      <FormControlLabel
                        value="double"
                        control={
                          <Radio
                            sx={{
                              py: 1.5,
                              "& .MuiSvgIcon-root": {
                                fontSize: 16,
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: 14 }}>Double</Typography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              </Box>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
              <Button
                type="submit"
                name="intent"
                value="edit_basic"
                disabled={fetcherBasic.state === "submitting"}
              >
                {fetcherBasic.state === "submitting" ? "Saving..." : "Save"}
              </Button>
            </Box>
          </fetcherBasic.Form>
        </CardContent>
      </Card>
      <fetcherGame.Form method="post">
        <GameInfo
          showSaveButton
          selectedGames={tournamentData.games.map((g) => ({
            ...g.gameId,
            count: g.count,
          }))}
          disableForm={fetcherGame.state === "submitting" || !isPending}
        />
      </fetcherGame.Form>
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
      if (formData.stage_type === stageType.singleElimination)
        updates.consolationFinal = formData.consolation_final === "true"
      if (formData.stage_type === stageType.doubleElimination)
        updates.grandFinal = formData.grand_final
    }
    await updateTournament(tournamentId, updates)
    return { status: "success", intent: "edit_basic" }
  }

  if (formData.intent === "edit_game") {
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
