import React from "react"
import {
  Card,
  CardContent,
  Stack,
  TextField,
  MenuItem,
  CardHeader,
} from "@mui/material"
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
  FormControl,
} from "@mui/material"
import { useMediaQuery, useTheme } from "@mui/material"
import { stageType } from "../../../api/tournament"

export function BasicInfo() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const [selectedStageType, setSelectedStageType] = React.useState(
    stageType.singleElimination,
  )
  const [consolationFinal, setConsolationFinal] = React.useState(true)

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
          <Box>
            <TextField
              label="Type"
              name="stage_type"
              fullWidth
              select
              value={selectedStageType}
              onChange={(e) => {
                setSelectedStageType(e.target.value)
              }}
              size={isSmallScreen ? "small" : "normal"}
            >
              <MenuItem value={stageType.singleElimination}>
                Single Elimination
              </MenuItem>
              <MenuItem value={stageType.doubleElimination}>
                Double Elimination
              </MenuItem>
            </TextField>
            {selectedStageType === stageType.singleElimination && (
              <FormControlLabel
                label={
                  <Typography sx={{ ml: 5, fontSize: 14, opacity: 0.9 }}>
                    Third Place Match
                  </Typography>
                }
                labelPlacement="start"
                name="consolation_final"
                value={consolationFinal}
                onChange={(e) => {
                  setConsolationFinal(e.target.checked)
                }}
                control={<Checkbox defaultChecked size="small" />}
              />
            )}
            {selectedStageType === stageType.doubleElimination && (
              <FormControl sx={{ ml: 10, mt: 1 }}>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{ fontSize: 14 }}
                >
                  Grand Final
                </FormLabel>
                <RadioGroup defaultValue="double" name="grand_final">
                  <FormControlLabel
                    value="single"
                    control={
                      <Radio
                        sx={{
                          py: 1.5,
                          "& .MuiSvgIcon-root": {
                            fontSize: 16,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 14 }}>Single</Typography>
                    }
                  />
                  <FormControlLabel
                    value="double"
                    control={
                      <Radio
                        sx={{
                          py: 1.5,
                          "& .MuiSvgIcon-root": {
                            fontSize: 16,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 14 }}>Double</Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
