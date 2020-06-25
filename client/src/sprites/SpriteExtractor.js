import React from 'react'

import styled from 'styled-components'

export default function SpriteExtractor(props) {

    const { unitSize, position, sheet, className } = props

    return (
        <Container
            className={className}
            unitSize={unitSize || 64}
            x={position[0]}
            y={position[1]}
            sheet={sheet}
        />
    )
}

const Container = styled.div`

  background-image: url(${props => props.sheet});
  width: ${props => props.unitSize}px;
  height: ${props => props.unitSize}px;
  background-position: -${props => props.x * props.unitSize}px -${props => props.y * props.unitSize}px; 

`
