import React from "react"
import PropTypes from "prop-types"
import { Box, Typography, Divider } from "@mui/material"

const matchStyles = {
  root: {
    width: 200,
    borderRadius: "5px",
    bgcolor: "#bbb",
    boxShadow: 3,
    "&:hover": {
      border: "1px solid",
      borderColor: "primary.main",
      boxShadow: 4,
    },
  },
}

const rowStyles = {
  row: {
    bgcolor: ({ palette }) => palette.bracket.background,
    display: "flex",
    justifyContent: "space-between",
    alignItem: "center",
    color: "white",
  },
  score: {
    width: "2rem",
    p: 0.5,
    textAlign: "center",
    bgcolor: (theme) => theme.palette.bracket.score,
  },
  name: {
    p: 0.5,
    pl: 2,
  },
  borderTop: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  borderBottom: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
}

export const Match = () => {
  return (
    <Box sx={matchStyles.root}>
      <Row name="Player One" score={5} isTop />
      <Divider sx={{ borderColor: "background.default" }} />
      <Row name="Player Two" score={2} isWinner />
    </Box>
  )
}

function Row({ name, score, isWinner, isTop }) {
  return (
    <Box
      sx={[rowStyles.row, isTop ? rowStyles.borderTop : rowStyles.borderBottom]}
    >
      <Typography sx={rowStyles.name} variant="text">
        {name}
      </Typography>
      <Typography
        sx={[
          rowStyles.score,
          isWinner && { bgcolor: (theme) => theme.palette.primary.main },
          isTop ? { borderTopRightRadius: 5 } : { borderBottomRightRadius: 5 },
        ]}
        variant="text"
      >
        {score}
      </Typography>
    </Box>
  )
}
Row.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  isWinner: PropTypes.boolean,
  isTop: PropTypes.boolean,
}
