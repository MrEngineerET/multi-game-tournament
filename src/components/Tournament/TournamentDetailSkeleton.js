import React from "react"
import { Box, Stack, Container, CircularProgress } from "@mui/material"
import { Typography, ButtonBase, Tabs, Tab } from "@mui/material"
import { Skeleton } from "@mui/material"
import { Link } from "react-router-dom"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import ShareIcon from "@mui/icons-material/Share"

const sxStyles = {
  gameImageList: {
    height: { xs: 190, sm: 250 },
  },
  gameImage: {
    width: 1,
    height: 1,
    objectFit: "cover",
    bgcolor: "background.lightest",
  },
  bannerWrapper: {
    color: "text.lightest",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tournamentInfos: {
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 0, sm: 1, md: 7 },
    fontSize: { xs: 17, md: 20 },
  },
  text: {
    fontSize: { xs: 14, md: 16 },
  },
  gradiant: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    background: {
      xs: "linear-gradient(rgba(40, 42, 51, 0) 0%,rgba(40, 42, 51, 0.6) 40%,rgba(40, 42, 51, 0.9) 55%, rgba(40, 42, 51, 0.95) 60%,rgba(40, 42, 51, 1) 70%)",
      sm: "linear-gradient(rgba(40, 42, 51, 0) 0%,rgba(40, 42, 51, 0.6) 50%,rgba(40, 42, 51, 0.9) 65%, rgba(40, 42, 51, 0.95) 70%,rgba(40, 42, 51, 1) 80%)",
    },
  },
}

export function TournamentDetailSkeleton() {
  const ifNoGameimages = [
    "/images/image-loading-error.jpg",
    "/images/image-loading-error.jpg",
    "/images/image-loading-error.jpg",
  ]
  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <Stack direction="row" sx={sxStyles.gameImageList} gap={1}>
          {ifNoGameimages.map((image) => {
            return (
              <Box flex={1} key={image}>
                <Box component={"img"} src={image} sx={sxStyles.gameImage} />
              </Box>
            )
          })}
        </Stack>
        <Box sx={{ width: "100%", height: 60 }} />
        <Box sx={sxStyles.gradiant} />
        <Box sx={sxStyles.bannerWrapper}>
          <Container
            sx={(theme) => ({
              p: 8,
              pb: "1px",
              [theme.breakpoints.down("sm")]: {
                p: 4,
                pb: 0,
              },
            })}
            disableGutters
          >
            <Stack gap={{ xs: 2, sm: 5 }}>
              <Stack direction="row" justifyContent="space-between">
                <Stack gap={1}>
                  <Typography variant="h3" component="h1">
                    <Skeleton
                      variant="text"
                      sx={{ bgcolor: "#999", fontSize: "3rem", maxWidth: 300 }}
                    />
                  </Typography>
                  <Stack sx={sxStyles.tournamentInfos}>
                    <Stack direction="row" gap={2} alignItems="center">
                      <PeopleAltIcon fontSize="inherit" />
                      <Typography sx={sxStyles.text}>players</Typography>
                      <Typography sx={sxStyles.text}>
                        <Skeleton
                          variant="text"
                          sx={{
                            bgcolor: "#aaa",
                            fontSize: "2rem",
                            width: 30,
                          }}
                        />
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center">
                      <EmojiEventsIcon fontSize="inherit" />
                      <Typography sx={sxStyles.text}>
                        {" "}
                        <Skeleton
                          variant="text"
                          sx={{
                            bgcolor: "#aaa",
                            fontSize: "2rem",
                            width: 100,
                          }}
                        />
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center">
                      <SportsEsportsIcon fontSize="inherit" />
                      <Typography sx={sxStyles.text}>
                        {" "}
                        <Skeleton
                          variant="text"
                          sx={{
                            bgcolor: "#aaa",
                            fontSize: "2rem",
                            width: 100,
                          }}
                        />{" "}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    alignItems: "flex-end",
                    justifyContent: "end",
                    gap: 4,
                    pr: {
                      xs: 6,
                      sm: 3,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                      mb: "12px",
                    }}
                  >
                    Share Tournament
                  </Typography>
                  <ButtonBase
                    disabled
                    sx={{
                      bgcolor: "#334",
                      padding: 2,
                      borderRadius: 1,
                    }}
                  >
                    <ShareIcon
                      sx={{
                        color: "primary.main",
                        "&:hover": {
                          color: "primary.dark",
                        },
                        fontSize: {
                          xs: 24,
                          sm: 32,
                        },
                      }}
                    />
                  </ButtonBase>
                </Box>
              </Stack>
              <Box>
                <Tabs
                  value={0}
                  textColor="inherit"
                  onChange={() => {}}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Bracket"
                    LinkComponent={Link}
                    to="#"
                    replace
                    value={0}
                  />
                  <Tab
                    label="Participants"
                    LinkComponent={Link}
                    to="#"
                    replace
                    value={1}
                  />
                  <Tab
                    label="Standing"
                    LinkComponent={Link}
                    to="#"
                    replace
                    value={2}
                  />
                  <Tab
                    label="Settings"
                    LinkComponent={Link}
                    to="#"
                    replace
                    value={3}
                  />
                </Tabs>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "background.lightest" }}>
        <Container
          sx={{
            p: { xs: 4, sm: 8 },
            bgcolor: "background.paper",
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          disableGutters
        >
          <CircularProgress color="secondary" size={60} />
        </Container>
      </Box>
    </Box>
  )
}
