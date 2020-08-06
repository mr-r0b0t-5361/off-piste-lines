import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';

const Bar = () => {
  return (
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {'Off-piste Lines'}
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default Bar;