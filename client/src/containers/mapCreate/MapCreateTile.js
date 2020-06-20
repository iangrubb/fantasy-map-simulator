import React from 'react'

import styled from 'styled-components'

import Terrain from '../../sprites/Terrain'

const preventUpdateWhen = (prev, next) => (
    prev.tile.sheetPosition[0] === next.tile.sheetPosition[0] &&
    prev.tile.sheetPosition[1] === next.tile.sheetPosition[1] &&
    prev.tile.biome === next.tile.biome
    )

function MapCreateTile(props) {

    const { mapPosition, tile, handleClick, handleEnter } = props

    const [x, y] = mapPosition.split(" ")

    return (
        <GridTile
            x={x}
            y={y}
            onMouseDown={handleClick}
            onMouseEnter={handleEnter}
        >
            <Terrain {...tile} />
        </GridTile>
    )
}

const GridTile = styled.div.attrs(props => ({
    style: {
      gridArea: `${props.y + 1}/${props.x + 1}/${props.y + 2}/${props.x + 2}`,
    },
    }))`

    &:hover > * {
        transform: translateY(-2px);
        outline: 4px dashed #666;
    }
`

export default React.memo(MapCreateTile, preventUpdateWhen)
