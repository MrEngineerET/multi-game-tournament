import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "../pages/LandingPage"
/**
 *  /login
 *  /signup
 *  /forgot_password
 */

const Login = () => {
  return <div>This is the login page</div>
}

export const routes = (
  <Route>
    <Route path={"/"} element={<LandingPage />} />
    <Route path={"/login"} element={<Login />} />
    <Route path="/signup" element={<div>This is sign up page</div>} />
    <Route
      path="/forgot-password"
      element={<div>This is the forgot password page</div>}
    />
  </Route>
)

//TODO: handle loggedin routes when accessed while being loggedout
