import React from "react"
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Paper,
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
  },
  banner: {
    p: 20,
    pl: 5,
    pr: 5,
  },
  content: {
    pt: 10,
  },
  fieldName: {
    width: 100,
    fontSize: { xs: 16, md: 18 },
  },
  fieldInput: {
    flex: 1,
    maxWidth: 700,
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
    <Box sx={sxStyles.content}>
      <Container>
        <Form method="post">
          <Stack gap={5}>
            <Stack direction={{ xs: "column", sm: "row" }} gap={5}>
              <Typography sx={sxStyles.fieldName}>Name</Typography>
              <Paper elevation={1} sx={sxStyles.fieldInput}>
                <TextField
                  fullWidth
                  name="name"
                  required
                  defaultValue={game.name}
                  autoFocus
                  disabled={!game.active}
                />
              </Paper>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} gap={5}>
              <Typography sx={sxStyles.fieldName}>Description</Typography>
              <Paper elevation={1} sx={sxStyles.fieldInput}>
                <TextField
                  fullWidth
                  name="description"
                  required
                  multiline
                  minRows={3}
                  maxRows={5}
                  defaultValue={game.description}
                  disabled={!game.active}
                />
              </Paper>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} gap={5}>
              <Typography sx={sxStyles.fieldName}>Image</Typography>
              <Paper elevation={1} sx={sxStyles.fieldInput}>
                <TextField
                  fullWidth
                  name="image"
                  defaultValue={game.images[0]}
                  disabled={!game.active}
                />
              </Paper>
            </Stack>
            {actionData?.data?.message && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {actionData.data.message}
              </Alert>
            )}
            <Box sx={{ mt: 5, ml: { sm: "120px", display: "flex", gap: 10 } }}>
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
          <Box sx={{ ml: { sm: "120px", display: "flex", gap: 10 } }}>
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
    await updateGame(gameId, { gameId, name, description, images: [image] })
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
