import React from "react"
import PropTypes from "prop-types"

export function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <div> {children}</div>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}
