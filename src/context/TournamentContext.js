import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"
import { useLoaderData } from "react-router-dom"
import { getTournament, updateTournament } from "../api/tournament"
import { catagorizeData, addParticipantNameInMatch } from "../testData"

const tournamentContext = createContext(null)

export const useTournamentContext = () => useContext(tournamentContext)

export const TournamentProvider = ({ children }) => {
  const { data } = useLoaderData()
  const [tournamentData, setTournamentData] = useState(data)

  const handleUpdateTournament = async (match) => {
    const newTournamentData = await updateTournament(match, tournamentData.id)
    setTournamentData(formatToUIModel(newTournamentData))
  }

  const value = {
    handleUpdateTournament,
    tournamentData,
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
  }
}

function formatToUIModel(data) {
  return catagorizeData(addParticipantNameInMatch(data))
}