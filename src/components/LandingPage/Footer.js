import { Box, Container, IconButton, Typography } from "@mui/material"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import React from "react"

const commonStyles = {
  icon: { fill: "#374151", fontSize: { xs: 15, sm: 20, md: 25 } },
}

export function Footer() {
  return (
    <Box
      sx={{
        pt: 5,
        pb: 5,
        borderTopWidth: 1,
        borderColor: "rgba(17,24,39,0.5)",
        bgcolor: "#e4e7eb",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 12,
                sm: 14,
                md: 16,
              },
            }}
          >
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
