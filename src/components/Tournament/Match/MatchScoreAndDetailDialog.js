import React, { useState, useEffect } from "react"
import { Tabs, Tab, DialogContent } from "@mui/material"
import { Dialog } from "@mui/material"
import { Box } from "@mui/material"
import PropTypes from "prop-types"
import { TabPanel } from "../../Common/TabPanel"
import { MatchDetail } from "./MatchDetail"
import { ReportScore } from "./ReportScore"

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
  useEffect(() => {
    setTabValue(tab)
  }, [tab])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ boxShadow: 3 }}>
        <Tabs
          value={tabValue}
          variant="fullWidth"
          textColor="inherit"
          onChange={(e, newValue) => setTabValue(newValue)}
        >
          <Tab label="Match Detail" />
          <Tab label="Report Score" />
        </Tabs>
      </Box>
      <DialogContent>
        <TabPanel index={0} value={tabValue}>
          <MatchDetail match={match} />
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
