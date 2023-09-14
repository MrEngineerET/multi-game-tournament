import React, { useState, useEffect } from "react"
import { Tabs, Tab, DialogContent } from "@mui/material"
import { Dialog } from "@mui/material"
import { Box } from "@mui/material"
import PropTypes from "prop-types"
import { TabPanel } from "../../Common/TabPanel"
import { MatchDetail } from "./MatchDetail"
import { ReportScore } from "./ReportScore"
import { useTournamentContext } from "../../../context/TournamentContext"

export const tabs = {
  matchDetail: 0,
  reportScore: 1,
}

export const MatchScoreAndDetailDialog = ({
  open,
  onClose,
  match,
  tab = 0,
}) => {
  const [tabValue, setTabValue] = useState(tab)
  const { tournamentData } = useTournamentContext()
  const hideScoreEdit = // if match is not (ready and running) and tounament in not in progress
    (match?.status !== 2 && match?.status !== 3) ||
    tournamentData.status !== "progress"

  useEffect(() => {
    if (hideScoreEdit) setTabValue(0)
    else setTabValue(tab)
  }, [tab, hideScoreEdit])

  const handleClose = (e, reason) => {
    if (reason === "escapeKeyDown" || reason === "backdropClick") return
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ boxShadow: 3 }}>
        <Tabs
          value={tabValue}
          variant="fullWidth"
          textColor="inherit"
          onChange={(e, newValue) => setTabValue(newValue)}
          indicatorColor={hideScoreEdit ? "inherit" : "primary"}
        >
          <Tab label="Match Detail" />
          {!hideScoreEdit && <Tab label="Report Score" />}
        </Tabs>
      </Box>
      <DialogContent>
        <TabPanel index={0} value={tabValue}>
          <MatchDetail match={match} onClose={onClose} />
        </TabPanel>
        <TabPanel index={1} value={tabValue}>
          <ReportScore match={match} onClose={onClose} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  )
}

MatchScoreAndDetailDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  match: PropTypes.object,
  tab: PropTypes.number,
}
