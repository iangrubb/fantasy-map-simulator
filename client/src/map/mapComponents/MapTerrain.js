import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import Terrain from '../../sprites/Terrain'


const tileType = (middle, left, upLeft, up) => {
    if (middle.terrainLevel === 1) {
        if ( left.terrainLevel === 1 || upLeft.terrainLevel === 1 || up.terrainLevel === 1) {
            // Full land 
            // G1 G1
            // G1  G
            return "fullLand"
        } else {
            // Water out, grass in
            // W W
            // W G
            return "waterOut"
        }
    } else {
        if (left.terrainLevel === 0 && upLeft.terrainLevel === 1 && up.terrainLevel === 1) {
            // Grass right side
            // G G
            // W W
            return "grassRight"
        } else if (left.terrainLevel === 1 && upLeft.terrainLevel === 1 && up.terrainLevel === 0) {
            // Grass left side
            // G W
            // G W
            return "grassLeft"
        } else if (left.terrainLevel === 1 && up.terrainLevel === 1) {
            // Grass out, water in
            // X G
            // G W
            return "grassOut"
        } else if (left.terrainLevel === 1 && upLeft.terrainLevel === 0 && up.terrainLevel === 0) {
            // Grass point left
            // W W
            // G W
            return "pointLeft"
        } else if (left.terrainLevel === 0 && upLeft.terrainLevel === 0 && up.terrainLevel === 1) {
            // Grass point right
            // W G
            // W W
            return "pointRight"
        } else {
            // Full water
            return "fullWater"
        }
    }
}

const determineUpLeft = (middle, left, upLeft, up) => {
    const tiles = { 
        "fullLand" : [1, 1], 
        "waterOut" : [5, 12], 
        "grassRight": [7, 11], 
        "grassLeft" : [6, 12], 
        "grassOut" : [4, 11], 
        "fullWater": [0, 1],
        "pointRight": [2 , 12],
        "pointLeft": [3 , 11]
    }
    return tiles[tileType(middle, left, upLeft, up)]
}

const determineUpRight = (middle, up, upRight, right) => {
    const tiles = { 
        "fullLand" : [1, 1], 
        "waterOut" : [4, 12], 
        "grassRight": [8, 12], 
        "grassLeft" : [7, 11], 
        "grassOut" : [5, 11], 
        "fullWater": [0, 1],
        "pointRight": [2 , 11],
        "pointLeft": [3 , 12]
    }
    return tiles[tileType(middle, up, upRight, right)]
}

const determineDownRight = (middle, right, downRight, down) => {
    const tiles = { 
        "fullLand" : [1, 1], 
        "waterOut" : [4, 11], 
        "grassRight": [7, 13], 
        "grassLeft" : [8, 12], 
        "grassOut" : [5, 12], 
        "fullWater": [0, 1],
        "pointRight": [3 , 11],
        "pointLeft": [2 , 12]
    }
    return tiles[tileType(middle, right, downRight, down)]
}

const determineDownLeft = (middle, down, downLeft, left) => {
    const tiles = { 
        "fullLand" : [1, 1], 
        "waterOut" : [5, 11], 
        "grassRight": [6, 12], 
        "grassLeft" : [7, 13], 
        "grassOut" : [4, 12], 
        "fullWater": [0, 1],
        "pointRight": [3 , 12],
        "pointLeft": [2 , 11]
    }
    return tiles[tileType(middle, down, downLeft, left)]
}

const determineTerrain = (points, location) => {

    const {x, y} = location

    const adjacentTiles = [ [0, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0] ].map(diff => (
        points.find(p => p.location.x === x + diff[0] && p.location.y === y + diff[1])
    ))

    const [middle, upLeft, up, upRight, right, downRight, down, downLeft, left] = adjacentTiles

    return [
        determineUpLeft(middle, left || middle, upLeft || up || left || middle, up || middle),
        determineUpRight(middle, up || middle, upRight || up || right || middle , right || middle),
        determineDownLeft(middle, down || middle, downLeft || down || left || middle, left || middle),
        determineDownRight(middle, right || middle, downRight || down || right || middle, down || middle)
    ]
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
