import React, { useContext } from "react"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { routes as loggedInRoutes } from "./routes/loggedInRoutes"
import { routes as loggedOutRoutes } from "./routes/loggedOutRoutes"
import { routes as commonRoutes } from "./routes/commonRoutes"
import { useAuth } from "./context/AuthContext"
import { CssBaseline } from "@mui/material"
import { Button } from "@mui/material"
import { themeModeContext } from "./index"

import "./App.css"

function App() {
  const { user } = useAuth()
  const themeMode = useContext(themeModeContext)

  let routes
  if (user) routes = loggedInRoutes
  else routes = loggedOutRoutes

  routes = (
    <Route>
      {routes}
      {commonRoutes}
    </Route>
  )

  const router = createBrowserRouter(createRoutesFromElements(routes))
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
      <Button variant="text" onClick={themeMode.changeThemeMode} sx={{ mt: 5 }}>
        Change to Dark Mode
      </Button>
    </>
  )
}

export default App
