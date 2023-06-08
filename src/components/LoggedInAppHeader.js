import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Container,
  Box,
} from "@mui/material"

import { AccountCircle } from "@mui/icons-material"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useAlert } from "../context/AlertContext"

export function LoggedInAppBar() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const alert = useAlert()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    alert.showInfo("Logging out ...")
    try {
      await auth.logout()
      navigate("/")
      alert.showSuccess("Logged out successfully")
    } catch (error) {
      console.log("error", error)
      alert.showError("Loggin out failed")
    }
  }
  return (
    <>
      <AppBar position="relative">
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              component="img"
              src="/icons/tournament.png"
              width="40px"
              height="40px"
            />
            <Box sx={{ flexGrow: 1 }}>
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: "text.primary" }}
                >
                  Tourney
                </Typography>
              </Link>
            </Box>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
