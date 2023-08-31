import React, { useEffect } from "react"
import { Box, Paper, TextField, Typography } from "@mui/material"
import { Grid } from "@mui/material"
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
import { Copyright } from "../components/CopyRight"
import { useAlert } from "../context/AlertContext"
import { LoadingButton } from "../components/Common/LoadingButton"
import { GoogleSignUpButton } from "../components/GoogleButtons/GoogleSignUpButton"

export function SignUp() {
  const showShowCasing = false
  const navigation = useNavigation()
  const [submitting, setSubmitting] = React.useState(
    navigation.state === "submitting",
  )
  const actionData = useActionData()
  const navigate = useNavigate()
  const auth = useAuth()
  const alert = useAlert()

  useEffect(() => {
    if (actionData?.error) {
      alert.showError(actionData.error)
    }
    if (actionData?.token) {
      auth.getIdentity().then(() => {
        navigate("/")
      })
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
              Sign Up
            </Typography>
            <TextField
              variant="outlined"
              label="First Name"
              name="firstName"
              placeholder="Enter your First name"
              type="text"
              fullWidth
              required
              disabled={submitting}
            />
            <TextField
              variant="outlined"
              label="Last Name"
              placeholder="Enter your Last name"
              name="lastName"
              type="text"
              fullWidth
              required
              disabled={submitting}
            />

            <TextField
              variant="outlined"
              type="email"
              name="email"
              placeholder="Enter your email"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              disabled={submitting}
            />
            <TextField
              variant="outlined"
              type="password"
              name="password"
              required
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
              Sign Up
            </LoadingButton>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                width: 200,
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
                  bgcolor: "red",
                  position: "absolute",
                  top: "50%",
                }}
              />
            </Box>
            <GoogleSignUpButton
              onSuccess={handleLoginSuccess}
              onFail={handleLoginFail}
              setSubmitting={(val) => setSubmitting(val)}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  <Typography variant="body2" color="primary">
                    Already have an account? Sign in
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

  if (intent === "googleSignUp") {
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

  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const password = formData.get("password")
  try {
    const res = await authModule.signup(email, password, firstName, lastName)
    return { token: res.token }
  } catch (error) {
    if (error.response?.data?.message) {
      return { error: error.response.data.message }
    }
    throw error
  }
}
