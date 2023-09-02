import React, { useEffect } from "react"
import { Box, Paper, TextField, Typography } from "@mui/material"
import { Grid } from "@mui/material"
import { LoadingButton } from "../components/Common/LoadingButton"
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
import { GoogleLoginButton } from "../components/GoogleButtons/GoogleLoginButton"

export function LogIn() {
  const showShowCasing = false
  const navigation = useNavigation()
  const [submitting, setSubmitting] = React.useState(
    navigation.state === "submitting",
  )
  const actionData = useActionData()
  const auth = useAuth()
  const navigate = useNavigate()
  const alert = useAlert()

  useEffect(() => {
    if (actionData?.error) {
      handleLoginFail(actionData.error)
      setSubmitting(false)
    }
    if (actionData?.token) {
      handleLoginSuccess()
    }
  }, [actionData])

  useEffect(() => {
    if (navigation.state === "submitting") setSubmitting(true)
  }, [navigation.state])

  function handleLoginSuccess() {
    auth.getIdentity().then(() => {
      navigate("/")
    })
  }
  function handleLoginFail(errorMessage) {
    alert.showError(errorMessage)
  }

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
        {showShowCasing && (
          <Box sx={{ flex: 1, height: "94vh", p: 2 }}>
            <Typography p={10}>Some info about the company</Typography>
          </Box>
        )}
        <Box
          sx={[
            {
              flex: 1,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              p: 2,
            },
            showShowCasing && { bgcolor: "#eee" },
          ]}
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
              maxWidth: 460,
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
              disabled={submitting}
              required
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
              disabled={submitting}
              required
            />
            <LoadingButton
              loading={submitting}
              sx={{
                maxWidth: 250,
                mt: 3,
              }}
              variant="contained"
              fullWidth
              size="large"
              type="submit"
            >
              Login
            </LoadingButton>

            <Box
              sx={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                width: 100,
                mt: 3,
              }}
            >
              <Typography
                type="body2"
                sx={{
                  bgcolor: "#fff",
                  zIndex: 2,
                  px: 1,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                OR
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  bgcolor: "#e0e0e0",
                  position: "absolute",
                  top: "50%",
                }}
              />
            </Box>
            <GoogleLoginButton
              onSuccess={handleLoginSuccess}
              onFail={handleLoginFail}
              setSubmitting={(val) => setSubmitting(val)}
            />
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password">
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
  const intent = formData.get("intent")

  if (intent === "googleSignIn") {
    const credential = formData.get("credential")
    try {
      const res = await authModule.logInWithGoogle(credential)
      return { token: res.token }
    } catch (error) {
      if (error.response?.data?.message) {
        return { error: error.response.data.message }
      }
      throw error
    }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  try {
    const res = await authModule.logInWithEmailAndPassword(email, password)
    console
    return { token: res.token }
  } catch (error) {
    if (error.response?.data?.message) {
      return { error: error.response.data.message }
    }
    throw error
  }
}
