import React from "react"
import { Outlet, Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"
import { ProtectedRoute, RestrictedRoute } from "./util"
import { AlertProvider } from "../context/AlertContext"
import { AuthProvider } from "../context/AuthContext"
import { LogIn, action as loginAction } from "../pages/LogIn"
import { SignUp, action as signupAction } from "../pages/SignUp"
import TestingComponent from "../components/TestingComponent"

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
import {
  Game,
  loader as gameLoader,
  action as deleteGameAction,
} from "../pages/Game"
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
import { AppHeaderBar } from "../components/AppHeaderBar"
import {
  JoinTournament,
  action as joinTournamentAction,
  loader as joinTouramentLoader,
} from "../components/Tournament/JoinTournament"
import { Dashboard } from "../pages/Dashboard"

export const routes = (
  <Route
    path="/"
    element={
      <AlertProvider>
        <Outlet />
      </AlertProvider>
    }
  >
    <Route
      path="/"
      element={
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      }
      errorElement={<ErrorPage />}
    >
      <Route
        path="/"
        element={
          <>
            <AppHeaderBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<LandingPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="/tournament">
            <Route index element={<Tournament />} loader={tournamentsLoader} />
            <Route
              path="new"
              element={<CreateTournament />}
              action={createTournamentAction}
              loader={createTournamentLoader}
            />
            <Route path="destroy" action={deleteTemplateAction} />
            <Route path="archive" action={archiveTemplateAction} />
          </Route>

          <Route
            path="/game"
            element={<Game />}
            loader={gameLoader}
            action={deleteGameAction}
          />
          <Route
            path="/game/new"
            element={<CreateGame />}
            action={createGameAction}
          />
          <Route
            path="/game/:id/edit"
            element={<EditGame />}
            loader={editGameLoader}
            action={editGameAction}
          />
          <Route
            path="/profile"
            element={<div>This is the profile page</div>}
          />
        </Route>

        <Route
          path="/tournament/:id"
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
          path="/tournament/:id/join"
          element={<JoinTournament />}
          loader={joinTouramentLoader}
          action={joinTournamentAction}
        />
      </Route>
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <RestrictedRoute role="admin">
              <Dashboard />
            </RestrictedRoute>
          </ProtectedRoute>
        }
        errorElement={<div>This is an error for a restricted page</div>}
      />

      {/* loggedout routes */}
      <Route path="/login" element={<LogIn />} action={loginAction} />
      <Route path="/signup" element={<SignUp />} action={signupAction} />
      <Route
        path="/forgot-password"
        element={<div>This is the forgot password page</div>}
      />
    </Route>
    {/* common routes */}
    <Route path="/testing" element={<TestingComponent />} />
    <Route path="/about" element={<div>This is about page</div>} />
    <Route
      path="/privacy_policy"
      element={<div>This is privacy policy page</div>}
    />
    <Route
      path="terms_and_condition"
      element={<div>This is the terms and condition page</div>}
    />
  </Route>
)

//TODO:
// handle loggedout routes when accessed being loggedin
