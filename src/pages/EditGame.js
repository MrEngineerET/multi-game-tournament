import React from "react"
import {
  Box,
  Container,
  Stack,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Typography,
  Input,
  InputLabel,
} from "@mui/material"
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  Form,
  redirect,
} from "react-router-dom"
import { getGame, updateGame } from "../api/game"
import { GameDeleteDialog } from "../components/Game/GameDeleteDialog"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SettingsIcon from "@mui/icons-material/Settings"

const sxStyles = {
  bannerWrapper: (theme) => ({
    background: theme.palette.background.cucumberWater,
    px: { xs: 5, sm: 10, md: 20 },
    py: { xs: 10, sm: 25, md: 30 },
  }),

  content: {
    p: 5,
    pt: 2,
  },
}

export function EditGame() {
  const actionData = useActionData()
  const game = useLoaderData()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  const [imageUrl, setImageUrl] = React.useState(game.images[0])

  const submitting =
    navigation.state === "submitting" || navigation.state === "submitting"

  return (
    <Box>
      <Box sx={sxStyles.bannerWrapper}>
        <Container>
          <Typography variant="h3" component="h1">
            Edit Game
          </Typography>
        </Container>
      </Box>
      <Box sx={sxStyles.content}>
        <Container>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => {
                  navigate(-1)
                }}
                color="secondary"
                variant="text"
                sx={{ mb: 5 }}
              >
                <ArrowBackIcon /> Back
              </Button>
              {submitting && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <RotatingGear />
                  <Typography variant="body2">Saving ...</Typography>
                </Box>
              )}
            </Box>
            <Form
              method="post"
              encType="multipart/form-data"
              style={submitting ? { pointerEvents: "none", opacity: 0.5 } : {}}
            >
              <Box
                sx={{
                  p: 5,
                  boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.1)",
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  gap: {
                    xs: 10,
                    md: 5,
                  },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Stack gap={5}>
                    <TextField
                      label="Name"
                      fullWidth
                      name="name"
                      required
                      defaultValue={game.name}
                      disabled={!game.active}
                    />

                    <TextField
                      label="Description"
                      fullWidth
                      name="description"
                      required
                      multiline
                      minRows={3}
                      maxRows={5}
                      defaultValue={game.description}
                      disabled={!game.active}
                    />

                    {actionData?.data?.message && (
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {actionData.data.message}
                      </Alert>
                    )}
                  </Stack>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box
                    gap={5}
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "row",
                        md: "column",
                      },
                      alignItems: { xs: "flex-end", md: "stretch" },
                    }}
                  >
                    <Box
                      component={"img"}
                      src={imageUrl}
                      sx={{
                        height: 250,
                        objectFit: "contain",
                        bgcolor: "background.lightest",
                      }}
                    />
                    {game.active && (
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box>
                          <Input
                            type="file"
                            name="image"
                            id="image-change"
                            sx={{ display: "none" }}
                            inputProps={{ accept: "image/*" }}
                            onChange={(event) => {
                              const reader = new FileReader()
                              reader.onload = (ev) => {
                                setImageUrl(ev.target.result)
                              }
                              reader.readAsDataURL(event.target.files[0])
                            }}
                          />
                          <InputLabel htmlFor="image-change">
                            <Button
                              component="span"
                              color="secondary"
                              variant="text"
                              size="small"
                            >
                              Change Image
                            </Button>
                          </InputLabel>
                        </Box>
                      </Box>
                    )}

                    {actionData?.data?.message && (
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {actionData.data.message}
                      </Alert>
                    )}
                  </Box>
                </Box>
              </Box>
              {game.active && (
                <Box sx={{ display: "flex", gap: 2, p: 5 }}>
                  <Button
                    onClick={() => {
                      navigate(-1)
                    }}
                    color="secondary"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" name="intent" value="update_game">
                    Save
                  </Button>
                </Box>
              )}
            </Form>
          </Box>

          {!game.active && (
            <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
              <Form method="post">
                <Button
                  name="intent"
                  value="restore_game"
                  color="secondary"
                  type="submit"
                  disabled={submitting}
                >
                  Restore
                </Button>
              </Form>
              <Button onClick={() => setDeleteDialogOpen(true)}>
                Delete Completely
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      <GameDeleteDialog
        gameId={game._id}
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false)
        }}
        deleteCompletely
      />
    </Box>
  )
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const intent = formData.get("intent")
  const gameId = params.id
  if (intent === "update_game") {
    const payload = {}
    payload.name = formData.get("name")
    payload.description = formData.get("description")
    const image = formData.get("image")
    if (image) payload.image = image
    try {
      await updateGame(gameId, payload)
      return redirect("/dashboard/game")
    } catch (error) {
      // if validation error
      if (error.response?.status === 422) return error.response.data
      else throw error
    }
  }
  if (intent === "restore_game") {
    try {
      await updateGame(gameId, { active: true })
      return redirect("/dashboard/game")
    } catch (error) {
      // if validation error
      if (error.response?.status === 422) return error.response.data
      else throw error
    }
  }
}

export function laoder({ params }) {
  const gameId = params.id
  return getGame(gameId)
}

function RotatingGear() {
  return (
    <SettingsIcon
      sx={{
        animation: "rotate 2s infinite linear",
        "@keyframes rotate": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      }}
    />
  )
}

// RotatingGear.propTypes = {
//   sx: PropTypes.object,
// }
