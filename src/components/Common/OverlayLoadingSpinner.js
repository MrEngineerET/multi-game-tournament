import React from "react"
import { CircularProgress } from "@mui/material"

export const OverlayLoadingSpinner = () => {
  return (
    <div
      style={{
        width: "100vw", // 100% of viewport width
        height: "100vh", // 100% of viewport height
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark overlay color with 20% opacity
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  )
}
