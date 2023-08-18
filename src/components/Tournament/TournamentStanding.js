import React from "react"
import PropTypes from "prop-types"
import { useLoaderData, defer, Await } from "react-router-dom"
import { getTournamentStanding } from "../../api/tournament"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { Paper, Box, Skeleton } from "@mui/material"
import { useTournamentContext } from "../../context/TournamentContext"

export function TournamentStanding() {
  const { tournamentData } = useTournamentContext()
  const { finalStanding } = useLoaderData()
  let standing
  if (finalStanding.length > 0) standing = finalStanding
  else {
    const participantsLength = tournamentData.participants.length
    const temp = Array(participantsLength)
      .fill()
      .map((_, index) => ({ name: "-", rank: index + 1 }))
    temp.forEach((participant, index) => {
      participant.rank = index + 1
    })
    standing = temp
  }

  return (
    <Box>
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
                key={participant.id || index}
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
                    <Box sx={{ ml: 3 }}>
                      <React.Suspense fallback={<div>{participant.rank}</div>}>
                        <Await
                          resolve={finalStanding}
                          errorElement={<div>Error Happened</div>}
                        >
                          {(finalStanding) => (
                            <div>
                              {finalStanding.length !== 0
                                ? finalStanding[index].rank
                                : participant.rank}
                            </div>
                          )}
                        </Await>
                      </React.Suspense>
                    </Box>
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 14 + (array.length - 1 - index) * 1 }}
                >
                  <React.Suspense
                    fallback={
                      <Skeleton variant="rounded" width={100} height={20} />
                    }
                  >
                    <Await
                      resolve={finalStanding}
                      errorElement={<div>Error Happened</div>}
                    >
                      {(finalStanding) => (
                        <div>
                          {finalStanding.length !== 0
                            ? finalStanding[index].name
                            : "-"}
                        </div>
                      )}
                    </Await>
                  </React.Suspense>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export function loader({ params }) {
  const tournamentId = params.id
  return defer({ finalStanding: getTournamentStanding(tournamentId) })
}

function StandingIcon({ src }) {
  return <Box component={"img"} src={src} width={40} height={40} />
}

StandingIcon.propTypes = {
  src: PropTypes.string.isRequired,
}
