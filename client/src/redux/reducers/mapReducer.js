


 const width = 25
 const height = 25

//  const evenRowPoints = [...Array(height + 1).keys()].map(y => 2 * y).flatMap( y => [...Array(width).keys()].map(x => ({x: (2 * x) + 1, y: y})))
//  const oddRowPoints = [...Array(height).keys()].map(y => (2 * y) + 1).flatMap( y => [...Array((width * 2) + 1).keys()].map(x => ({x, y})))

//  const points = [...oddRowPoints, ...evenRowPoints].map(location => ({location: location, terrainLevel: Math.floor(Math.random() * 2)}))

const points = [...Array(height).keys()].flatMap(y => [...Array(width).keys()].map(x => (
        {location: {x, y}, terrainLevel: Math.floor(Math.random() * 2)}
    )))

const initialState = {
    mapData: points
}

const mapReducer = (state = initialState.mapData, action) => {
    
    switch(action.type) {
        case "SET_TERRAIN_LEVEL":
            return state.map(point => {
                const {location, level} = action.payload
                const {x, y} = location
                if (point.location.x === x && point.location.y === y) {
                    return {...point, location: {...point.location}, terrainLevel: level}
                } else {
                    return {...point, location: {...point.location}}
                }
            })
        default:
            return state
    }
}

export default mapReducer