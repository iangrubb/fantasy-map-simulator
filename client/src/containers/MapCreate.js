import React, { useState } from 'react'

import styled from 'styled-components'

import Terrain from '../sprites/Terrain'

export default function MapCreate() {

    const options = []

    return (
        <Container>
            <MapFrame>
                <MapGrid>
                    {[...Array(20).keys()].map(row => [...Array(16).keys()].map(column => (
                        <GridTile x={column} y={row}>
                            <Terrain sheetPosition={[column, row]}/>
                        </GridTile>
                    )))}
                </MapGrid>
            </MapFrame>
            <InterfaceFrame>
                <SelectableTiles>

                </SelectableTiles>
            </InterfaceFrame>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const MapFrame = styled.div`
    flex-grow: 1;
    overflow: scroll;
    background: #eee;
`

const MapGrid = styled.div`
    display: grid;
    gap: 2px;
    grid-auto-rows: 64px;
    grid-auto-columns: 64px;
`

const GridTile = styled.div`
    grid-area: ${props => `${props.y + 1}/${props.x + 1}/${props.y + 2}/${props.x + 2}`};
`


const InterfaceFrame = styled.div`
    min-height: 200px;
    border-top: 8px solid #ccc;
    background: #ddd;

    padding: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
`

const SelectableTiles = styled.div`
    width: 60%;
    max-width: 600px;
    height: 100%;

    padding: 8px;
    background: #eee;
    border-radius: 8px;

    overflow: scroll;
`

