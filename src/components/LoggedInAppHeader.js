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

export function LoggedInAppBar() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    try {
      await auth.logout()
      navigate("/")
    } catch (error) {
      console.log("error", error)
    }
  }
  return (
    <>
      <AppBar position="relative">
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Link
                to={"/"}
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                <Typography variant="h6" component="div">
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
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
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
