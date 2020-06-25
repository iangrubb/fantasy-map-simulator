import React from 'react'

import grassSheet from './spritesheets/grassTerrain.png'
import dirtSheet from './spritesheets/dirtTerrain.png'
import iceSheet from './spritesheets/iceTerrain.png'
import lavaSheet from './spritesheets/lavaTerrain.png'
import marshSheet from './spritesheets/marshTerrain.png'
import sandSheet from './spritesheets/sandTerrain.png'

import SpriteExtractor from './SpriteExtractor'

const chooseSheet = biome => {
    switch(biome){
        case "grassland":
            return grassSheet
        case "dirt":
            return dirtSheet
        case "sand":
            return sandSheet
        case "ice":
            return iceSheet
        case "lava":
            return lavaSheet
        case "marsh":
            return marshSheet
        default:
            return grassSheet
    }
}

export const terrainChoices = [[1, 1], [9, 10], [10, 10], [11, 10], [13, 10], [14, 10], [9, 11], [11, 11], [12, 11], [13, 11],
    [14, 11], [15, 11], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12], [9, 13], [10, 13], [11, 13], [12, 13],
    [13, 13], [14, 13], [0, 1], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [1, 12], [2, 12], [3, 12],
    [4, 12], [5, 12], [6, 12], [8, 12], [0, 13], [1, 13], [2, 13], [3, 13], [6, 13], [7, 13], [8, 13]]

export const biomes = ["grassland", "dirt", "sand", "ice", "lava", "marsh"]

export default function Terrain(props) {

    const { sheetPosition, biome, className, unitSize } = props

    return (
        <SpriteExtractor className={className} sheet={chooseSheet(biome)} position={sheetPosition}/>
    )
}
