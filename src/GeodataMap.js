import React from 'react';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import formatGoogleMapsLineArray from './util/formatGoogleMapsLineArray.js';
import { GOOGLE_MAPS_API } from './constants/api.js';

const GeodataMap = props => {
  const { data, isOpened, onChangeOpened } = props;

  return (
    <Dialog onClose={() => onChangeOpened(false)} aria-labelledby="customized-dialog-title" open={isOpened}>
      <DialogTitle id="customized-dialog-title">
        {'Piste Line'}
      </DialogTitle>
      <DialogContent>
        {data ?
          <div style={{ height: 300, width: 400 }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: GOOGLE_MAPS_API }}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={google => handleGoogleMapApi(google, data)}
              defaultCenter={getFirstPositionInLine(data)}
              defaultZoom={13}
            >
            </GoogleMapReact>
          </div> : <Typography>
            {'No lines available'}
          </Typography>}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onChangeOpened(false)} color="primary">
          {'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function getFirstPositionInLine(data) {
  if (!data || !data.coordinates) return;

  return {
    lat: data.coordinates[0][0][1],
    lng: data.coordinates[0][0][0],
  };
}

function handleGoogleMapApi(google, data) {
  if (!data) return;

  const { coordinates } = data;
  const formatedLineArray = formatGoogleMapsLineArray(coordinates);

  formatedLineArray.forEach(formatedLine => {
    const line = new google.maps.Polyline({
      path: formatedLine,
      geodesic: true,
      strokeColor: '#33BD4E',
      strokeOpacity: 1,
      strokeWeight: 5
    });

    line.setMap(google.map);
  })
}

export default GeodataMap;