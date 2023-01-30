import React from "react"
import { Outlet, Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"
import { LogIn } from "../pages/LogIn"
import { SignUp } from "../pages/SignUp"
import { TournamentExampleComplete } from "../components/Tournament/TournamentExampleComplete"
import { TournamentExample } from "../components/Tournament/TournamentExample"
import {
  TournamentDetail,
  loader as tournamentDetailLoader,
} from "../components/Tournament/TournamentDetail"
import { Tournament, loader as tournamentsLoader } from "../pages/Tournament"
import {
  CreateTournament,
  action as createTournamentAction,
} from "../pages/CreateTournament"
import { LoggedOutHeader } from "../components/LoggedOutHeader"
import { Box } from "@mui/material"

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
          element={<TournamentDetail />}
          loader={tournamentDetailLoader}
        />
        <Route
          path="new"
          element={<CreateTournament />}
          action={createTournamentAction}
        />
        <Route path="example-one" element={<TournamentExample />} />
        <Route
          path="example-completed"
          element={<TournamentExampleComplete />}
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
