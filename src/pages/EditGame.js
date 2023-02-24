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
} from "react-router-dom"
import { getGame, updateGame } from "../api/game"

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
    fontSize: { xs: 16, md: 20 },
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
                />
              </Paper>
            </Stack>
            {actionData?.data?.message && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {actionData.data.message}
              </Alert>
            )}
            <Box sx={{ mt: 5, ml: { sm: "120px" } }}>
              <Button
                onClick={() => {
                  navigate(-1)
                }}
                color="secondary"
                sx={{ mr: 4 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={navigation.state === "submitting"}
              >
                Save and Continue
              </Button>
            </Box>
          </Stack>
        </Form>
      </Container>
    </Box>
  )
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const name = formData.get("name")
  const description = formData.get("description")
  const image = formData.get("image")

  const gameId = params.id
  try {
    await updateGame(gameId, { gameId, name, description, images: [image] })
    return redirect("/game")
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
