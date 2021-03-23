import {combineReducers} from 'redux'
import demoReducer from './demo_reducer'

export default combineReducers({
  demo: demoReducer
})
