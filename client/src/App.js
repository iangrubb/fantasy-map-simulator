import React from 'react';

import styled from 'styled-components'

import MapCreate from './containers/MapCreate'

function App() {
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
