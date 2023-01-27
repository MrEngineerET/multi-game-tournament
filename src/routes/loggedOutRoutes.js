import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"
import { LogIn } from "../pages/LogIn"
import { SignUp } from "../pages/SignUp"
import { BracketExample } from "../pages/BracketExample"
import { Tournament } from "../components/Tournament/Tournament"
import { CreateTournament } from "../pages/CreateTournament"
/**
 *  /login
 *  /signup
 *  /forgot_password
 */

export const routes = (
  <Route path="/">
    <Route index element={<LandingPage />} />
    <Route path={"login"} element={<LogIn />} />
    <Route path="signup" element={<SignUp />} />
    <Route
      path="forgot-password"
      element={<div>This is the forgot password page</div>}
    />
    <Route path="tournament">
      <Route path="create" element={<CreateTournament />} />
      <Route path="example-one" element={<Tournament />} />
      <Route path="example-completed" element={<BracketExample />} />
    </Route>
  </Route>
)

//TODO: handle loggedin routes when accessed while being loggedout
