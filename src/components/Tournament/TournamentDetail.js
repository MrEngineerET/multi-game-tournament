import React, { useMemo } from "react"
import { Typography, Box, Divider, Stack } from "@mui/material"
import { SingleEliminationStage } from "./SingleEliminationStage"
import { DoubleEliminationStage } from "./DoubleEliminationStage"
import { RoundRobinStage } from "./RoundRobinStage"
import { useTournamentContext } from "../../context/TournamentContext"
import { Container } from "@mui/system"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import { tournamentType } from "../../utils/constants"

const sxStyles = {
  gameImageList: {
    height: { xs: 100, sm: 150 },
  },
  gameImage: {
    width: 1,
    height: 1,
    objectFit: "cover",
    bgcolor: "background.light",
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
export function TournamentDetail() {
  const { tournamentData } = useTournamentContext()
  const gameList = useMemo(
    () =>
      tournamentData.games.map((game) => ({
        name: game.gameId.name,
        image: game.gameId.images[0],
      })),
    [tournamentData.games],
  )
  return (
    <Box>
      <Stack direction="row" sx={sxStyles.gameImageList} gap={1}>
        {gameList.map(({ image }) => (
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
        ))}
      </Stack>
      <Box sx={sxStyles.bannerWrapper}>
        <Container sx={{ p: { xs: 4, sm: 8 }, pb: 2 }} disableGutters>
          <Stack gap={{ xs: 2, sm: 5 }}>
            <Stack direction="row">
              <Stack gap={1}>
                <Typography variant="h4" component="h1">
                  {tournamentData.name}
                </Typography>
                <Stack sx={sxStyles.tournamentInfos}>
                  <Stack direction="row" gap={2} alignItems="center">
                    <PeopleAltIcon fontSize="inherit" />
                    <Typography sx={sxStyles.text}>players</Typography>
                    <Typography sx={sxStyles.text}>4</Typography>
                  </Stack>
                  <Stack direction="row" gap={2} alignItems="center">
                    <EmojiEventsIcon fontSize="inherit" />
                    <Typography sx={sxStyles.text}>
                      {tournamentType[tournamentData.stages[0].type]}
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={2} alignItems="center">
                    <SportsEsportsIcon fontSize="inherit" />
                    {gameList.map((game) => (
                      <Typography key={game.name} sx={sxStyles.text}>
                        {game.name}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
              {/* <Box>additional information</Box> */}
            </Stack>
            <Box>navigation</Box>
          </Stack>
        </Container>
      </Box>
      <Box sx={{}}>
        <Container sx={{ p: { xs: 4, sm: 8 } }} disableGutters>
          {tournamentData.stages.map((stage, i) => {
            return (
              <Box key={stage.name && i}>
                {stage.type === "single_elimination" && (
                  <SingleEliminationStage stage={stage} />
                )}
                {stage.type === "double_elimination" && (
                  <DoubleEliminationStage stage={stage} />
                )}
                {stage.type === "round_robin" && (
                  <RoundRobinStage stage={stage} />
                )}
                <Divider />
              </Box>
            )
          })}
        </Container>
      </Box>
    </Box>
  )
}
