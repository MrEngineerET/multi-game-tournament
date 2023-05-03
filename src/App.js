import React from "react"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

import { CssBaseline } from "@mui/material"
import { routes } from "./routes/routes"
// import { Button } from "@mui/material"
// import { themeModeContext } from "./index"

function App() {
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
