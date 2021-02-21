import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';

const OffPisteItem = ({offPiste, changeIsMapOpen, changeCurrentPisteGeoData}) => {
  const { name, short_description, ski_difficulty, geo_data } = offPiste;

  return (
      <ListItem key={name} button alignItems="flex-start" onClick={() => {
        changeIsMapOpen(true);
        changeCurrentPisteGeoData(geo_data)
      }}>
        <ListItemText
          primary={name}
          secondary={<React.Fragment>
            <Typography>
              {short_description}
            </Typography>
            <Typography>
              {`Ski difficulty: ${ski_difficulty}`}
            </Typography>
          </React.Fragment>} />
      </ListItem>
  )
}

export default OffPisteItem;