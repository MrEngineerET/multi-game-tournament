import React, { useEffect } from "react"
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material"
import { Form, redirect, useNavigation, useActionData } from "react-router-dom"
import { createGame } from "../api/game"
import { useAlert } from "../context/AlertContext"

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
    p: 5,
    pt: 10,
  },
  fieldName: {
    width: 100,
    fontSize: { xs: 16, md: 20 },
  },
  fieldInput: {
    flex: 1,
  },
}

export function CreateGame() {
  const alert = useAlert()
  const navigation = useNavigation()
  const actionData = useActionData()

  useEffect(() => {
    if (actionData?.data?.message) {
      alert.showError(actionData.data.message)
    }
  }, [actionData])

  return (
    <Box>
      <Box sx={sxStyles.bannerWrapper}>
        <Container sx={sxStyles.banner}>
          <Typography variant="h3" component="h1">
            New Game
          </Typography>
        </Container>
      </Box>
      <Box sx={sxStyles.content}>
        <Container>
          <Form method="post" encType="multipart/form-data">
            <Box sx={{ maxWidth: 700 }}>
              <Stack gap={5}>
                <Stack direction={{ xs: "column", sm: "row" }} gap={5}>
                  <TextField
                    label="Name"
                    sx={sxStyles.fieldInput}
                    name="name"
                    required
                    autoFocus
                  />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={5}>
                  <TextField
                    label="Description"
                    sx={sxStyles.fieldInput}
                    name="description"
                    required
                    multiline
                    minRows={4}
                    maxRows={6}
                  />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={5}>
                  {/* TODO: add a label */}
                  <TextField
                    type="file"
                    sx={sxStyles.fieldInput}
                    name="image"
                    required
                  />
                </Stack>
                <Box
                  sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    type="submit"
                    disabled={navigation.state === "submitting"}
                  >
                    Save and Continue
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Form>
        </Container>
      </Box>
    </Box>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const name = formData.get("name")
  const description = formData.get("description")
  const image = formData.get("image")
  try {
    await createGame({
      name,
      description,
      image,
    })
    return redirect("/game")
  } catch (error) {
    // if validation error
    if (error.response?.status === 422) return error.response
    else throw error
  }
}
