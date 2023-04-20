import React from "react"
import { Box, Paper, TextField, Typography } from "@mui/material"
import { Button, Grid } from "@mui/material"
import { InputAdornment } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import { Form, useNavigation, Link } from "react-router-dom"
import { sleep } from "../utils"

import { Copyright } from "../components/CopyRight"

export function LogIn() {
  const navigation = useNavigation()
  return (
    <Form method="post">
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
        }}
      >
        <Box sx={{ flex: 1, height: "94vh", p: 2 }}>
          <Typography p={10}>Some info about the company</Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "#eee",
            flex: 1,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: 2,
          }}
        >
          {/* layout element start */}
          <Box
            sx={{
              height: "150px",
            }}
          />
          {/* layout element end */}
          <Paper
            elevation={3}
            sx={{
              p: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              width: "100%",
              maxWidth: 400,
              mb: 4,
            }}
          >
            <Typography variant="h2" sx={{ mb: 3 }}>
              Welcome
            </Typography>
            <TextField
              variant="outlined"
              type="email"
              placeholder="Enter your email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "#e7f0fe",
              }}
            />
            <TextField
              variant="outlined"
              type="password"
              placeholder="Enter your password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "#e7f0fe",
              }}
            />
            <Button
              sx={{
                maxWidth: 200,
                mt: 3,
              }}
              variant="contained"
              fullWidth
              size="large"
              disabled={navigation.state === "submitting"}
              type="submit"
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#">
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup">
                  <Typography variant="body2" color="primary">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Paper>
        </Box>
      </Box>
    </Form>
  )
}

export const action = async () => {
  await sleep(2000)
  return null
}
