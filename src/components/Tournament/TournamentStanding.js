import React from "react"
import PropTypes from "prop-types"
import { useLoaderData } from "react-router-dom"
import { getTournamentStanding } from "../../api/tournament"
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material"
import { useTournamentContext } from "../../context/TournamentContext"

export function TournamentStanding() {
  const { tournamentData } = useTournamentContext()
  const finalStanding = useLoaderData()
  let standing
  if (finalStanding.length > 0) standing = finalStanding
  else {
    const participantsLength = tournamentData.participants.length
    const temp = Array(participantsLength).fill({ name: "-", rank: "-" })
    temp.forEach((participant, index) => {
      participant.rank = index + 1
    })
    standing = temp
  }

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Standings
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#f8f8f8", borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Rank</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Participant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standing.map((participant, index, array) => (
              <TableRow
                key={participant.id}
                sx={{
                  "&:nth-of-type(even)": { backgroundColor: "#f1f1f1" },
                  height: 50 + (array.length - 1 - index) * 3,
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: 14 + (array.length - 1 - index) * 1,
                  }}
                >
                  {index === 0 ? (
                    <Box display="flex" alignItems="center">
                      <StandingIcon src={"/icons/medal_one.png"} />
                    </Box>
                  ) : index === 1 ? (
                    <Box display="flex" alignItems="center">
                      <StandingIcon src={"/icons/medal_two.png"} />
                    </Box>
                  ) : index === 2 ? (
                    <Box display="flex" alignItems="center">
                      <StandingIcon src={"/icons/medal_three.png"} />
                    </Box>
                  ) : (
                    <Box sx={{ ml: 3 }}>{participant.rank}</Box>
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 14 + (array.length - 1 - index) * 1 }}
                >
                  {participant.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export function loader({ params }) {
  const tournamentId = params.id
  return getTournamentStanding(tournamentId)
}

function StandingIcon({ src }) {
  return <Box component={"img"} src={src} width={40} height={40} />
}

StandingIcon.propTypes = {
  src: PropTypes.string.isRequired,
}
