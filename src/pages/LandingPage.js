import React from "react"
import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { Box } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { Hero } from "../components/LandingPage/Hero"
import { Features } from "../components/LandingPage/Features"
import { HowItWorks } from "../components/LandingPage/HowItWorks"
// import { Pricing } from "../components/LandingPage/Pricing"
import { AreYouReady } from "../components/LandingPage/AreYourReady"
import { Footer } from "../components/LandingPage/Footer"

export const LandingPage = () => {
  const { user } = useAuth()

  if (!user)
    return (
      <>
        <Hero />
        <CurveDivider position="bottom" fillColor="#f5f5f6" />
        <Features />
        <CurveDivider position="top" fillColor="#f5f5f6" />
        <HowItWorks />
        <TiltDivider />
        {/* <Pricing /> */}
        <AreYouReady />
        <Footer />
      </>
    )

  return <Navigate to="/tournament" />
}

function CurveDivider({ position = "bottom", fillColor = "#f5f5f6" }) {
  return (
    <Box sx={{ position: "relative" }}>
      <div
        className={`curve ${position} ${position === "bottom" && "transform"}`}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <Box
            component={"path"}
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            sx={{ fill: fillColor }}
          />
        </svg>
      </div>
    </Box>
  )
}
CurveDivider.propTypes = {
  position: PropTypes.oneOf(["top", "bottom"]),
  fillColor: PropTypes.string,
}

function TiltDivider() {
  return (
    <Box sx={{ position: "relative" }}>
      <div className="tilt">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </Box>
  )
}
