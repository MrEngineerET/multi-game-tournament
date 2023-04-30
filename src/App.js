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
import { useAuth } from "./context/AuthContext"
import { CssBaseline } from "@mui/material"
// import { Button } from "@mui/material"
// import { themeModeContext } from "./index"
import { ErrorPage } from "./pages/ErrorPage"

function App() {
  const { user } = useAuth()
  // const themeMode = useContext(themeModeContext)

  let routes
  if (user) routes = loggedInRoutes
  else routes = loggedOutRoutes

  routes = (
    <Route path="/" errorElement={<ErrorPage />}>
      {routes}
      {commonRoutes}
    </Route>
  )

  const router = createBrowserRouter(createRoutesFromElements(routes))
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
      {/* <Button
        sx={{
          position: "fixed",
          bottom: 0,
        }}
        variant="text"
        onClick={themeMode.changeThemeMode}
      >
        Change to Dark Mode
      </Button> */}
    </>
  )
}

export default App
