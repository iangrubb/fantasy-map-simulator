
import { createSelectorCreator, defaultMemoize } from 'reselect'

const tileType = (middle, left, upLeft, up) => {

    if (middle === 1) {
        if ( left === 1 || upLeft === 1 || up === 1) {
            // Full land 
            // G1 G1
            // G1  G
            return "fullLand"
        } else {
            // Water out, grass in
            // W W
            // W G
            return "waterOut"
        }
    } else {
        if (left === 0 && upLeft === 1 && up === 1) {
            // Grass right side
            // G G
            // W W
            return "grassRight"
        } else if (left === 1 && upLeft === 1 && up === 0) {
            // Grass left side
            // G W
            // G W
            return "grassLeft"
        } else if (left === 1 && up === 1) {
            // Grass out, water in
            // X G
            // G W
            return "grassOut"
        } else if (left === 1 && upLeft === 0 && up === 0) {
            // Grass point left
            // W W
            // G W
            return "pointLeft"
        } else if (left === 0 && upLeft === 0 && up === 1) {
            // Grass point right
            // W G
            // W W
            return "pointRight"
        } else {
            // Full water
            return "fullWater"
        }
    }
}

const determineUpLeft = (middle, left, upLeft, up) => {
    const tiles = { 
        "fullLand" : [1, 1], 
        "waterOut" : [5, 12], 
        "grassRight": [7, 11], 
        "grassLeft" : [6, 12], 
        "grassOut" : [4, 11], 
        "fullWater": [0, 1],
        "pointRight": [2 , 12],
        "pointLeft": [3 , 11]
    }
    return tiles[tileType(middle, left, upLeft, up)]
}

const determineUpRight = (middle, up, upRight, right) => {
    const tiles = { 
        "fullLand" : [1, 1], 
        "waterOut" : [4, 12], 
        "grassRight": [8, 12], 
        "grassLeft" : [7, 11], 
        "grassOut" : [5, 11], 
        "fullWater": [0, 1],
        "pointRight": [2 , 11],
        "pointLeft": [3 , 12]
    }
    return tiles[tileType(middle, up, upRight, right)]
}

const determineDownRight = (middle, right, downRight, down) => {
    const tiles = { 
        "fullLand" : [1, 1], 
        "waterOut" : [4, 11], 
        "grassRight": [7, 13], 
        "grassLeft" : [8, 12], 
        "grassOut" : [5, 12], 
        "fullWater": [0, 1],
        "pointRight": [3 , 11],
        "pointLeft": [2 , 12]
    }
    return tiles[tileType(middle, right, downRight, down)]
}

const determineDownLeft = (middle, down, downLeft, left) => {
    const tiles = { 
        "fullLand" : [1, 1], 
        "waterOut" : [5, 11], 
        "grassRight": [6, 12], 
        "grassLeft" : [7, 13], 
        "grassOut" : [4, 12], 
        "fullWater": [0, 1],
        "pointRight": [3 , 12],
        "pointLeft": [2 , 11]
    }
    return tiles[tileType(middle, down, downLeft, left)]
}

const pickOption = options => {
    return options.find( option => option !== null )
}

const pickTerrain = adjacentTileTerrain => {

    const [middle, upLeft, up, upRight, right, downRight, down, downLeft, left] = adjacentTileTerrain

    return [
        determineUpLeft(middle, pickOption([left, middle]), pickOption([upLeft, up, left, middle]), pickOption([up, middle])),
        determineUpRight(middle, pickOption([up, middle]), pickOption([upRight, up, right, middle]) , pickOption([right, middle])),
        determineDownLeft(middle, pickOption([down, middle]), pickOption([downLeft, down, left, middle]), pickOption([left, middle])),
        determineDownRight(middle, pickOption([right, middle]), pickOption([downRight, down, right, middle]), pickOption([down, middle]))
    ]
}

const adjacentTileTerrain = (store, props) => {

    const location = props.location
    const {x, y} = location
   
    const adjacentPoints = [ [0, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0] ].map(diff => (
        store.mapData.find(p => p.location.x === x + diff[0] && p.location.y === y + diff[1])
    ))
    
    return adjacentPoints.map( point => point ? point.terrainLevel : null )
}

const detectChange = (prev, next) => {
    
   const val = !prev.map( (val, idx) => val !== next[idx] ).find(res => res)
   return val

}

const createDeepSelector = createSelectorCreator( defaultMemoize, detectChange )

const makeDetermineTerrain = () => {
    return createDeepSelector(
        adjacentTileTerrain,
        pickTerrain
    )
}

export default makeDetermineTerrain