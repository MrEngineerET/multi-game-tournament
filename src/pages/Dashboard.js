import React from "react"
import PropTypes from "prop-types"
import { AppHeaderBar } from "../components/AppHeaderBar"

export function Dashboard() {
  return <div>This is a dashboard</div>
}

export function DashBoardLayOut({ children }) {
  return (
    <div>
      {/* TODO: prepare a new admin dashboard header */}
      <AppHeaderBar />
      {children}
    </div>
  )
}

DashBoardLayOut.propTypes = {
  children: PropTypes.node.isRequired,
}
