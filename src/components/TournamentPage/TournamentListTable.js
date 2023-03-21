import React from "react"
import PropTypes from "prop-types"
import { Box, Typography, Button, ButtonBase } from "@mui/material"
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

import DeleteIcon from "@mui/icons-material/Delete"
import ArchiveIcon from "@mui/icons-material/Archive"

export function TournamentListTable({ tournaments }) {
  const [selected, setSelected] = React.useState([])

  const handleCheck = (event, _id) => {
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

  return (
    <Box>
      <TableToolBar selected={selected} />
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

          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow
                key={tournament._id}
                component={ButtonBase}
                href={`${tournament._id}`}
                onClick={(e) => {
                  if (selected.length !== 0) {
                    e.preventDefault()
                    handleCheck(e, tournament._id)
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
                      handleCheck(e, tournament._id)
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
        </Table>
      </TableContainer>
    </Box>
  )
}

TournamentListTable.propTypes = {
  tournaments: PropTypes.array,
}

function TableToolBar({ selected }) {
  const numSelected = selected.length
  function handleTournamentDelete() {}
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
        p: 2,
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: "1 1 100%" }}></Box>
      )}

      <Button
        startIcon={<ArchiveIcon />}
        variant="text"
        color="secondary"
        disabled={numSelected === 0}
        size="small"
      >
        Archive
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        variant="text"
        color="secondary"
        disabled={numSelected === 0}
        size="small"
        onClick={handleTournamentDelete}
      >
        Delete
      </Button>
    </Box>
  )
}
TableToolBar.propTypes = {
  selected: PropTypes.array.isRequired,
}
