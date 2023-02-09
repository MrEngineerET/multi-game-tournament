import React from "react"
import { Outlet, Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"
import { LogIn } from "../pages/LogIn"
import { SignUp } from "../pages/SignUp"
import { TournamentDetail } from "../components/Tournament/TournamentDetail"
import { Tournament, loader as tournamentsLoader } from "../pages/Tournament"
import {
  CreateTournament,
  action as createTournamentAction,
} from "../pages/CreateTournament"
import { LoggedOutHeader } from "../components/LoggedOutHeader"
import { Box } from "@mui/material"
import {
  TournamentProvider,
  loader as tournamentDetailLoader,
} from "../context/TournamentContext"
import { ErrorPage } from "../pages/ErrorPage"

/**
 *  /login
 *  /signup
 *  /forgot_password
 */

export const routes = (
  <Route>
    <Route
      path="/"
      element={
        <Box>
          <LoggedOutHeader />
          <Outlet />
        </Box>
      }
    >
      <Route index element={<LandingPage />} />
      <Route path="tournament">
        <Route index element={<Tournament />} loader={tournamentsLoader} />
        <Route
          path=":id"
          element={
            <TournamentProvider>
              <TournamentDetail />
            </TournamentProvider>
          }
          loader={tournamentDetailLoader}
          errorElement={<ErrorPage />}
        />
        <Route
          path="new"
          element={<CreateTournament />}
          action={createTournamentAction}
        />
      </Route>
    </Route>
    <Route path={"/login"} element={<LogIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route
      path="forgot-password"
      element={<div>This is the forgot password page</div>}
    />
  </Route>
)

//TODO: handle loggedin routes when accessed while being loggedout
