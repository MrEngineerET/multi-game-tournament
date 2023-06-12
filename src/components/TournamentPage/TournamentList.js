import React from "react"
import PropTypes from "prop-types"
import { Box, Typography, Card, Button } from "@mui/material"
import { Await, useLoaderData } from "react-router-dom"
import { TournamentListSkeleton } from "./TournamentListSkeleton"
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Tabs, Tab } from "@mui/material"
import { useTheme, useMediaQuery } from "@mui/material"
import ArchiveIcon from "@mui/icons-material/Archive"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined"
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined"
import { TournamentListTable } from "./TournamentListTable"

export function TournamentList({ filter = "all" }) {
  const { tournaments } = useLoaderData()
  return (
    <Box sx={{ width: 1 }}>
      <Card
        sx={{ bgcolor: "background.lightest", p: 3, pt: 8, pb: 10 }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h6">Tournaments</Typography>
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ ml: 5 }}
              href="new"
            >
              + Tournament
            </Button>
          </Box>
        </Box>
        <React.Suspense fallback={<TournamentListSkeleton length={8} />}>
          <Await
            resolve={tournaments}
            errorElement={<div>Error while loading the tournaments</div>}
          >
            {(tournaments) => (
              <>
                <TournamentListTable
                  tournaments={tournaments}
                  filter={filter}
                />
              </>
            )}
          </Await>
        </React.Suspense>
      </Card>
    </Box>
  )
}
TournamentList.propTypes = {
  filter: PropTypes.string,
}

const sxStyles = {
  tabs: { maxWidth: 500, margin: "auto", minHeight: 35 },
  tab: (theme) => ({
    "&.Mui-selected": {
      bgcolor: "background.paper",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      flex: 1,
      fontSize: 12,
      minHeight: 35,
    },
  }),
  listItemButton: {
    "&.Mui-selected": {
      bgcolor: "background.lighter",
    },
    "&.Mui-selected:hover": {
      bgcolor: "background.lighter",
    },
  },
}

export function TournamentFilter({ selectedFilter = "all", onChange }) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleFilterChange = (option) => {
    onChange(option)
  }

  if (isMediumScreen)
    return (
      <Tabs
        value={selectedFilter}
        onChange={(e, newValue) => handleFilterChange(newValue)}
        sx={sxStyles.tabs}
        variant={isSmallScreen ? "scrollable" : "standard"}
      >
        <Tab sx={sxStyles.tab} label="All" value={"all"} />
        <Tab sx={sxStyles.tab} label="Pending" value={"pending"} />
        <Tab sx={sxStyles.tab} label="Progress" value={"progress"} />
        <Tab sx={sxStyles.tab} label="Completed" value={"completed"} />
        <Tab sx={sxStyles.tab} label="Arvhived" value={"archived"} />
      </Tabs>
    )

  return (
    <Card sx={{ bgcolor: "background.lightest" }} elevation={0}>
      <List>
        <ListItemButton
          selected={"all" == selectedFilter}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange("all")}
        >
          <ListItemText>All Tournaments</ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={"pending" == selectedFilter}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange("pending")}
        >
          <ListItemIcon>
            <PendingOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Pending</ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={"progress" == selectedFilter}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange("progress")}
        >
          <ListItemIcon>
            <PlayCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText>In Progress</ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={"completed" == selectedFilter}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange("completed")}
        >
          <ListItemIcon>
            <DoneAllIcon />
          </ListItemIcon>
          <ListItemText>Completed</ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={"archived" == selectedFilter}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange("archived")}
        >
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText>Archived</ListItemText>
        </ListItemButton>
      </List>
    </Card>
  )
}

TournamentFilter.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
