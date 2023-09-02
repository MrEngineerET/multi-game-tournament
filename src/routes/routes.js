import React from "react"
import { Navigate, Outlet, Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"
import { ProtectedRoute, RestrictedRoute, OnlyLoggedOutRoutes } from "./util"
import { AlertProvider } from "../context/AlertContext"
import { AuthProvider } from "../context/AuthContext"
import { LogIn, action as loginAction } from "../pages/LogIn"
import { SignUp, action as signupAction } from "../pages/SignUp"
import TestingComponent from "../components/TestingComponent"
import { PageNotFound } from "../pages/PageNotFound"

import { Tournament, loader as tournamentsLoader } from "../pages/Tournament"
import {
  CreateTournament,
  action as createTournamentAction,
  loader as createTournamentLoader,
} from "../pages/CreateTournament"

import {
  TournamentProvider,
  action as tournamentAction,
  loader as tournamentDataLoader,
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
  TournamentStanding,
  loader as tournamentStandingLoader,
} from "../components/Tournament/TournamentStanding"
import {
  archiveTournamentAction,
  deleteTournamentAction,
} from "../components/TournamentPage/TableToolBar"
import { AppHeaderBar } from "../components/AppHeaderBar"
import {
  JoinTournament,
  action as joinTournamentAction,
  loader as joinTouramentLoader,
} from "../components/Tournament/JoinTournament"
import { DashBoardLayOut } from "../pages/Dashboard"
import { TournamentListErrorComponent } from "../components/TournamentPage/TournamentList"
import { TournamentDetail } from "../components/Tournament/TournamentDetail"
import {
  ForgotPassword,
  action as forgotPasswordAction,
} from "../pages/ForgotPassword"

export const routes = (
  <Route
    path="/"
    element={
      <AlertProvider>
        <Outlet />
      </AlertProvider>
    }
    errorElement={<ErrorPage />}
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
          errorElement={<ErrorPage />}
        >
          <Route index element={<LandingPage />} />
          <Route path="/tournament">
            <Route
              index
              element={<Tournament />}
              loader={tournamentsLoader}
              errorElement={<TournamentListErrorComponent />}
            />
            <Route
              path="new"
              element={<CreateTournament />}
              action={createTournamentAction}
              loader={createTournamentLoader}
            />
            <Route path="destroy" action={deleteTournamentAction} />
            <Route path="archive" action={archiveTournamentAction} />
          </Route>
          <Route
            path="/profile"
            element={<div>This is the profile page</div>}
          />
        </Route>

        <Route
          path="/tournament/:id"
          element={
            <TournamentProvider>
              <TournamentDetail />
            </TournamentProvider>
          }
          loader={tournamentDataLoader}
          errorElement={<ErrorPage />}
          action={tournamentAction}
        >
          <Route
            index
            element={<TournamentBracket />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="participants"
            element={<TournamentParticipants />}
            errorElement={<ErrorPage />}
            action={addParticipantAction}
          />
          <Route
            path="standing"
            element={<TournamentStanding />}
            loader={tournamentStandingLoader}
          />
          <Route
            path="settings"
            element={<TournamentSettings />}
            loader={createTournamentLoader}
            action={updateTournamentAction}
            errorElement={<ErrorPage />}
          />
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
              <DashBoardLayOut>
                <Outlet />
              </DashBoardLayOut>
            </RestrictedRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={"game"} />} />
        <Route path="users" element={<div>This is the users page</div>} />
        <Route
          path="game"
          element={<Game />}
          loader={gameLoader}
          action={deleteGameAction}
        />
        <Route
          path="game/new"
          element={<CreateGame />}
          action={createGameAction}
        />
        <Route
          path="game/:id/edit"
          element={<EditGame />}
          loader={editGameLoader}
          action={editGameAction}
        />
      </Route>

      {/* loggedout routes */}
      <Route
        element={
          <OnlyLoggedOutRoutes>
            <Outlet />
          </OnlyLoggedOutRoutes>
        }
      >
        <Route path="/login" element={<LogIn />} action={loginAction} />
        <Route path="/signup" element={<SignUp />} action={signupAction} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
          action={forgotPasswordAction}
        />
      </Route>
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
    <Route path="*" element={<PageNotFound />} />
  </Route>
)

//TODO:
// handle loggedout routes when accessed being loggedin
