import React, { useEffect, useState } from "react"
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  Button,
  InputLabel,
  Input,
} from "@mui/material"
import {
  Form,
  redirect,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom"
import { createGame } from "../api/game"
import { useAlert } from "../context/AlertContext"

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

export function CreateGame() {
  const alert = useAlert()
  const navigation = useNavigation()
  const navigate = useNavigate()
  const actionData = useActionData()
  const [gameImage, setGameImage] = useState("/images/image-loading-error.jpg")

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
            <Box>
              <Stack gap={5}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 5,
                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                  }}
                >
                  <Stack sx={{ flex: 1, gap: 5 }}>
                    <TextField
                      label="Name"
                      sx={sxStyles.fieldInput}
                      name="name"
                      required
                      autoFocus
                      fullWidth
                    />
                    <TextField
                      label="Description"
                      sx={sxStyles.fieldInput}
                      name="description"
                      required
                      multiline
                      minRows={4}
                      maxRows={6}
                      fullWidth
                    />
                  </Stack>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      gap: 5,
                      flexDirection: { md: "column" },
                      alignItems: { xs: "flex-end", md: "stretch" },
                    }}
                  >
                    <Box
                      component={"img"}
                      src={gameImage}
                      sx={{
                        height: 250,
                        width: "100%",
                        objectFit: "contain",
                        bgcolor: "background.lightest",
                      }}
                    />

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box>
                        <Input
                          required
                          type="file"
                          name="image"
                          id="image-change"
                          sx={{ display: "none" }}
                          inputProps={{ accept: "image/*" }}
                          onChange={(event) => {
                            const reader = new FileReader()
                            reader.onload = (ev) => {
                              setGameImage(ev.target.result)
                            }
                            reader.readAsDataURL(event.target.files[0])
                          }}
                        />
                        <InputLabel htmlFor="image-change">
                          <Button
                            component="span"
                            color="secondary"
                            variant="outlined"
                            size="small"
                          >
                            Select Image <sup>&nbsp;*</sup>
                          </Button>
                        </InputLabel>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
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
    return redirect("/dashboard/game")
  } catch (error) {
    // if validation error
    if (error.response?.status === 422) return error.response
    else throw error
  }
}
