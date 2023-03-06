import React, { createContext, useContext } from "react"
import PropTypes from "prop-types"
import { useLoaderData } from "react-router-dom"
import { getTournament } from "../api/tournament"
import {
  catagorizeData,
  addParticipantNameInMatch,
} from "../utils/dataProcessors"

const tournamentContext = createContext(null)

export const useTournamentContext = () => useContext(tournamentContext)

export const TournamentProvider = ({ children }) => {
  const { data, rawData } = useLoaderData()

  const getMatch = (matchId) => {
    return rawData.match.find((m) => m.id == matchId)
  }
  const value = {
    getMatch,
    tournamentData: data,
  }
  return (
    <tournamentContext.Provider value={value}>
      {children}
    </tournamentContext.Provider>
  )
}

TournamentProvider.propTypes = {
  children: PropTypes.node,
}

export async function loader({ params }) {
  const tournamentId = params.id
  const tournament = await getTournament(tournamentId)
  return {
    data: formatToUIModel(tournament),
    rawData: tournament,
  }
}

function formatToUIModel(data) {
  return catagorizeData(addParticipantNameInMatch(data))
}
