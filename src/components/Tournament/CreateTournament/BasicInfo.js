import React from "react"
import {
  Card,
  CardContent,
  Stack,
  TextField,
  MenuItem,
  CardHeader,
} from "@mui/material"
import { useMediaQuery, useTheme } from "@mui/material"
import { stageType } from "../../../api/tournament"

export function BasicInfo() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Card elevation={3}>
      <CardHeader title="Basic Info" sx={{ bgcolor: "background.default" }} />
      <CardContent sx={{ p: 5 }}>
        <Stack gap={5}>
          <TextField
            label="Tournament name"
            required
            fullWidth
            name="tournament_name"
            variant="outlined"
            size={isSmallScreen ? "small" : "normal"}
            autoFocus
          />

          <TextField
            label="Description"
            fullWidth
            name="tournament_desc"
            variant="outlined"
            multiline
            minRows={3}
            maxRows={5}
            size={isSmallScreen ? "small" : "normal"}
            required
          />

          <TextField
            label="Type"
            name="stage_type"
            fullWidth
            select
            defaultValue={stageType.singleElimination}
            size={isSmallScreen ? "small" : "normal"}
          >
            <MenuItem value={stageType.singleElimination}>
              Single Elimination
            </MenuItem>
            <MenuItem value={stageType.doubleElimination}>
              Double Elimination
            </MenuItem>
          </TextField>

          <TextField
            label="Participants"
            name="participants"
            fullWidth
            size={isSmallScreen ? "small" : "normal"}
            multiline
            minRows={3}
            maxRows={5}
            required
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
