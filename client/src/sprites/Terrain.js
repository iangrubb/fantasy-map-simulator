import React from 'react'

import styled from 'styled-components'

import grasslandSheet from './spritesheets/grassland.png'

import SpriteExtractor from './SpriteExtractor'



export default function Terrain(props) {

    const { sheetPosition } = props

    return (
        <SpriteExtractor sheet={grasslandSheet} position={sheetPosition} />
    )
}
