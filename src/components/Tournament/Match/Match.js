import React from "react"
import PropTypes from "prop-types"
import { Box, Divider, IconButton, Typography } from "@mui/material"
import { ClickToolTip } from "../../Common/ClickTooltip"
import InfoIcon from "@mui/icons-material/Info"
import SportsScoreIcon from "@mui/icons-material/SportsScore"
import { tabs as matchEditDialogTabs } from "./MatchScoreAndDetailDialog"
import { useTournamentContext } from "../../../context/TournamentContext"

const styleConstants = {
  borderRadius: "5px",
  fontSize: {
    xs: "0.9rem",
    sm: "1rem",
  },
  fontColor: "#eee",
}
const styles = {
  root: {
    display: "inline-block",
    position: "relative",
    "&:hover #match_tool_tip": {
      visibility: "visible",
    },
  },
  match: {
    position: "relative",
    width: "max-content",
    borderRadius: styleConstants.borderRadius,
    border: "1px solid",
    borderColor: "background.default",
    "&:hover": {
      border: "1px solid",
      borderColor: "primary.light",
      boxShadow: 4,
    },
    zIndex: 10,
  },

  opponent: {
    display: "flex",
    justifyContent: "space-between",
    gap: 2,
    color: styleConstants.fontColor,
    bgcolor: "bracket.background",
  },
  opponentTop: {
    borderTopRightRadius: styleConstants.borderRadius,
    borderTopLeftRadius: styleConstants.borderRadius,
    "& span:last-of-type": {
      borderTopRightRadius: styleConstants.borderRadius,
    },
  },
  opponentBottom: {
    borderBottomRightRadius: styleConstants.borderRadius,
    borderBottomLeftRadius: styleConstants.borderRadius,
    "& span:last-of-type": {
      borderBottomRightRadius: styleConstants.borderRadius,
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
    height: 1,
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
  editIcon: (theme) => ({
    fontSize: { xs: "1rem", sm: "1.25rem" },
    color: styleConstants.fontColor,
    ":hover": {
      color: theme.palette.primary.light,
    },
  }),
  winner: {
    bgcolor: "primary.main",
  },
  matchToolTipWrapper: {
    position: "absolute",
    right: -50,
    top: 0,
    height: 1,
    width: 55,
    visibility: "hidden",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  matchToolTip: (theme) => ({
    width: 1,
    height: 0.55,
    background: theme.palette.bracket.background,
    borderRadius: 1,
    opacity: 0.9,
    display: "flex",
    justifyContent: "center",
    zIndex: 5,
  }),
  divider: {
    borderColor: (theme) =>
      theme.palette.mode === "light"
        ? "#78787c"
        : theme.palette.background.default,
  },
}

export function Match({ match }) {
  const matchCompleted = match.status === 4 || match.status === 5
  const matchReady = match.status === 2

  const { openMatchScoreEditDialog, tournamentData } = useTournamentContext()
  const tournamentStatus = tournamentData.status

  return (
    <Box sx={styles.root}>
      <Box sx={styles.match}>
        <Box sx={[styles.opponent, styles.opponentTop]}>
          <Typography component="span" sx={styles.name}>
            {match.participants[0]?.name}
          </Typography>
          <Typography
            sx={[
              styles.score,
              !matchCompleted && styles.invisible,
              match.participants[0]?.result === "win" && styles.winner,
            ]}
            component="span"
          >
            {match.participants[0]?.score || "-"}
          </Typography>
        </Box>
        <Divider key="divider" sx={styles.divider} />
        <Box sx={[styles.opponent, styles.opponentBottom]}>
          <Typography component="span" sx={styles.name}>
            {match.participants[1]?.name}
          </Typography>
          <Typography
            sx={[
              styles.score,
              !matchCompleted && styles.invisible,
              match.participants[1]?.result === "win" && styles.winner,
            ]}
            component="span"
          >
            {match.participants[1]?.score || "-"}
          </Typography>
        </Box>
        {matchReady && (
          <Box sx={styles.editScore}>
            <ClickToolTip
              title={
                tournamentStatus !== "progress"
                  ? "Please first start the Tournament"
                  : ""
              }
            >
              <span>
                <IconButton
                  onClick={() =>
                    openMatchScoreEditDialog(
                      match,
                      matchEditDialogTabs.reportScore,
                    )
                  }
                  disabled={tournamentStatus !== "progress"}
                >
                  <SportsScoreIcon sx={styles.editIcon} />
                </IconButton>
              </span>
            </ClickToolTip>
          </Box>
        )}
      </Box>
      <Box id="match_tool_tip" sx={styles.matchToolTipWrapper}>
        <Box sx={styles.matchToolTip}>
          <IconButton
            onClick={() =>
              openMatchScoreEditDialog(match, matchEditDialogTabs.matchDetail)
            }
          >
            <InfoIcon
              sx={{
                fill: "lightgrey",
                ":hover": { fill: (theme) => theme.palette.primary.light },
              }}
              fontSize="small"
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

Match.propTypes = {
  match: PropTypes.object,
}
