import React from "react"
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Stack,
} from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"

export const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <Button variant="text" href="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Stack
          sx={{
            gap: 5,
            mt: 10,
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Simplify Tournament Management</Typography>
          <Button href="tournament/create">Generate Bracket</Button>
          <Button href="tournament/example-one">Example</Button>
          <Button href="tournament/example-completed">
            Example (completed)
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
