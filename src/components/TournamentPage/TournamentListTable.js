import React from "react"
import PropTypes from "prop-types"
import { useNavigation } from "react-router-dom"
import { Box, Typography, ButtonBase, Button } from "@mui/material"
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Checkbox,
} from "@mui/material"
import { useMediaQuery } from "@mui/material"

import {
  Avatar,
  AvatarGroup,
  LinearProgress,
  CircularProgress,
} from "@mui/material"
import { TableToolBar } from "./TableToolBar"

export function TournamentListTable({ tournaments, filter }) {
  const [selected, setSelected] = React.useState([])
  const [isAllSelected, setIsAllSelected] = React.useState(false)
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  const filteredTournaments = tournaments.filter((tournament) => {
    if (filter == "all" || filter === null || filter.trim() === "") return true
    if (filter == "pending" && tournament.status === "pending") return true
    if (filter == "progress" && tournament.status === "progress") return true
    if (filter == "completed" && tournament.status === "completed") return true
    if (filter == "archived" && tournament.status === "archived") return true
    return false
  })

  const handleTournamentSelect = (event, _id) => {
    const selectedIndex = selected.indexOf(_id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }
  const isSelected = (_id) => selected.indexOf(_id) !== -1
  const navigation = useNavigation()
  const addOpacity =
    navigation.state === "submitting" || navigation.state === "loading"

  const getTournamentStatus = (tournament) => {
    if (tournament.status === "archived") return "Archived"
    if (isSmallScreen)
      return (
        <CircularProgressWithLabel
          value={tournament.progress}
          color="secondary"
        />
      )
    return (
      <LinearProgressWithLabel value={tournament.progress} color="secondary" />
    )
  }
  const getDate = (rawDate) => {
    if (!rawDate) return null
    const date = new Date(rawDate)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <Box sx={[addOpacity && { opacity: 0.6 }]}>
      <TableToolBar tournamentIds={selected} />
      <TableContainer component={Paper} sx={{ maxHeight: 600 }} elevation={0}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="secondary"
                  checked={isAllSelected}
                  onClick={() => {
                    setIsAllSelected((prev) => {
                      if (prev) setSelected([])
                      else setSelected(tournaments.map((t) => t._id))
                      return !prev
                    })
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>Name</TableCell>
              <TableCell sx={{ fontSize: "1rem" }} align="right">
                Created
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }} align="right">
                Progress
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }} align="right">
                Participants{" "}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: "1rem", pr: { sx: 4, sm: 6 } }}
              >
                Game{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          {filteredTournaments.length !== 0 ? (
            <TableBody>
              {filteredTournaments.map((tournament) => (
                <TableRow
                  key={tournament._id}
                  component={ButtonBase}
                  href={`${tournament._id}`}
                  onClick={(e) => {
                    if (selected.length !== 0) {
                      e.preventDefault()
                      handleTournamentSelect(e, tournament._id)
                    }
                  }}
                  hover
                  selected={isSelected(tournament._id)}
                >
                  <TableCell padding="checkbox" sx={{ zIndex: 0 }}>
                    <Checkbox
                      color="secondary"
                      checked={isSelected(tournament._id)}
                      onClick={(e) => {
                        handleTournamentSelect(e, tournament._id)
                        e.stopPropagation()
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>{tournament.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getDate(tournament.createdAt) ?? "-"}{" "}
                  </TableCell>
                  <TableCell align="right">
                    {getTournamentStatus(tournament)}{" "}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup
                      max={3}
                      total={tournament.participant.length}
                      sx={{
                        "& .MuiAvatar-root": {
                          width: 30,
                          height: 30,
                          fontSize: 13,
                        },
                      }}
                    >
                      {tournament.participant.map((participant, i) => {
                        if (i > 4) return ""
                        return (
                          <Avatar
                            key={i}
                            alt={participant.name.toUpperCase()}
                            src="/broken-image.jpg"
                          />
                        )
                      })}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right" sx={{ pr: { sx: 4, sm: 6 } }}>
                    {tournament.game.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  {filter === "all" ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "30vh",
                      }}
                    >
                      <Typography variant="h4" gutterBottom>
                        No tournaments were found
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        href="/tournament/new"
                      >
                        Create New Tournament
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "30vh",
                      }}
                    >
                      {filter === "pending" && (
                        <Typography variant="h4">
                          No Pending tournament were found
                        </Typography>
                      )}
                      {filter === "progress" && (
                        <Typography variant="h4">
                          No In progress tournament were found
                        </Typography>
                      )}
                      {filter === "completed" && (
                        <Typography variant="h4">
                          No Completed tournament were found
                        </Typography>
                      )}
                      {filter === "archived" && (
                        <Typography variant="h4">
                          No Archived tournament were found
                        </Typography>
                      )}
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  )
}

TournamentListTable.propTypes = {
  tournaments: PropTypes.array,
  filter: PropTypes.string,
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" color="secondary" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
}

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
}
