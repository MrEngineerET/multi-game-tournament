import React from "react"
import { Route } from "react-router-dom"

/**
 *  /about
 *  /privacy_policy
 *  /terms_and_condition
 */

export const routes = (
  <Route>
    <Route path="/about" element={<div>This is about page</div>} />
    <Route
      path="/privacy_policy"
      element={<div>This is privacy_policy page</div>}
    />
    <Route
      path="/terms_and_condition"
      element={<div>This is the terms and condition page</div>}
    />
  </Route>
)
