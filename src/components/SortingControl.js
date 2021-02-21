import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, FormLabel } from '@material-ui/core';
import { NAME, SKI_DIFFICULTY } from '../constants/sorting-types.js';

const SortingControl = ({ type, onChangeType }) => {
  return (
    <FormGroup row>
      <FormLabel style={{ marginRight: 15 }} component="legend">{'Sort by: '}</FormLabel>
      <FormControlLabel
        control={<Checkbox checked={type === NAME} onChange={() => onChangeType(NAME)} />}
        label="Name"
      />
      <FormControlLabel
        control={<Checkbox checked={type === SKI_DIFFICULTY} onChange={() => onChangeType(SKI_DIFFICULTY)} />}
        label="Ski Difficulty"
      />
    </FormGroup>
  )
}

export default SortingControl;