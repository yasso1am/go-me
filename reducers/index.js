import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'
import workout from './workout'

const rootReducer = combineReducers({
  auth,
  user,
  workout,
})

export default rootReducer
