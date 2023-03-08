import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"
import { useLoaderData } from "react-router-dom"
import { getTournament } from "../api/tournament"
import {
  catagorizeData,
  addParticipantNameInMatch,
} from "../utils/dataProcessors"
import {
  MatchScoreAndDetailDialog,
  tabs as matchEditDialogTabs,
} from "../components/Tournament/Match/MatchScoreAndDetailDialog"
import { TournamentDetail } from "../components/Tournament/TournamentDetail"

const tournamentContext = createContext(null)

export const useTournamentContext = () => useContext(tournamentContext)

export const TournamentProvider = () => {
  const { data, rawData } = useLoaderData()
  const [openMatchDialog, setOpenMatchDialog] = useState({
    status: false,
    tab: matchEditDialogTabs.reportScore,
    match: null,
  })

  const openMatchScoreEditDialog = (match, tab, hideScoreEdit = false) => {
    setOpenMatchDialog({
      status: true,
      match: match,
      tab,
      hideScoreEdit,
    })
  }

  const getMatch = (matchId) => {
    return rawData.match.find((m) => m.id == matchId)
  }
  const value = {
    getMatch,
    tournamentData: data,
    openMatchScoreEditDialog,
  }
  return (
    <tournamentContext.Provider value={value}>
      <TournamentDetail />
      <MatchScoreAndDetailDialog
        open={openMatchDialog.status}
        onClose={() =>
          setOpenMatchDialog((prev) => ({
            ...prev,
            status: false,
          }))
        }
        match={openMatchDialog.match}
        tab={openMatchDialog.tab}
        hideScoreEdit={openMatchDialog.hideScoreEdit}
      />
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
