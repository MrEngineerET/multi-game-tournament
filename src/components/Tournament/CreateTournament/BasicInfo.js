import React from "react"
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  CardHeader,
} from "@mui/material"
import { useMediaQuery, useTheme } from "@mui/material"
import { stageType } from "../../../api/tournament"

const sxStyles = {
  fieldName: {
    width: 200,
    fontSize: { xs: 16, md: 20 },
  },
  fieldInput: {
    flex: 1,
  },
}

export function BasicInfo() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Card elevation={3}>
      <CardHeader title="Basic Info" sx={{ bgcolor: "background.default" }} />
      <CardContent sx={{ p: 5 }}>
        <Stack gap={5}>
          <Stack direction={{ xs: "column", md: "row" }} gap={5}>
            <Typography sx={sxStyles.fieldName}>Tournament name</Typography>
            <Box sx={sxStyles.fieldInput}>
              <TextField
                required
                fullWidth
                name="tournament_name"
                variant="outlined"
                size={isSmallScreen ? "small" : "normal"}
              />
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} gap={5}>
            <Typography sx={sxStyles.fieldName}>Description</Typography>
            <Box sx={sxStyles.fieldInput}>
              <TextField
                fullWidth
                name="tournament_desc"
                variant="outlined"
                multiline
                minRows={3}
                maxRows={5}
                size={isSmallScreen ? "small" : "normal"}
                required
              />
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} gap={5}>
            <Typography sx={sxStyles.fieldName}>Type</Typography>
            <Box sx={sxStyles.fieldInput}>
              <TextField
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
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} gap={5}>
            <Typography sx={sxStyles.fieldName}>Participants</Typography>
            <Box sx={sxStyles.fieldInput}>
              <TextField
                name="participants"
                fullWidth
                size={isSmallScreen ? "small" : "normal"}
                multiline
                minRows={3}
                maxRows={5}
              />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
      {/* <CardActions sx={{ mb: 5, pl: 5 }}>
        <Button type="submit">Save and continue</Button>
      </CardActions> */}
    </Card>
  )
}
