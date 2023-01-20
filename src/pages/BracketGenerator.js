import React from "react"
import { Box, Typography, Divider } from "@mui/material"
import PropTypes from "prop-types"

const styles = {
  paper: {
    m: 5,
    border: 1,
    height: 400,
    p: 3,
  },
  root: {
    width: 200,
    borderRadius: "5px",
    bgcolor: "#bbb",
  },
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

export const BracketGenerator = () => {
  return (
    <Box sx={styles.paper}>
      <Box sx={styles.root}>
        <Row name="Player One" score={5} isTop />
        <Divider color="white" />
        <Row name="Player Two" score={2} isWinner />
      </Box>
    </Box>
  )
}

function Row({ name, score, isWinner, isTop }) {
  return (
    <Box sx={[styles.row, isTop ? styles.borderTop : styles.borderBottom]}>
      <Typography sx={styles.name} variant="text">
        {name}
      </Typography>
      <Typography
        sx={[
          styles.score,
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
