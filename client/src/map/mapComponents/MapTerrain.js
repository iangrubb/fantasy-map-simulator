import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import Terrain from '../../sprites/Terrain'



const determineUpLeft = (middle, left, upleft, up) => [1, 1]

const determineUpRight = (middle, up, upRight, right) => [0, 1]

const determineDownRight = (middle, right, downRight, down) => [1, 1]

const determineDownLeft = (middle, down, downLeft, left) => [1, 1]



const determineTerrain = (points, location) => {

    const {x, y} = location

    const adjacentTiles = [ [0, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0] ].map(diff => (
        points.find(p => p.location.x === x + diff[0] && p.location.y === y + diff[1])
    ))

    const [middle, upLeft, up, upRight, right, downRight, down, downLeft, left] = adjacentTiles


    return [
        determineUpLeft(middle, left, upLeft, up),
        determineUpRight(middle, up, upRight, right),
        determineDownLeft(middle, down, downLeft, left),
        determineDownRight(middle, right, downRight, down)
    ]

    if (middle.terrainLevel === 0 ) {
        return [[0, 1], [8, 12], [0, 1], [8, 12]]
    } else {
        return [[1, 1], [1, 1], [1, 1], [1, 1]]
    }
    
}

const msp = () => (store, props) => ({terrainTiles: determineTerrain(store.mapData, props.location)})

function MapTerrain(props) {

    const { location, terrainTiles } = props

    return (
        <Container {...location} >
            {terrainTiles.map((tile, idx) =>
                <PositionedTerrain key={idx} idx={idx} biome="grassland" sheetPosition={tile} />
            )}
        </Container>
        
    )
}

export default connect(msp, null)(MapTerrain)

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
    
    transform: scale(0.5);

    grid-area: ${props => setArea(props.idx)};
    
`

const Container = styled.div`

    width: 64px;
    height: 64px;

    position: absolute;
    top: ${props => (props.y * 64)}px;
    left: ${props => (props.x * 64)}px;

    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;


`
