import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useNavigation, useLocation } from "react-router-dom"
import { Box, Typography, ButtonBase } from "@mui/material"
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

import { Avatar, AvatarGroup } from "@mui/material"
import { TableToolBar } from "./TableToolBar"

export function TournamentListTable({ tournaments }) {
  const location = useLocation()
  const [selected, setSelected] = React.useState([])

  useEffect(() => {
    function filterSelectedTournament() {
      const filtered = selected.filter((id) => {
        const index = tournaments.findIndex((el) => el._id === id)
        if (index !== -1) return id
      })
      setSelected(filtered)
    }
    filterSelectedTournament()
  }, [location.key])

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

  return (
    <Box sx={[addOpacity && { opacity: 0.6 }]}>
      <TableToolBar tournamentIds={selected} />
      <TableContainer component={Paper} sx={{ maxHeight: 600 }} elevation={0}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
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
          {tournaments.length !== 0 ? (
            <TableBody>
              {tournaments.map((tournament) => (
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
                  <TableCell align="right">Created </TableCell>
                  <TableCell align="right">Progress </TableCell>
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
                    {tournament.game.length}{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Typography>No result were found</Typography>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
    </Box>
  )
}

TournamentListTable.propTypes = {
  tournaments: PropTypes.array,
}
