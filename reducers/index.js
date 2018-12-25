import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'
import workout from './workout'
import goals from './goals'

const rootReducer = combineReducers({
  auth,
  user,
  goals,
  workout,
})

export default rootReducer
