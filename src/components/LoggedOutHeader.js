import React from "react"
import { Button, AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"

export function LoggedOutHeader() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tourney
        </Typography>
        <Button variant="text" href="/login" sx={{ textTransform: "none" }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}
