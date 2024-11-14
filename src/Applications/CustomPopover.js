// CustomPopover.js

import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Typography, Box } from '@mui/material'; // Import necessary Material-UI components

const CustomPopover = ({ appId, appDetails, anchorEl, onClose }) => {
  const isOpen = Boolean(anchorEl);

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box p={2} maxWidth={300}>
        <Typography variant="subtitle1"><strong>Name:</strong> {appDetails.appName}</Typography>
        <Typography variant="body2"><strong>Description:</strong> {appDetails.description}</Typography>
        <Typography variant="body2"><strong>Max Users:</strong> {appDetails.maxUsers}</Typography>
        <Typography variant="body2"><strong>isActive:</strong> {appDetails.isActive}</Typography>
        {/* Add more fields as needed */}
      </Box>
    </Popover>
  );
};

CustomPopover.propTypes = {
  appId: PropTypes.string.isRequired,
  appDetails: PropTypes.object.isRequired,
  anchorEl: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};

export default CustomPopover;
