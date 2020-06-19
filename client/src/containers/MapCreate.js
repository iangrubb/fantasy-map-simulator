import React from 'react'

import styled from 'styled-components'

import Terrain from '../sprites/Terrain'
import MapCreateTile from './mapCreate/MapCreateTile'


const options = [[1, 1], [9, 10], [10, 10], [11, 10], [13, 10], [14, 10], [9, 11], [11, 11], [12, 11], [13, 11],
    [14, 11], [15, 11], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12], [9, 13], [10, 13], [11, 13], [12, 13],
    [13, 13], [14, 13], [0, 1], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [1, 12], [2, 12], [3, 12],
    [4, 12], [5, 12], [6, 12], [8, 12], [0, 13], [1, 13], [2, 13], [3, 13], [6, 13], [7, 13], [8, 13]]

const rowIndicies = [...Array(30).keys()]

const columnIndicies = [...Array(30).keys()]

const initialTiles = rowIndicies.reduce((acc, row) => {
    return columnIndicies.reduce( (acc2, column) => {
        acc2[`${column} ${row}`] = [0, 1]
        return acc2
    }, acc)
}, {})


export default class MapCreate extends React.Component {

    state = {
        tiles: initialTiles,
        inputTile: options[0],
        clicking: false
    }

    updateTile = (location, tile) => {
        const updatedTiles = {...this.state.tiles}
        updatedTiles[location] = tile
        this.setState({tiles: updatedTiles})
    }

    clickUpdate = (location, tile) => () => {
        this.setState({clicking: true})
        this.updateTile(location, tile)
    }

    enterUpdate = (location, tile) => () => {
        if (this.state.clicking) {
            this.updateTile(location, tile)
        }
    }

    render(){
        const { tiles, inputTile } = this.state
        return (
            <Container onMouseUp={()=>this.setState({clicking: false})}>
                <MapFrame>
                    <MapGrid>
                        {Object.keys(tiles).map(tileKey => (
                            <MapCreateTile
                                key={tileKey}
                                tileKey={tileKey}
                                tile={tiles[tileKey]}
                                handleClick={this.clickUpdate(tileKey, inputTile)}
                                handleEnter={this.enterUpdate(tileKey, inputTile)}
                            />
                        ))}
                    </MapGrid>
                </MapFrame>
                <InterfaceFrame>
                    <SelectedTile>
                    <Terrain sheetPosition={inputTile}/>
                    </SelectedTile>
                    <SelectableTiles >
                        {options.map(position => (
                            <div key={position} onClick={()=>this.setState({inputTile: position})}>
                                <Terrain sheetPosition={position} />
                            </div>
                        ))}
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

