import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

export const LandingPage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Login</Link>
          <Link to="/login">Sign up</Link>
        </li>
      </ul>
      <div>This is the landing page</div>
      <Button variant="contained">MUI Test Button</Button>
    </div>
  )
}

LandingPage.propTypes = {
  setShowLandingPage: PropTypes.func.isRequired,
  pathname: PropTypes.string,
}
