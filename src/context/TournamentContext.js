/*eslint-disable */
import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"
import { useLoaderData, redirect, defer, Await } from "react-router-dom"
import { getTournament } from "../api/tournament"
import {
  catagorizeData,
  addParticipantNameInMatch,
} from "../utils/dataProcessors"
import {
  MatchScoreAndDetailDialog,
  tabs as matchEditDialogTabs,
} from "../components/Tournament/Match/MatchScoreAndDetailDialog"
import { updateMatchAction } from "../components/Tournament/Match/ReportScore"
import { updateTournament } from "../api/tournament"
import { ErrorPage } from "../pages/ErrorPage"
import { TournamentDetailSkeleton } from "../components/Tournament/TournamentDetailSkeleton"

const tournamentContext = createContext(null)

export const useTournamentContext = () => useContext(tournamentContext)

export const TournamentProvider = ({ children }) => {
  const { data } = useLoaderData()
  const [openMatchDialog, setOpenMatchDialog] = useState({
    status: false,
    tab: matchEditDialogTabs.reportScore,
    match: null,
  })

  const openMatchScoreEditDialog = (match, tab) => {
    setOpenMatchDialog({
      status: true,
      match: match,
      tab,
    })
  }

  const getMatch = (matchId) => {
    return data.match.find((m) => m.id == matchId)
  }
  const value = {
    getMatch,
    openMatchScoreEditDialog,
  }
  if (value)
    return (
      <React.Suspense fallback={<TournamentDetailSkeleton />}>
        <Await resolve={data} errorElement={<ErrorPage />}>
          {(data) => {
            value.tournamentData = formatToUIModel(data)
            return (
              <tournamentContext.Provider value={value}>
                {children}
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
                />
              </tournamentContext.Provider>
            )
          }}
        </Await>
      </React.Suspense>
    )
}

TournamentProvider.propTypes = {
  children: PropTypes.node,
}

export function loader({ params }) {
  try {
    const tournamentId = params.id
    const tournamentPromise = getTournament(tournamentId)
    return defer({
      data: tournamentPromise,
    })
  } catch (error) {
    if (error?.response?.status === 401) {
      return redirect(`/tournament/${params.id}/join`)
    } else throw error
  }
}

function formatToUIModel(data) {
  return catagorizeData(addParticipantNameInMatch(data))
}

export async function action({ request, params }) {
  // update a tournament
  const url = new URL(request.url)
  const matchId = url.searchParams.get("match_id")
  try {
    if (matchId) {
      await updateMatchAction(request, params)
    } else {
      const formData = await request.formData()
      const status = formData.get("status")
      if (status) {
        const { id } = params
        await updateTournament(id, { status })
      }
      return null
    }
  } catch (error) {
    if (error?.response?.data?.message)
      return { error: error.response.data.message }
    return null
  }
}
