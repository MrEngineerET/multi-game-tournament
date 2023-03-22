import React, { useState } from "react"

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

export function TournamentList() {
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
                {!tournaments && <Typography>No result were found</Typography>}
                {tournaments && (
                  <TournamentListTable tournaments={tournaments} />
                )}
              </>
            )}
          </Await>
        </React.Suspense>
      </Card>
    </Box>
  )
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

const filteringOptions = {
  all: "all",
  pending: "pending",
  progress: "progress",
  completed: "completed",
  archived: "archived",
}
export function TournamentFilter() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))

  const [selectedFilter, setSelectedFilter] = useState(filteringOptions.all)

  const handleFilterChange = (option) => {
    setSelectedFilter(option)
  }

  if (isMediumScreen)
    return (
      <Tabs
        value={selectedFilter}
        onChange={(e, newValue) => handleFilterChange(newValue)}
        sx={sxStyles.tabs}
        variant={isSmallScreen ? "scrollable" : "standard"}
      >
        <Tab sx={sxStyles.tab} label="All" value={filteringOptions.all} />
        <Tab
          sx={sxStyles.tab}
          label="Pending"
          value={filteringOptions.pending}
        />
        <Tab
          sx={sxStyles.tab}
          label="Progress"
          value={filteringOptions.progress}
        />
        <Tab
          sx={sxStyles.tab}
          label="Completed"
          value={filteringOptions.completed}
        />
        <Tab
          sx={sxStyles.tab}
          label="Arvhived"
          value={filteringOptions.archived}
        />
      </Tabs>
    )

  return (
    <Card sx={{ bgcolor: "background.lightest" }} elevation={0}>
      <List>
        <ListItemButton
          selected={selectedFilter === filteringOptions.all}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange(filteringOptions.all)}
        >
          <ListItemText>All Tournaments</ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={selectedFilter === filteringOptions.pending}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange(filteringOptions.pending)}
        >
          <ListItemIcon>
            <PendingOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Pending</ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={selectedFilter === filteringOptions.progress}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange(filteringOptions.progress)}
        >
          <ListItemIcon>
            <PlayCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText>In Progress</ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={selectedFilter === filteringOptions.completed}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange(filteringOptions.completed)}
        >
          <ListItemIcon>
            <DoneAllIcon />
          </ListItemIcon>
          <ListItemText>Completed</ListItemText>
        </ListItemButton>
        <ListItemButton
          selected={selectedFilter === filteringOptions.archived}
          sx={sxStyles.listItemButton}
          onClick={() => handleFilterChange(filteringOptions.archived)}
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
