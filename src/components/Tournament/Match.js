import React from "react"
import PropTypes from "prop-types"
import { Box, Divider, IconButton, Typography } from "@mui/material"
import BorderColorIcon from "@mui/icons-material/BorderColor"

const styleConstants = {
  borderRadius: "5px",
  fontSize: {
    xs: "0.9rem",
    sm: "1rem",
  },
  fontColor: "#eee",
}
const styles = {
  match: {
    position: "relative",
    width: "max-content",
    boxShadow: 3,
    borderRadius: styleConstants.borderRadius,
    "&:hover": {
      border: "1px solid",
      borderColor: "primary.main",
      boxShadow: 4,
    },
  },
  opponent: {
    display: "flex",
    justifyContent: "space-between",
    gap: 2,
    color: styleConstants.fontColor,
    bgcolor: "bracket.background",
    "&:first-of-type": {
      borderTopRightRadius: styleConstants.borderRadius,
      borderTopLeftRadius: styleConstants.borderRadius,
      "& span:last-of-type": {
        borderTopRightRadius: styleConstants.borderRadius,
      },
    },
    "&:last-of-type": {
      borderBottomRightRadius: styleConstants.borderRadius,
      borderBottomLeftRadius: styleConstants.borderRadius,
      "& span:last-of-type": {
        borderBottomRightRadius: styleConstants.borderRadius,
      },
    },
  },
  score: {
    minWidth: { xs: "2rem", sm: "2.5rem" },
    bgcolor: "bracket.score",
    fontSize: styleConstants.fontSize,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: { xs: 0.5, sm: 1 },
  },
  name: {
    width: { xs: 130, sm: 160 },
    p: { xs: 0.5, sm: 1 },
    pl: { xs: 1, sm: 2 },
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
    fontSize: styleConstants.fontSize,
  },
  invisible: {
    visibility: "hidden",
  },
  editScore: {
    position: "absolute",
    minWidth: { xs: "2rem", sm: "2.5rem" },
    height: "100%",
    bgcolor: "bracket.background",
    top: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 1,
    borderTopRightRadius: styleConstants.borderRadius,
    borderBottomRightRadius: styleConstants.borderRadius,
  },
  editIcon: {
    fontSize: { xs: "1rem", sm: "1.25rem" },
    fill: styleConstants.fontColor,
  },
  winner: {
    bgcolor: "primary.main",
  },
}

export function Match({
  match = {
    id: 0,
    number: 1,
    round_id: 0,
    participants: [
      {
        id: null,
        score: 2,
        name: "Belay Adamu",
      },
      {
        id: null,
        score: 4,
        name: "Biruk Berhanu",
      },
    ],
  },
}) {
  const bothParticipantsPresent =
    match.participants[0].name && match.participants[1].name
  const showEditButton =
    bothParticipantsPresent &&
    !match.participants[0].score &&
    !match.participants[1].score

  const isGameOver = match.participants[0].score && match.participants[1].score
  let winnerIndex = null
  if (isGameOver) {
    winnerIndex =
      match.participants[0].score > match.participants[1].score ? 0 : 1
  }

  return (
    <Box sx={styles.match}>
      {match.participants.map((participant, i) => {
        const opponent = [
          <Box sx={styles.opponent} key={i}>
            <Typography component="span" sx={styles.name}>
              {participant.name}
            </Typography>
            <Typography
              sx={[
                styles.score,
                winnerIndex == i && styles.winner,
                !bothParticipantsPresent && styles.invisible,
              ]}
              component="span"
            >
              {participant.score || "-"}
            </Typography>
          </Box>,
        ]
        if (i == 0)
          opponent.push(
            <Divider
              key="divider"
              sx={{
                borderColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "#78787c"
                    : theme.palette.background.default,
              }}
            />,
          )
        return opponent
      })}
      {showEditButton && (
        <Box sx={styles.editScore}>
          <IconButton>
            <BorderColorIcon sx={styles.editIcon} />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

Match.propTypes = {
  match: PropTypes.object,
}
