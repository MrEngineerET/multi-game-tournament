import React from "react"
import { Outlet, Route } from "react-router-dom"
import { LogIn, action as logInAction } from "../pages/LogIn"
import { SignUp, action as signUpAction } from "../pages/SignUp"
import { LoggedOutHeader } from "../components/LoggedOutHeader"
import { Box } from "@mui/material"
import { ErrorPage } from "../pages/ErrorPage"
import TestingComponent from "../components/TestingComponent"

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
      errorElement={<ErrorPage />}
    >
      <Route index element={<div>landing page Tobe build</div>} />
    </Route>
    <Route path={"/login"} element={<LogIn />} action={logInAction} />
    <Route path="/signup" element={<SignUp />} action={signUpAction} />
    <Route
      path="forgot-password"
      element={<div>This is the forgot password page</div>}
    />
    <Route path="/testing" element={<TestingComponent />} />
  </Route>
)

//TODO: handle loggedin routes when accessed while being loggedout
