import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import Terrain from '../../sprites/Terrain'
import { setTerrainLevel } from '../../redux/actions'

import makeDetermineTerrain from '../helpers/makeDetermineTerrain'


const makeMSP = () => {
    const determineTerrain = makeDetermineTerrain()
    return (store, props) => ({terrainTiles: determineTerrain(store, props), terrainLevel: store.mapData.find( p => p.location.x === props.location.x && p.location.y === props.location.y).terrainLevel  })
}

function MapTerrain(props) {

    const { location, terrainTiles, terrainLevel } = props

    return (
        <Container {...location} onClick={()=> props.setTerrainLevel(location, (terrainLevel + 1) % 2)}>
            {terrainTiles.map((tile, idx) =>
                <PositionedTerrain key={idx} idx={idx} biome="grassland" sheetPosition={tile} />
            )}
        </Container>
        
    )
}

export default connect(makeMSP, { setTerrainLevel })(MapTerrain)

const setArea = idx => {
    switch(idx){
        case 0:
            return '1 / 1 / 2 / 2'
        case 1:
            return '1 / 2 / 2 / 3'
        case 2:
            return '2 / 1 / 3 / 2'
        case 3:
            return '2 / 2 / 3 / 3'
    }
}

const PositionedTerrain = styled(Terrain)`
    
    transform: scale(0.5) translate(-50%, -50%);

    grid-area: ${props => setArea(props.idx)};
    
`

const Container = styled.div`

    width: 64px;
    height: 64px;

    outline: solid 2px rgba(20, 20, 20, 0.3);

    position: absolute;
    top: ${props => (props.y * 64)}px;
    left: ${props => (props.x * 64)}px;

    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;


`
