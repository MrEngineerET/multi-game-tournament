import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"
import { LogIn } from "../pages/LogIn"
import { SignUp } from "../pages/SignUp"
/**
 *  /login
 *  /signup
 *  /forgot_password
 */

export const routes = (
  <Route>
    <Route path={"/"} element={<LandingPage />} />
    <Route path={"/login"} element={<LogIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route
      path="/forgot-password"
      element={<div>This is the forgot password page</div>}
    />
  </Route>
)

//TODO: handle loggedin routes when accessed while being loggedout
