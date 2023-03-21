import React from "react"
import PropTypes from "prop-types"
import { Skeleton } from "@mui/material"

export function TournamentListSkeleton({ length = 6 }) {
  const arr = Array(length).fill(0)
  return (
    <>
      {arr.map((el, i) => (
        <Skeleton key={i} height="5rem" animation="wave" />
      ))}
    </>
  )
}

TournamentListSkeleton.propTypes = {
  length: PropTypes.number,
}
