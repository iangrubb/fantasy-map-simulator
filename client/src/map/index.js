import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import MapPoint from './mapComponents/MapPoint'
import MapTerrain from './mapComponents/MapTerrain'


function Map(props) {

    const width = 25
    const height = 25
    
    const points = [...Array(height).keys()].flatMap( y => [...Array(width).keys()].map( x => ({x, y})))
    // const tileLocations = points.filter( point => point.x % 2 === 1 && point.y % 2 === 1)

    return (
        <Container>
            <MapField width={width} height={height}>
                {points.map( point => <MapTerrain key={`${point.x} ${point.y}`} location={point} />)}
                {/* {props.points.map( point => <MapPoint key={`${point.location.x} ${point.location.y}`} point={point.location} /> )} */}
            </MapField>
        </Container>
    )
}

export default Map

const Container = styled.div`
    width: 100%;
    height: 100%;
   
`

const MapField = styled.div`
    width: ${props => props.width * 64}px;
    height: ${props => props.height * 64}px;

    
    
    position: relative;
`