import React, { useState, useEffect } from "react"
import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  TextField,
  useMediaQuery,
  Button,
} from "@mui/material"
import { FormControl, InputLabel, Select, OutlinedInput } from "@mui/material"
import { Card, CardContent, CardHeader, Skeleton } from "@mui/material"
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import PropTypes from "prop-types"
import { useLoaderData, Await } from "react-router-dom"

export function GameInfo({ showSaveButton = false }) {
  const { games } = useLoaderData()
  return (
    <Card elevation={3}>
      <CardHeader title="Game Info" sx={{ bgcolor: "background.default" }} />
      <CardContent>
        <React.Suspense fallback={<Skeleton animation="wave" height="5rem" />}>
          <Await resolve={games}>
            {(games) => (
              <>
                <GameInfoContent games={games} />
                {showSaveButton && (
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", pt: 5 }}
                  >
                    <Button
                      type="submit"
                      name="intent"
                      value="edit_game"
                      sx={{ width: { xs: 100, md: 150 } }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Await>
        </React.Suspense>
      </CardContent>
    </Card>
  )
}

GameInfo.propTypes = {
  showSaveButton: PropTypes.bool,
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(game, selectedGames, theme) {
  return {
    fontWeight:
      selectedGames.indexOf(game) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}
function GameInfoContent({ games }) {
  const theme = useTheme()
  const [selectedGames, setSelectedGames] = useState([])
  const [availableGames, setAvailableGames] = useState(games)

  useEffect(() => {
    const updatedAvailableGames = availableGames.filter((ag) => {
      const index = selectedGames.findIndex((v) => v._id === ag._id)
      return index === -1 ? true : false
    })
    setAvailableGames(updatedAvailableGames)
  }, [games])

  const handleSelectGame = (event) => {
    const {
      target: { value },
    } = event

    // all this mess(serialization and deserialization) is due to unable to send object as a form data
    let parsedValue = value.map((v) => JSON.parse(v))
    parsedValue[0].push(parsedValue[1])
    parsedValue = parsedValue[0]

    setSelectedGames(parsedValue)
    const updatedAvailableGames = availableGames.filter((ag) => {
      const index = parsedValue.findIndex((v) => v._id === ag._id)
      return index === -1 ? true : false
    })
    setAvailableGames(updatedAvailableGames)
  }

  const handleGameDelete = (game) => {
    setSelectedGames(selectedGames.filter((g) => g._id !== game._id))
    setAvailableGames([game, ...availableGames])
  }

  const handleGameCountUpdate = (game) => {
    setSelectedGames((prev) =>
      prev.map((g) => {
        if (g._id === game._id) return { ...g, count: g.count + 1 }
        return g
      }),
    )
  }
  return (
    <>
      <FormControl sx={{ width: "100%", mb: { xs: 5, md: 10 } }}>
        <InputLabel>Game</InputLabel>
        <Select
          name="selected_games"
          multiple
          value={[JSON.stringify(selectedGames)]}
          onChange={handleSelectGame}
          renderValue={(s) => {
            const selected = JSON.parse(s)
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    onMouseDown={(event) => {
                      event.stopPropagation()
                      event.preventDefault()
                    }}
                    onDelete={() => {
                      handleGameDelete(value)
                    }}
                    key={value._id}
                    label={value.name}
                  />
                ))}
              </Box>
            )
          }}
          input={<OutlinedInput id="select-multiple-chip" label="Games" />}
          MenuProps={MenuProps}
        >
          {availableGames.length === 0 ? (
            <MenuItem key="dfad" sx={{ color: theme.palette.warning.dark }}>
              No available Game
            </MenuItem>
          ) : (
            availableGames.map((game) => (
              <MenuItem
                key={game._id}
                value={JSON.stringify({ ...game, count: 1 })}
                style={getStyles(game, selectedGames, theme)}
              >
                {game.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      <Box>
        <GameListTable
          onDelete={handleGameDelete}
          selectedGames={selectedGames}
          onGameCountUpdate={handleGameCountUpdate}
        />
      </Box>
    </>
  )
}

GameInfoContent.propTypes = {
  games: PropTypes.array.isRequired,
}

function GameListTable({ selectedGames, onDelete, onGameCountUpdate }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  if (selectedGames.length === 0) return ""
  return (
    <Table size={isSmallScreen ? "small" : "medium"}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">
            Count&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          </TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedGames.map((game) => (
          <TableRow
            key={game._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {game.name}
            </TableCell>
            <TableCell align="right">
              <TextField
                type="number"
                defaultValue={game.count}
                sx={{ width: 80 }}
                size="small"
                variant="outlined"
                onChange={() => {
                  onGameCountUpdate(game)
                }}
              />
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onDelete(game)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

GameListTable.propTypes = {
  onDelete: PropTypes.func.isRequired,
  selectedGames: PropTypes.array.isRequired,
  onGameCountUpdate: PropTypes.func.isRequired,
}
