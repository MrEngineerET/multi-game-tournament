import React from "react"
// import PropTypes from "prop-types"
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
  useFetcher,
} from "react-router-dom"
import { getGame, updateGame } from "../api/game"
import { GameDeleteDialog } from "../components/Game/GameDeleteDialog"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SettingsIcon from "@mui/icons-material/Settings"

const sxStyles = {
  bannerWrapper: {
    bgcolor: "background.paper",
    p: 5,
  },
  banner: {
    p: 15,
    pl: 5,
    pr: 5,
  },
  content: {
    p: 5,
    pt: 2,
  },
}

export function EditGame() {
  const actionData = useActionData()
  const game = useLoaderData()
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const imageFetcher = useFetcher()
  const gameFetcher = useFetcher()
  const restoreFetcher = useFetcher()
  const [imageUrl, setImageUrl] = React.useState(game.images[0])

  const saving =
    imageFetcher.state === "submitting" ||
    gameFetcher.state === "submitting" ||
    restoreFetcher.state === "submitting"
  return (
    <Box>
      <Box sx={sxStyles.bannerWrapper}>
        <Container sx={sxStyles.banner}>
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
              {saving && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <RotatingGear />
                  <Typography variant="body2">Saving ...</Typography>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: 5,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <gameFetcher.Form method="post">
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
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {game.active && (
                        <Button
                          type="submit"
                          disabled={gameFetcher.state === "submitting"}
                          name="intent"
                          value="update_game"
                        >
                          Save
                        </Button>
                      )}
                    </Box>
                  </Stack>
                </gameFetcher.Form>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack gap={5}>
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
                    <imageFetcher.Form
                      method="post"
                      encType="multipart/form-data"
                    >
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
                            <Button component="span" color="secondary">
                              Change Image
                            </Button>
                          </InputLabel>
                        </Box>
                        <Button
                          type="submit"
                          name="intent"
                          value="change-image"
                          disabled={imageFetcher.state === "submitting"}
                        >
                          Save
                        </Button>
                      </Box>
                    </imageFetcher.Form>
                  )}

                  {actionData?.data?.message && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {actionData.data.message}
                    </Alert>
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>

          {!game.active && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <restoreFetcher.Form method="post">
                <Button
                  name="intent"
                  value="restore_game"
                  color="secondary"
                  type="submit"
                  disabled={restoreFetcher.state === "submitting"}
                >
                  Restore
                </Button>
              </restoreFetcher.Form>
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
    const name = formData.get("name")
    const description = formData.get("description")
    try {
      await updateGame(gameId, { name, description })
      return null
    } catch (error) {
      // if validation error
      if (error.response?.status === 422) return error.response.data
      else throw error
    }
  }
  if (intent === "restore_game") {
    try {
      await updateGame(gameId, { active: true })
      return null
    } catch (error) {
      // if validation error
      if (error.response?.status === 422) return error.response.data
      else throw error
    }
  }

  if (intent === "change-image") {
    const image = formData.get("image")
    // console.log("idid", "---->", image)
    // return null
    try {
      await updateGame(gameId, { image })
      return null
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
