import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import MapPoint from './mapComponents/MapPoint'
import MapTerrain from './mapComponents/MapTerrain'


const msp = () => store => ({points: store.mapData})

function Map(props) {

    const { points } = props

    const width = 10
    const height = 10

    // const points = [...Array((height * 2) + 1).keys()].flatMap( y => [...Array((width * 2) + 1).keys()].map( x => ({x, y})) )
    // const tileLocations = points.filter( point => point.x % 2 === 1 && point.y % 2 === 1)

    return (
        <Container>
            <MapField width={width} height={height}>
                {points.map( point => <MapTerrain key={`${point.location.x} ${point.location.y}`} location={point.location} />)}
                {/* {props.points.map( point => <MapPoint key={`${point.location.x} ${point.location.y}`} point={point.location} /> )} */}
            </MapField>
        </Container>
    )
}

export default connect(msp, null)(Map)

const Container = styled.div`
    width: 100%;
    height: 100%;
   
`

const MapField = styled.div`
    width: ${props => props.width * 64}px;
    height: ${props => props.height * 64}px;

    
    
    position: relative;
`