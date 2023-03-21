import React, { useState } from "react"
import PropTypes from "prop-types"
import { ClickAwayListener, Tooltip } from "@mui/material"

export function ClickToolTip({ children, title }) {
  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        title={title}
        placement="top-start"
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        onClick={handleTooltipOpen}
      >
        {children}
      </Tooltip>
    </ClickAwayListener>
  )
}

ClickToolTip.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}
