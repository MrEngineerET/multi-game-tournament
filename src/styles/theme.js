import React from "react"
import { Link as RouterLink } from "react-router-dom"
import PropTypes from "prop-types"
import {
  createTheme as muiCreateTheme,
  responsiveFontSizes,
} from "@mui/material"
import { deepmerge } from "@mui/utils"

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})
LinkBehavior.displayName = "LinkBehaviour"

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
}

const lightModeTheme = {
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f6",
      paper: "#ffffff",
    },
    primary: {
      main: "#FF466E",
    },
    secondary: {
      main: "#288CBE",
    },

    bracket: {
      background: "#58595E",
      score: "#777A7F",
      line: "#aaa",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }),
      },
    },
  },
}
const darkModeTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#3399FF",
      light: "#66B2FF",
      dark: "#0059B2",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    divider: "rgba(194, 224, 255, 0.08)",
    primaryDark: {
      main: "#5090D3",
    },
    background: {
      default: "#001E3C",
      paper: "#0A1929",
    },
    error: {
      main: "#EB0014",
      light: "#FF99A2",
      dark: "#C70011",
      contrastText: "#fff",
    },
    success: {
      main: "#1DB45A",
      light: "#6AE79C",
      dark: "#1AA251",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    warning: {
      main: "#DEA500",
      light: "#FFDC48",
      dark: "#AB6800",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#ce93d8",
      light: "#f3e5f5",
      dark: "#ab47bc",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
    bracket: {
      background: "#393737",
      score: "#554f4f",
      line: "#888",
    },
  },
}

const commonTheme = {
  spacing: 4,
  typography: {},
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
}

const lightTheme = createTheme("light")
const darkTheme = createTheme("dark")

export function getTheme(themeMode) {
  return themeMode === "dark" ? darkTheme : lightTheme
}

function createTheme(themeMode = "light") {
  const theme = muiCreateTheme(
    deepmerge(
      commonTheme,
      themeMode === "dark" ? darkModeTheme : lightModeTheme,
    ),
  )
  return responsiveFontSizes(theme, { factor: 2 })
}
