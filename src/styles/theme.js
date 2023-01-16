import {
  createTheme as muiCreateTheme,
  responsiveFontSizes,
} from "@mui/material"

const lightModePalette = {
  mode: "light",
}
const darkModePalette = {
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
  common: {
    black: "#1D1D1D",
    white: "#fff",
  },
  text: {
    primary: "#fff",
    secondary: "#B2BAC2",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)",
  },
  grey: {
    contrastText: "#6F7E8C",
    A100: "#f5f5f5",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161",
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
}

const themeWithoutPalette = {}

function createTheme(themeMode = "light") {
  const theme = muiCreateTheme({
    palette: themeMode === "dark" ? darkModePalette : lightModePalette,
    ...themeWithoutPalette,
  })
  return responsiveFontSizes(theme, { factor: 2 })
}

const lightTheme = createTheme("light")
const darkTheme = createTheme("dark")

export function getTheme(themeMode) {
  return themeMode === "dark" ? darkTheme : lightTheme
}
