import axios from 'axios';
import { Alert } from 'react-native'

const BASE_URL = 'https://app.gome.fit/api'

const GET_GOALS = "GET_GOALS"
const GET_GOALS_WITH_WORKOUTS = "GET_GOALS_WITH_WORKOUTS"
const CLEAR_GOALS = "CLEAR_GOALS"


export const getGoals = (activityType) => {
  return(dispatch) => {
    axios.get(`${BASE_URL}/v1/goal/type/${activityType}`)
      .then( res => {
        console.log({res})
        dispatch({type: GET_GOALS, goals: res.data})
      })
      .catch( err => {
        console.log('Error retrieving goals')
      })
  }
}

export const getGoalsWithWorkouts = (activityType) => {
  return(dispatch) => {
    axios.get(`${BASE_URL}/v1/goal/type/${activityType}/workouts`)
      .then( res => {
        dispatch({type: GET_GOALS_WITH_WORKOUTS, goals: res.data})
      })
      .catch( err => {
        console.log({err})
      })
  }
}

export const clearGoals = () => {
  return(dispatch) => {
    dispatch({type: CLEAR_GOALS})
  }
}


export default ( state = [], action ) => {
  switch(action.type) {
    case GET_GOALS:
      return action.goals
    case GET_GOALS_WITH_WORKOUTS:
      return action.goals
    case CLEAR_GOALS:
      return []
    default:
      return state;
  }
  }
