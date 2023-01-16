import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

export const LandingPage = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Login</Link> <Link to="/signup">Sign up</Link>
        </li>
      </ul>
      <div>This is the landing page</div>
      <Button variant="contained">MUI Button</Button>
    </div>
  )
}

LandingPage.propTypes = {
  setShowLandingPage: PropTypes.func.isRequired,
  pathname: PropTypes.string,
}
