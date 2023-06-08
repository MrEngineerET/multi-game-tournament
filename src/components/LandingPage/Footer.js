import { Box, Container, IconButton, Typography } from "@mui/material"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import React from "react"

const commonStyles = {
  icon: { fill: "#374151" },
}

export function Footer() {
  return (
    <Box
      sx={{
        pt: 5,
        pb: 5,
        borderTopWidth: 1,
        borderColor: "rgba(17,24,39,var(0.1))",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            © Copyright 2023 Company. All rights reserved.
          </Typography>
          <Box>
            <IconButton>
              <TwitterIcon sx={commonStyles.icon} />
            </IconButton>
            <IconButton>
              <InstagramIcon sx={commonStyles.icon} />
            </IconButton>
            <IconButton>
              <FacebookIcon sx={commonStyles.icon} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
