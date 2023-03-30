import React, { useMemo, useState, useEffect } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Typography, Box, Stack } from "@mui/material"
import { useTournamentContext } from "../../context/TournamentContext"
import { Container } from "@mui/system"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import { tournamentType } from "../../utils/constants"
import { Tabs, Tab } from "@mui/material"
import { TournamentStatus } from "./TournamentStatus"

const sxStyles = {
  gameImageList: {
    height: { xs: 100, sm: 150 },
  },
  gameImage: {
    width: 1,
    height: 1,
    objectFit: "cover",
    bgcolor: "background.lightest",
    opacity: 0.7,
  },
  bannerWrapper: { bgcolor: "background.darkBanner", color: "text.lighter" },
  tournamentInfos: {
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 1, md: 7 },
    fontSize: { xs: 17, md: 20 },
  },
  text: {
    fontSize: { xs: 14, md: 16 },
  },
}

const tabs = { bracket: 0, participants: 1, settings: 2 }

export function TournamentDetail() {
  const location = useLocation()
  const { tournamentData } = useTournamentContext()
  const [tabValue, setTabValue] = useState(() => {
    if (location.pathname.includes("participants")) return tabs.participants
    else if (location.pathname.includes("settings")) return tabs.settings
    else return tabs.bracket
  })

  useEffect(() => {
    let tab = tabs.bracket
    if (location.pathname.includes("participants")) tab = tabs.participants
    else if (location.pathname.includes("settings")) tab = tabs.settings
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

  return (
    <Box>
      <Stack direction="row" sx={sxStyles.gameImageList} gap={1}>
        {gameList.length !== 0
          ? gameList.map(({ image }) => (
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
          : ifNoGameimages.map((image) => {
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
                      gameList.map((game) => (
                        <Typography key={game.name} sx={sxStyles.text}>
                          {game.name} ({game.count})
                        </Typography>
                      ))
                    )}
                  </Stack>
                </Stack>
              </Stack>
              {/* <Box>additional information</Box> */}
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
                  label="Participants"
                  LinkComponent={Link}
                  to="participants"
                  replace
                  value={tabs.participants}
                />
                <Tab
                  label="Settings"
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
    </Box>
  )
}
