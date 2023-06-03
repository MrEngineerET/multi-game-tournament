import React, { useState, createContext, useMemo } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme } from "./styles/theme"

export const themeModeContext = createContext({ mode: "light" })

function Root() {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [themeMode, setThemeMode] = useState(() => {
    // return prefersDarkMode ? "dark" : "light"
    return "light"
  })
  const theme = useMemo(() => getTheme(themeMode), [themeMode])

  const value = useMemo(
    () => ({
      changeThemeMode: () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
      themeMode: themeMode,
    }),
    [themeMode],
  )

  return (
    <React.StrictMode>
      <themeModeContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </themeModeContext.Provider>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Root />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
