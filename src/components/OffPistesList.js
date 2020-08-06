import React, { useState } from 'react';
import { List, Container } from '@material-ui/core';
import getSortedArray from '../util/getSortedArray.js';
import GeodataMap from './GeodataMap.js';
import OffPisteItem from './OffPistesItem.js';
import SortingControl from './SortingControl.js';
import Bar from './Bar.js';

const OffPistes = props => {
  const { classes } = props;

  const [offPistes, changeOffPistes] = useState([]);
  const [sortingType, changeSortingType] = useState(null);
  const [isMapOpen, changeIsMapOpen] = useState(false);
  const [currentPisteGeoData, changeCurrentPisteGeoData] = useState(null);

  parseAndRefreshOffPistes(changeOffPistes);

  return (
    <React.Fragment>
      <Bar/>
      <Container className={classes.cardGrid} maxWidth="md">
        <SortingControl type={sortingType} onChangeType={type => onSortingChecked(type, sortingType, offPistes, changeSortingType, changeOffPistes)} />
        <List component="nav" aria-label="offPistes">
          {offPistes.map(offPiste =>
            <OffPisteItem
              offPiste={offPiste}
              changeIsMapOpen={changeIsMapOpen}
              changeCurrentPisteGeoData={changeCurrentPisteGeoData} />)}
        </List>
      </Container>
      <GeodataMap data={currentPisteGeoData} isOpened={isMapOpen} onChangeOpened={changeIsMapOpen} />
    </React.Fragment>
  )
}

async function parseAndRefreshOffPistes(changeOffPistes) {
  const offPistes = await require('../assets/off-pistes.json');
  changeOffPistes(offPistes)
}

function onSortingChecked(type, sortingType, offPistes, changeSortingType, changeOffPistes) {
  if (sortingType !== type) {
    const sortedOffPistes = getSortedArray(offPistes, type, true);
    changeSortingType(type);
    changeOffPistes(sortedOffPistes)
  }
}

export default OffPistes;