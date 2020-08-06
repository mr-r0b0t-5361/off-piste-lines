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
} from '@material-ui/core';
import { NAME, SKI_DIFFICULTY } from './constants/sorting-types.js';
import getSortedArray from './util/getSortedArray.js';
import GeodataMap from './GeodataMap.js';

const OffPistes = props => {
  const { classes } = props;

  const [offPistes, changeOffPistes] = useState([]);
  const [sortingType, changeSortingType] = useState(null);
  const [isMapOpen, changeIsMapOpen] = useState(false);
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
          <List component="nav" aria-label="offPistes">
            {offPistes.map(offPiste => renderOffPisteItem(offPiste, changeIsMapOpen, changeCurrentPisteGeoData))}
          </List>
        </Container>
      </main>
      <GeodataMap data={currentPisteGeoData} isOpened={isMapOpen} onChangeOpened={changeIsMapOpen} />
    </React.Fragment>
  )
}

async function parseAndRefreshOffPistes(changeOffPistes) {
  const offPistes = await require('./assets/off-pistes.json');
  changeOffPistes(offPistes)
}

function renderOffPisteItem (offPiste, changeIsMapOpen, changeCurrentPisteGeoData) {
  const { name, short_description, ski_difficulty, geo_data } = offPiste;

  return (
    <div key={name}>
      <ListItem button alignItems="flex-start" onClick={() => {
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
    </div>
  )
}

function onSortingChecked(type, sortingType, offPistes, changeSortingType, changeOffPistes) {
  if (sortingType !== type) {
    const sortedOffPistes = getSortedArray(offPistes, type, true);
    changeSortingType(type);
    changeOffPistes(sortedOffPistes)
  }
}

export default OffPistes;