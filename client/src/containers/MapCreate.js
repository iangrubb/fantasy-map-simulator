import React from 'react'

import styled from 'styled-components'

import Terrain, { terrainChoices, biomes } from '../sprites/Terrain'

import MapCreateTile from './mapCreate/MapCreateTile'



const rowIndicies = [...Array(30).keys()]

const columnIndicies = [...Array(30).keys()]

const initialTiles = rowIndicies.reduce((acc, row) => {
    return columnIndicies.reduce( (acc2, column) => {
        acc2[`${column} ${row}`] = {sheetPosition: [0, 1], biome: "grassland"}
        return acc2
    }, acc)
}, {})


export default class MapCreate extends React.Component {

    state = {
        tiles: initialTiles,
        inputTile: {sheetPosition: terrainChoices[0], biome: biomes[0]},
        clicking: false
    }

    updateTile = location => {
        const updatedTiles = {...this.state.tiles}
        updatedTiles[location] = this.state.inputTile
        this.setState({tiles: updatedTiles})
    }

    clickUpdate = location => () => {
        this.setState({clicking: true})
        this.updateTile(location)
    }

    enterUpdate = location => () => {
        if (this.state.clicking) {
            this.updateTile(location)
        }
    }

    render(){
        return (
            <Container onMouseUp={()=>this.setState({clicking: false})}>
                <MapFrame>
                    <MapGrid>
                        {Object.keys(this.state.tiles).map(mapPosition => (
                            <MapCreateTile
                                key={mapPosition}
                                mapPosition={mapPosition}
                                tile={this.state.tiles[mapPosition]}
                                handleClick={this.clickUpdate(mapPosition)}
                                handleEnter={this.enterUpdate(mapPosition)}
                            />
                        ))}
                    </MapGrid>
                </MapFrame>
                <InterfaceFrame>
                    <SelectedTile>
                        <Terrain sheetPosition={this.state.inputTile.sheetPosition} biome={this.state.inputTile.biome} />
                    </SelectedTile>
                    <SelectableTiles >
                        {biomes.flatMap(biome => terrainChoices.map(sheetPosition => (
                            <div key={`${sheetPosition} ${biome}`} onClick={()=>this.setState({inputTile: { sheetPosition, biome }})}>
                                <Terrain sheetPosition={sheetPosition} biome={biome} />
                            </div>
                        )))}
                    </SelectableTiles>
                </InterfaceFrame>
            </Container>
        )
    }
}

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: stretch;
`

const MapFrame = styled.div`
    width: 70%;
    overflow: scroll;
    background: #eee;
`

const MapGrid = styled.div`
    display: grid;
    
`

const InterfaceFrame = styled.div`
    
    width: 30%;

    border-left: 8px solid #ccc;
    background: #ddd;

    padding: 8px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SelectableTiles = styled.div`

    width: 100%;
    height: 60%;

    padding: 8px;
    background: #eee;
    border-radius: 8px;

    overflow: scroll;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > * {
        margin: 4px;
    }

    & > *:hover {
        outline: 4px dashed #666;
    }
`

const SelectedTile = styled.div`

    padding: 8px;
    background: #eee;
    border-radius: 8px;

    margin: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
`

