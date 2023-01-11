import React from "react"
import { Route, Outlet } from "react-router-dom"

/**
 *  /tournament
 *  /game
 *  /profile
 */

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
  >
    <Route index element={<div>This is the dashboard</div>} />
    <Route path="/tournaments" element={<div>This is tournaments page</div>} />
    <Route path="/games" element={<div>This is games page</div>} />
    <Route path="/profile" element={<div>This is the profile page</div>} />
  </Route>
)

//TODO:
// handle loggedout routes when accessed being loggedin
