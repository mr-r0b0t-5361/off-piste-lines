import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Toolbar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import { NAME, SKI_DIFFICULTY } from './constants/sorting-types.js';
import getSortedArray from './util/getSortedArray.js';
import formatGoogleMapsLineArray from './util/formatGoogleMapsLineArray.js';
import { GOOGLE_MAPS_API } from './constants/api.js';

const OffPistes = props => {
  const { classes } = props;

  const [offPistes, changeOffPistes] = useState([]);
  const [sortingType, changeSortingType] = useState(null);
  const [isPisteLineDialogOpen, changeIsPisteLineDialogOpen] = useState(false);
  const [currentPisteGeoData, changeCurrentPisteGeoData] = useState(null);

  parseAndRefreshOffPistes(changeOffPistes);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {'Off-piste Lines'}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <FormGroup row>
            <FormLabel style={{ marginRight: 15 }} component="legend">{'Sort by: '}</FormLabel>
            <FormControlLabel
              control={
                <Checkbox checked={sortingType === NAME} onChange={() => onSortingChecked(NAME, sortingType, offPistes, changeSortingType, changeOffPistes)} value="checked" />
              }
              label="Name"
            />
            <FormControlLabel
              control={
                <Checkbox checked={sortingType === SKI_DIFFICULTY} onChange={() => onSortingChecked(SKI_DIFFICULTY, sortingType, offPistes, changeSortingType, changeOffPistes)} value="checked" />
              }
              label="Ski Difficulty"
            />
          </FormGroup>
          <List component="nav" aria-label="main mailbox folders">
            {offPistes.map(offPiste => renderOffPisteItem(offPiste, changeIsPisteLineDialogOpen, changeCurrentPisteGeoData))}
          </List>
        </Container>
      </main>
      <Dialog onClose={() => changeIsPisteLineDialogOpen(false)} aria-labelledby="customized-dialog-title" open={isPisteLineDialogOpen}>
        <DialogTitle id="customized-dialog-title">
          {'Piste Line'}
        </DialogTitle>
        <DialogContent>
          {currentPisteGeoData ?
            <div style={{ height: 300, width: 400 }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={google => handleGoogleMapApi(google, currentPisteGeoData)}
                defaultCenter={getFirstPositionInLine(currentPisteGeoData)}
                defaultZoom={13}
              >
              </GoogleMapReact>
            </div> : <Typography>
              {'No lines available'}
            </Typography>}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => changeIsPisteLineDialogOpen(false)} color="primary">
            {'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

async function parseAndRefreshOffPistes(changeOffPistes) {
  const offPistes = await require('./assets/off-pistes.json');
  changeOffPistes(offPistes)
}

function renderOffPisteItem (offPiste, changeIsPisteLineDialogOpen, changeCurrentPisteGeoData) {
  const { name, short_description, ski_difficulty, geo_data } = offPiste;

  return (
    <div key={name}>
      <ListItem k button alignItems="flex-start" onClick={() => {
        changeIsPisteLineDialogOpen(true);
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
    </div>
  )
}

function getFirstPositionInLine(currentPisteGeoData) {
  if (!currentPisteGeoData || !currentPisteGeoData.coordinates) return;
  return {
    lat: currentPisteGeoData.coordinates[0][0][1],
    lng: currentPisteGeoData.coordinates[0][0][0],
  };
}

function onSortingChecked(type, sortingType, offPistes, changeSortingType, changeOffPistes) {
  if (sortingType !== type) {
    const sortedOffPistes = getSortedArray(offPistes, type, true);
    changeSortingType(type);
    changeOffPistes(sortedOffPistes)
  }
}

function handleGoogleMapApi(google, currentPisteGeoData) {
  if (!currentPisteGeoData) return;
  const { coordinates } = currentPisteGeoData;
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

export default OffPistes;