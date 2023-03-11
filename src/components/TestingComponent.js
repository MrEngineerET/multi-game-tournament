import React from "react"
import { Avatar, AvatarGroup } from "@mui/material"

const images = [
  "https://i.pravatar.cc/150?img=33",
  "https://i.pravatar.cc/150?img=43",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=30",
  "https://i.pravatar.cc/150?img=33",
]

export default function Demo() {
  return (
    <AvatarGroup
      max={4}
      spacing={-8}
      //   classes={{ avatar: classes.avatar }}
      sx={{ avatar: { bgcolor: "red" }, width: 15, height: 15 }}
      variant="rounded"
    >
      {images.map((i) => (
        <Avatar key={i} alt="Remy Sharp" src={i} />
      ))}
    </AvatarGroup>
  )
}
