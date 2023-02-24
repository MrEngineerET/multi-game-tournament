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
} from "@mui/material"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { GameDeleteDialog } from "./GameDeleteDialog"

export function GameCard({ game }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
  }
  const handleImageOnError = (e) => {
    console.log("idid", "error", game.images[0])
    return (e.target.src = "/images/image-loading-error.jpg")
  }

  return (
    <Box>
      <Card>
        <CardMedia
          sx={{ height: { xs: 150, sm: 200 }, bgcolor: "background.default" }}
          component={"img"}
          image={game.images[0]}
          onError={handleImageOnError}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
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
