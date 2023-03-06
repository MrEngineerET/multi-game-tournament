import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  Box,
  Stack,
  Button,
  Typography,
  useTheme,
  CardMedia,
  CardContent,
} from "@mui/material"
import { Avatar, Card } from "@mui/material"
import { getGame } from "../../../api/game"
export function MatchDetail({ match, onClose }) {
  const [game, setGame] = useState(null)
  useEffect(() => {
    if (match.gameId) getGame(match.gameId).then((game) => setGame(game))
  }, [match.gameId])
  const theme = useTheme()

  const handleImageOnError = (e) => {
    return (e.target.src = "/images/image-loading-error.jpg")
  }
  return (
    <Box>
      <Stack gap={10}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={10}
        >
          <ImageAndScoreCard participant={match.participants[0]} />
          <Typography variant="h6">Vs</Typography>
          <ImageAndScoreCard participant={match.participants[1]} />
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {game ? (
            <Card sx={{ width: 200 }}>
              <CardMedia
                sx={{
                  height: { xs: 100 },
                  bgcolor: "background.default",
                  borderBottom: "1px solid whitesmoke",
                }}
                component={"img"}
                image={game.images[0]}
                onError={handleImageOnError}
              />
              <CardContent>
                <Typography variant="h6">{game.name}</Typography>
              </CardContent>
            </Card>
          ) : (
            <Card
              sx={{
                width: 200,
                height: 150,
                p: 5,
                bgcolor: "background.default",
              }}
            >
              <Typography variant="h5" align="center" mb={5}>
                Game
              </Typography>
              <Typography variant="h6" align="center">
                TBD
              </Typography>
            </Card>
          )}
        </Box>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{
            [theme.breakpoints.down("sm")]: { fontSize: 13 },
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  )
}

MatchDetail.propTypes = {
  match: PropTypes.object,
  onClose: PropTypes.func,
}

function ImageAndScoreCard({ participant, imgSrc }) {
  return (
    <Card
      sx={{
        width: 200,
        bgcolor: "background.default",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 0.65,
          mb: 5,
        }}
      >
        <Avatar
          alt={participant.name}
          src={imgSrc ? imgSrc : "/no-image.jpg"}
          sx={{ width: 70, height: 70, fontSize: 30 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: 80,
            borderRadius: 1,
            textAlign: "center",
            bgcolor: "background.paper",
            // bgcolor: "success.light", // or failure color
          }}
        >
          <Typography>{participant.score ? participant.score : "-"}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

ImageAndScoreCard.propTypes = {
  participant: PropTypes.object,
  imgSrc: PropTypes.string,
}
