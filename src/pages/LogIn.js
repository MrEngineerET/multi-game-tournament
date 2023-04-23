import React, { useEffect } from "react"
import { Box, Paper, TextField, Typography } from "@mui/material"
import { Button, Grid } from "@mui/material"
import { InputAdornment } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import {
  Form,
  useNavigation,
  Link,
  useActionData,
  useNavigate,
} from "react-router-dom"
import { auth as authModule } from "../utils/auth"
import { useAuth } from "../context/AuthContext"
import { useAlert } from "../context/AlertContext"
import { Copyright } from "../components/CopyRight"

export function LogIn() {
  const navigation = useNavigation()
  const actionData = useActionData()
  const auth = useAuth()
  const navigate = useNavigate()
  const alert = useAlert()

  useEffect(() => {
    if (actionData?.error) {
      alert(actionData.error)
    }
    if (actionData?.res) {
      auth.getIdentity().then(() => {
        navigate("/")
      })
    }
  }, [actionData])
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
              name="email"
              placeholder="Enter your email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              type="password"
              name="password"
              placeholder="Enter your password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
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

export const action = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  try {
    const res = await authModule.logInWithEmailAndPassword(email, password)
    return { res }
  } catch (error) {
    console.log("idid", "error", error)
    if (error.response?.data?.message) {
      return { error: error.response.data.message }
    }
    throw error
  }
}
