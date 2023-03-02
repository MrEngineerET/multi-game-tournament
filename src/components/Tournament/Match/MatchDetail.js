import React from "react"
import PropTypes from "prop-types"

export function MatchDetail({ match }) {
  return <div>Match Detail {match.name}</div>
}

MatchDetail.propTypes = {
  match: PropTypes.object,
}
