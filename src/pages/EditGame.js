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
} from "@mui/material"
import {
  Form,
  useNavigation,
  useActionData,
  useLoaderData,
  useNavigate,
  redirect,
  useFetcher,
} from "react-router-dom"
import { getGame, updateGame } from "../api/game"
import { GameDeleteDialog } from "../components/Game/GameDeleteDialog"

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
    pt: 10,
  },
}

export function EditGame() {
  const navigation = useNavigation()
  const actionData = useActionData()
  const game = useLoaderData()
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const fetcher = useFetcher()
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
        <Container
        // sx={(theme) => ({
        //   p: 10,
        //   [theme.breakpoints.up("sm")]: {
        //     px: 10,
        //   },
        // })}
        >
          <Form method="post">
            <Stack gap={5}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                required
                defaultValue={game.name}
                autoFocus
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

              <TextField
                fullWidth
                name="image"
                defaultValue={game.images[0]}
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
                  <>
                    <Button
                      onClick={() => {
                        navigate(-1)
                      }}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={navigation.state === "submitting"}
                    >
                      Save and Continue
                    </Button>
                  </>
                )}
              </Box>
            </Stack>
          </Form>
          {!game.active && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <fetcher.Form method="post">
                <Button
                  name="intent"
                  value="restore_game"
                  color="secondary"
                  type="submit"
                  disabled={fetcher.state === "submitting"}
                >
                  Restore
                </Button>
              </fetcher.Form>
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
  if (intent === "restore_game") {
    const gameId = params.id
    try {
      await updateGame(gameId, { gameId, active: true })
      return null
    } catch (error) {
      // if validation error
      if (error.response?.status === 422) return error.response.data
      else throw error
    }
  }

  const name = formData.get("name")
  const description = formData.get("description")
  const image = formData.get("image")

  const gameId = params.id
  try {
    await updateGame(gameId, { name, description, images: [image] })
    return redirect("/dashboard/game")
  } catch (error) {
    // if validation error
    if (error.response?.status === 422) return error.response.data
    else throw error
  }
}

export function laoder({ params }) {
  const gameId = params.id
  return getGame(gameId)
}
