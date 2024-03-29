import React, { useMemo, useState, useEffect } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"

import { Typography, Box, Stack, ButtonBase } from "@mui/material"
import { useMediaQuery, useTheme } from "@mui/material"
import { ShareTournamentDialog } from "./ShareTournamentDialog"
import { useTournamentContext } from "../../context/TournamentContext"
import { Container } from "@mui/system"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import { tournamentType } from "../../utils/constants"
import { Tabs, Tab } from "@mui/material"
import { TournamentStatus } from "./TournamentStatus"
import ShareIcon from "@mui/icons-material/Share"

import LockIcon from "@mui/icons-material/Lock"

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

const tabs = { bracket: 0, participants: 1, standing: 2, settings: 3 }

export function TournamentDetail() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("xl"))

  const location = useLocation()
  const [openShareDialog, setOpenShareDialog] = useState(false)
  const { tournamentData } = useTournamentContext()
  const isTournamentOwner = tournamentData.player.tournamentOwner
  const [tabValue, setTabValue] = useState(() => {
    if (location.pathname.includes("participants")) return tabs.participants
    else if (location.pathname.includes("settings")) return tabs.settings
    else if (location.pathname.includes("/standing")) return tabs.standing
    else return tabs.bracket
  })

  useEffect(() => {
    let tab = tabs.bracket
    if (location.pathname.includes("participants")) tab = tabs.participants
    else if (location.pathname.includes("settings")) tab = tabs.settings
    else if (location.pathname.includes("standing")) tab = tabs.standing
    setTabValue(tab)
  }, [location.pathname])

  const gameList = useMemo(
    () =>
      tournamentData.games.map((game) => ({
        name: game.gameId.name,
        image: game.gameId.images[0],
        count: game.count,
      })),
    [tournamentData.games],
  )

  const ifNoGameimages = [
    "/images/trophy_small.jpg",
    "/images/net_small.jpg",
    "/images/ball_small.jpg",
  ]

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue)
  }

  const maxImageList = isMobile ? 2 : isMediumScreen ? 3 : isLargeScreen ? 4 : 5

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <Stack direction="row" sx={sxStyles.gameImageList} gap={1}>
          {gameList.length !== 0
            ? gameList.slice(0, maxImageList).map(({ image }) => (
                <Box key={image} flex={1}>
                  <Box
                    component={"img"}
                    src={image}
                    sx={sxStyles.gameImage}
                    onError={(e) => {
                      e.target.src = "/images/image-loading-error.jpg"
                    }}
                  />
                </Box>
              ))
            : ifNoGameimages.slice(0, maxImageList).map((image) => {
                return (
                  <Box flex={1} key={image}>
                    <Box
                      component={"img"}
                      src={image}
                      sx={sxStyles.gameImage}
                      onError={(e) => {
                        e.target.src = "/images/image-loading-error.jpg"
                      }}
                    />
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
                    {tournamentData.name}
                  </Typography>
                  <Stack sx={sxStyles.tournamentInfos}>
                    <Stack direction="row" gap={2} alignItems="center">
                      <PeopleAltIcon fontSize="inherit" />
                      <Typography sx={sxStyles.text}>players</Typography>
                      <Typography sx={sxStyles.text}>
                        {tournamentData.participants.length}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center">
                      <EmojiEventsIcon fontSize="inherit" />
                      <Typography sx={sxStyles.text}>
                        {tournamentData.stages[0]
                          ? tournamentType[tournamentData.stages[0].type]
                          : "TBD"}
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center">
                      <SportsEsportsIcon fontSize="inherit" />
                      {gameList.length === 0 ? (
                        <Typography sx={sxStyles.text}>TBD </Typography>
                      ) : (
                        gameList.slice(0, maxImageList).map((game) => (
                          <Typography key={game.name} sx={sxStyles.text}>
                            {game.name} ({game.count})
                          </Typography>
                        ))
                      )}
                      {gameList.length > maxImageList && <span>...</span>}
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
                    Share Tournament{" "}
                  </Typography>
                  <ButtonBase
                    onClick={() => setOpenShareDialog(true)}
                    disabled={!isTournamentOwner}
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
                  value={tabValue}
                  textColor="inherit"
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Bracket"
                    LinkComponent={Link}
                    to={`/tournament/${tournamentData._id}`}
                    replace
                    value={tabs.bracket}
                  />
                  <Tab
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <span>Participant</span>{" "}
                        {!isTournamentOwner && <LockIcon fontSize="16px" />}
                      </Box>
                    }
                    LinkComponent={Link}
                    to="participants"
                    replace
                    value={tabs.participants}
                  />
                  <Tab
                    label="Standing"
                    LinkComponent={Link}
                    to="standing"
                    replace
                    value={tabs.standing}
                  />
                  <Tab
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <span>Settings</span>{" "}
                        {!isTournamentOwner && <LockIcon fontSize="16px" />}
                      </Box>
                    }
                    LinkComponent={Link}
                    to="settings"
                    replace
                    value={tabs.settings}
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
            minHeight: "70vh",
          }}
          disableGutters
        >
          <TournamentStatus />
          <Outlet />
        </Container>
      </Box>
      <ShareTournamentDialog
        isOpen={openShareDialog}
        onClose={() => {
          setOpenShareDialog(false)
        }}
      />
    </Box>
  )
}
