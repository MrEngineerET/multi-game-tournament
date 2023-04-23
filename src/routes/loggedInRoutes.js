import React from "react"
import { Outlet, Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"

import { Tournament, loader as tournamentsLoader } from "../pages/Tournament"
import {
  CreateTournament,
  action as createTournamentAction,
  loader as createTournamentLoader,
} from "../pages/CreateTournament"

import {
  TournamentProvider,
  loader as tournamentDetailLoader,
  action as tournamentAction,
} from "../context/TournamentContext"
import { ErrorPage } from "../pages/ErrorPage"
import { Game, loader as gameLoader } from "../pages/Game"
import { action as deleteGameAction } from "../pages/deleteGame"
import { CreateGame, action as createGameAction } from "../pages/CreateGame"
import {
  EditGame,
  laoder as editGameLoader,
  action as editGameAction,
} from "../pages/EditGame"

import { TournamentBracket } from "../components/Tournament/TournamentBracket"
import {
  TournamentParticipants,
  action as addParticipantAction,
} from "../components/Tournament/Participants/TournamentParticipants"
import {
  TournamentSettings,
  action as updateTournamentAction,
} from "../components/Tournament/TournamentSettings"
import {
  archiveTemplateAction,
  deleteTemplateAction,
} from "../components/TournamentPage/TableToolBar"

export const routes = (
  <Route
    path="/"
    element={
      <div className="root">
        <div className="menubar">This is the Navigation bar</div>
        <div>
          <Outlet />
        </div>
      </div>
    }
    errorElement={<ErrorPage />}
  >
    <Route index element={<LandingPage />} />
    <Route path="tournament">
      <Route index element={<Tournament />} loader={tournamentsLoader} />
      <Route
        path=":id"
        element={<TournamentProvider />}
        loader={tournamentDetailLoader}
        errorElement={<ErrorPage />}
        action={tournamentAction}
      >
        <Route
          index
          element={<TournamentBracket />}
          errorElement={<ErrorPage />}
        ></Route>
        <Route
          path="participants"
          element={<TournamentParticipants />}
          errorElement={<ErrorPage />}
          action={addParticipantAction}
        ></Route>
        <Route
          path="settings"
          element={<TournamentSettings />}
          loader={createTournamentLoader}
          action={updateTournamentAction}
          errorElement={<ErrorPage />}
        ></Route>
      </Route>
      <Route
        path="new"
        element={<CreateTournament />}
        action={createTournamentAction}
        loader={createTournamentLoader}
      />
      <Route path="destroy" action={deleteTemplateAction} />
      <Route path="archive" action={archiveTemplateAction} />
    </Route>
    <Route path="game" element={<Game />} loader={gameLoader} />
    <Route path="game/new" element={<CreateGame />} action={createGameAction} />
    <Route
      path="game/:id/edit"
      element={<EditGame />}
      loader={editGameLoader}
      action={editGameAction}
    />
    <Route path="game/:id/destroy" action={deleteGameAction} />
    <Route path="/profile" element={<div>This is the profile page</div>} />
  </Route>
)

//TODO:
// handle loggedout routes when accessed being loggedin
