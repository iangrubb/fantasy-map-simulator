import React from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'


function MapPoint(props) {

    const { point } = props

    return (
        <Container {...point} >
            <Point {...point} />
        </Container>
    )
}

export default connect(null, null)(MapPoint)

const Container = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;
    top: ${props => 32 * (props.y + 1)}px;
    left: ${props => 32 * (props.x + 1)}px;
    transform: translate(-50%, -50%);

    &:hover > div {
        transform: scale(2);
    }

    display: flex;
    justify-content: center;
    align-items: center;
`

const pointStyle = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) {
        return `
        background: #333;
        width: 6px;
        height: 6px;
        `
    } else if (x % 2 === 1 && y % 2 === 1) {
        return `
        background: coral;
        width: 8px;
        height: 8px;
        `
    } else {
        return `
        background: lightcoral;
        width: 4px;
        height: 4px;
        `
    }
}

const Point = styled.div`

    border-radius: 50%;
    ${props => pointStyle(props.x, props.y)};

    transition: transform 0.2s ease;

`