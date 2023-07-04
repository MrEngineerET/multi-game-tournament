import React from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Skeleton,
  Alert,
} from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { EllipsisText } from "../Common/EllipsisText"
import { Link } from "react-router-dom"

export function GameCard({ game, openDeleteDialog }) {
  const handleImageOnError = (e) => {
    return (e.target.src = "/images/image-loading-error.jpg")
  }

  const isGameActive = game.active

  return (
    <Box>
      <Card elevation={1} sx={[!isGameActive && { opacity: 0.7 }]}>
        <Box
          component={Link}
          to={`${game._id}/edit`}
          sx={{ textDecoration: "none" }}
        >
          <CardMedia
            sx={{
              height: { xs: 150, sm: 200 },
              bgcolor: "background.default",
              borderBottom: "1px solid whitesmoke",
            }}
            component={"img"}
            image={game.images[0]}
            onError={handleImageOnError}
            loading="lazy"
          />
          <CardContent sx={{ pb: 2 }}>
            <EllipsisText gutterBottom variant="h6" color="text.primary">
              {game.name}
            </EllipsisText>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ height: 100, overflow: "scroll" }}
            >
              {game.description}
            </Typography>
            <Alert
              severity="warning"
              sx={{
                pt: 0,
                pb: 0,
                visibility: isGameActive ? "hidden" : "visible",
              }}
            >
              This game is deactivated
            </Alert>
          </CardContent>
        </Box>
        <CardActions sx={{ p: 4, pb: 2, pt: 2 }}>
          <Button
            size="small"
            variant="text"
            color="secondary"
            startIcon={<EditIcon />}
            href={`${game._id}/edit`}
          >
            Edit
          </Button>
          {game.active && (
            <Button
              size="small"
              variant="text"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => {
                openDeleteDialog(game._id)
              }}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

GameCard.propTypes = {
  game: PropTypes.object,
  games: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }),
  openDeleteDialog: PropTypes.func.isRequired,
}

export function GameCardSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" height={200} width={280} />
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem", mb: 3 }} />
      <Skeleton
        variant="rounded"
        height={40}
        width={75}
        sx={{ display: "inline-block", mr: 2 }}
      />
      <Skeleton
        variant="rounded"
        height={40}
        width={75}
        sx={{ display: "inline-block" }}
      />
    </Box>
  )
}
