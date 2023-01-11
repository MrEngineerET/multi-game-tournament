import React from "react"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { routes as loggedInRoutes } from "./routes/loggedInRoutes"
import { routes as loggedOutRoutes } from "./routes/loggedOutRoutes"
import { routes as commonRoutes } from "./routes/commonRoutes"
import "./App.css"

function App() {
  const loggedIn = false
  let routes

  if (loggedIn) routes = loggedInRoutes
  else routes = loggedOutRoutes

  routes = (
    <Route>
      {routes}
      {commonRoutes}
    </Route>
  )

  const router = createBrowserRouter(createRoutesFromElements(routes))
  return <RouterProvider router={router} />
}

export default App
