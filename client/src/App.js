import React from 'react';

import styled from 'styled-components'

import landTiles from './sprites/spritesheets/grassland.png'

import MapCreate from './containers/MapCreate'

function App() {
  console.log(landTiles)
  return (
    <Container>
      <MapCreate />
    </Container>
  );
}

export default App;

const Container = styled.div`

  width: 100vw;
  height: 100vh;

`
