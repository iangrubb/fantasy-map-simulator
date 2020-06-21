import { combineReducers } from 'redux';
import mapReducer from './mapReducer'

const rootReducer = combineReducers({
  mapData: mapReducer
})

export default rootReducer;