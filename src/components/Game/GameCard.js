import React, { useState } from "react"
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
} from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { GameDeleteDialog } from "./GameDeleteDialog"
import { EllipsisText } from "../Common/EllipsisText"

export function GameCard({ game }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
  }
  const handleImageOnError = (e) => {
    return (e.target.src = "/images/image-loading-error.jpg")
  }

  return (
    <Box>
      <Card elevation={1}>
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
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <EllipsisText text={game.name} />
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 100, overflow: "scroll" }}
          >
            {game.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="text"
            color="secondary"
            startIcon={<EditIcon />}
            href={`${game._id}/edit`}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="text"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setDeleteDialogOpen(true)
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <GameDeleteDialog
        gameId={game._id}
        isOpen={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      />
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
      <Skeleton variant="rounded" height={45} width={280} />
    </Box>
  )
}
