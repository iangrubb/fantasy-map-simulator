import React from 'react'

import styled from 'styled-components'

import Terrain from '../../sprites/Terrain'

const preventUpdateWhen = (prev, next) => prev.tile[0] === next.tile[0] && prev.tile[1] === next.tile[1]

function MapCreateTile(props) {

    console.log("renderin'")

    const { tileKey, tile, handleClick, handleEnter } = props

    const [x, y] = tileKey.split(" ")

    return (
        <GridTile
            x={x}
            y={y}
            onMouseDown={handleClick}
            onMouseEnter={handleEnter}
        >
            <Terrain sheetPosition={tile} />
        </GridTile>
    )
}

const GridTile = styled.div.attrs(props => ({
    style: {
      gridArea: `${props.y + 1}/${props.x + 1}/${props.y + 2}/${props.x + 2}`,
    },
  }))`

    &:hover > * {
        transform: translate(1px, -4px);
        box-shadow: -4px 6px 8px #888;
        outline: 4px dashed #666;
    }
`

export default React.memo(MapCreateTile, preventUpdateWhen)
